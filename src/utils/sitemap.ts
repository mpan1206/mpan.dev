import { readFileSync, readdirSync } from 'node:fs'

let lastmodByPath: Map<string, string> | null = null

function initLastmodMap() {
  if (lastmodByPath) return
  lastmodByPath = new Map<string, string>()
  const postsDir = new URL('../content/posts/', import.meta.url)

  try {
    for (const file of readdirSync(postsDir, { recursive: true })) {
      const fileStr = String(file)
      if (!/\.(md|mdx)$/.test(fileStr)) continue
      const raw = readFileSync(new URL(fileStr, postsDir), 'utf-8')
      const match = raw.match(/^publishDate:\s*(.+)$/m)
      if (!match) continue
      const date = new Date(match[1].trim())
      if (Number.isNaN(date.valueOf())) continue
      const slug = fileStr.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/')
      lastmodByPath.set(`/posts/${slug}/`, date.toISOString())
    }
  } catch (error) {
    console.error('Error reading posts for sitemap lastmod:', error)
  }
}

export function getLastmod(url: string): string | undefined {
  initLastmodMap()
  try {
    const { pathname } = new URL(url)
    return lastmodByPath!.get(pathname)
  } catch {
    return undefined
  }
}
