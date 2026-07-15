import satori from 'satori'
import sharp from 'sharp'
import { getFontBuffer } from './fonts'
import type { OGTemplate } from './types'

export async function renderOG(template: OGTemplate): Promise<Buffer> {
  const fontData = await getFontBuffer()
  const vdom = template.render() as unknown as Parameters<typeof satori>[0]

  // 1. Render HTML-like structure into SVG using Satori
  const svg = await satori(vdom, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Sans SC',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ],
  })

  // 2. Convert SVG into PNG buffer using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer()
  return pngBuffer
}
