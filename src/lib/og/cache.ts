import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const CACHE_DIR = path.resolve('.astro-cache/og-images')

function getHash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

export async function getCachedOgImage(key: string, contentToHash: string): Promise<Buffer | null> {
  const hash = getHash(contentToHash)
  const cacheFilePath = path.join(CACHE_DIR, `${key}-${hash}.png`)

  try {
    // Check if cache file exists
    await fs.access(cacheFilePath)
    // Read and return cache
    const cachedBuffer = await fs.readFile(cacheFilePath)
    return cachedBuffer
  } catch {
    // Cache miss
    return null
  }
}

export async function setCachedOgImage(
  key: string,
  contentToHash: string,
  imageBuffer: Buffer
): Promise<void> {
  const hash = getHash(contentToHash)
  const cacheFilePath = path.join(CACHE_DIR, `${key}-${hash}.png`)

  try {
    // Ensure cache directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true })

    // Clean up older cache files for this key to prevent cache inflation
    try {
      const files = await fs.readdir(CACHE_DIR)
      for (const file of files) {
        if (file.startsWith(`${key}-`) && file.endsWith('.png') && file !== `${key}-${hash}.png`) {
          await fs.unlink(path.join(CACHE_DIR, file))
        }
      }
    } catch (err) {
      console.warn('Failed to clean up old cache files', err)
    }

    // Write new cache file
    await fs.writeFile(cacheFilePath, imageBuffer)
  } catch (error) {
    console.error(`Failed to write cache for key: ${key}`, error)
  }
}
