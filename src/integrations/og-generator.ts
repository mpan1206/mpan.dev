import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import type { AstroIntegration } from 'astro'

function splitText(text: string, maxLen: number): string[] {
  const lines: string[] = []
  let current = ''
  let currentLen = 0
  for (const char of text) {
    const charLen = char.charCodeAt(0) > 255 ? 2 : 1
    if (currentLen + charLen > maxLen && currentLen > 0) {
      lines.push(current)
      current = char
      currentLen = charLen
    } else {
      current += char
      currentLen += charLen
    }
  }
  if (current) lines.push(current)
  return lines
}

async function generateOgImage(
  title: string,
  subtitle: string,
  outPath: string,
  templateSvg: string,
  logoBase64: string
) {
  const titleLines = splitText(title, 22)
  const subtitleLines = splitText(subtitle, 40)

  let textElements = ''
  let currentY = 0

  for (const line of titleLines) {
    textElements += `<text x="0" y="${currentY}" class="title">${line}</text>\n`
    currentY += 90
  }

  if (subtitleLines.length > 0) {
    currentY += 10
    for (const line of subtitleLines) {
      textElements += `<text x="0" y="${currentY}" class="subtitle">${line}</text>\n`
      currentY += 50
    }
  }

  const lastY = currentY - (subtitleLines.length > 0 ? 50 : 90)
  const offsetY = 315 - (-72 + lastY) / 2

  const svg = templateSvg
    .replaceAll('{{logoBase64}}', logoBase64)
    .replace('{{offsetY}}', String(offsetY))
    .replace('{{textElements}}', textElements)

  const imageBuffer = await sharp(Buffer.from(svg)).png().toBuffer()
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, imageBuffer)
}

export default function ogGenerator(): AstroIntegration {
  return {
    name: 'og-generator',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        logger.info('Generating static OG images...')
        const outDir = fileURLToPath(dir)
        const srcDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

        const configPath = path.resolve(srcDir, 'config.ts')
        const configStr = await fs.readFile(configPath, 'utf-8')
        const siteTitleMatch = configStr.match(/title:\s*['"](.*?)['"]/)
        const siteDescMatch = configStr.match(/description:\s*['"](.*?)['"]/)
        const siteTitle = siteTitleMatch ? siteTitleMatch[1] : 'Site'
        const siteDesc = siteDescMatch ? siteDescMatch[1] : ''

        const templatePath = path.resolve(srcDir, 'utils/og-template.svg')
        const templateSvg = await fs.readFile(templatePath, 'utf-8')

        const logoPath = path.resolve(srcDir, '../public/logo-dark.png')
        const logoData = await fs.readFile(logoPath)
        const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

        // Generate site default og.png
        await generateOgImage(
          siteTitle,
          siteDesc,
          path.resolve(outDir, 'og.png'),
          templateSvg,
          logoBase64
        )

        // Read all posts and generate og image for each
        const postsDir = path.resolve(srcDir, 'content/posts')
        const files = await fs.readdir(postsDir)

        for (const file of files) {
          if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue

          const content = await fs.readFile(path.resolve(postsDir, file), 'utf-8')
          // Match frontmatter title
          const titleMatch = content.match(/^title:\s*['"]?(.*?)['"]?$/m)
          if (!titleMatch) continue

          const title = titleMatch[1].trim()
          const slug = file.replace(/\.mdx?$/, '')

          await generateOgImage(
            siteTitle,
            title,
            path.resolve(outDir, `posts/${slug}.png`),
            templateSvg,
            logoBase64
          )
        }

        logger.info('Static OG images generated successfully.')
      },
    },
  }
}
