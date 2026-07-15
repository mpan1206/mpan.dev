import fs from 'node:fs/promises'
import path from 'node:path'

let cachedFontBuffer: Buffer | null = null

export async function getFontBuffer(): Promise<Buffer> {
  if (cachedFontBuffer) return cachedFontBuffer

  const fontPath = path.resolve('src/assets/fonts/NotoSansSC-Bold.ttf')
  try {
    cachedFontBuffer = await fs.readFile(fontPath)
    return cachedFontBuffer
  } catch (error) {
    throw new Error(
      `Failed to load font NotoSansSC-Bold.ttf from ${fontPath}. Ensure the file exists and is readable.`,
      { cause: error }
    )
  }
}
