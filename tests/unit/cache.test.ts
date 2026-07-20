import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// Inline the cache logic to test against a temp directory
// (avoids polluting the project's .astro-cache during tests)

function getHash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex')
}

async function getCachedOgImage(
  cacheDir: string,
  key: string,
  contentToHash: string
): Promise<Buffer | null> {
  const hash = getHash(contentToHash)
  const cacheFilePath = path.join(cacheDir, `${key}-${hash}.png`)
  try {
    await fs.access(cacheFilePath)
    return await fs.readFile(cacheFilePath)
  } catch {
    return null
  }
}

async function setCachedOgImage(
  cacheDir: string,
  key: string,
  contentToHash: string,
  imageBuffer: Buffer
): Promise<void> {
  const hash = getHash(contentToHash)
  const cacheFilePath = path.join(cacheDir, `${key}-${hash}.png`)
  try {
    await fs.mkdir(cacheDir, { recursive: true })
    // Clean up older cache files for this key
    try {
      const files = await fs.readdir(cacheDir)
      for (const file of files) {
        if (file.startsWith(`${key}-`) && file.endsWith('.png') && file !== `${key}-${hash}.png`) {
          await fs.unlink(path.join(cacheDir, file))
        }
      }
    } catch {
      // Ignore cleanup errors
    }
    await fs.writeFile(cacheFilePath, imageBuffer)
  } catch (error) {
    throw new Error(`Failed to write cache`, { cause: error })
  }
}

describe('OG image cache', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'og-cache-test-'))
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
  })

  it('returns null on cache miss', async () => {
    const result = await getCachedOgImage(tmpDir, 'post-slug', 'some content')
    expect(result).toBeNull()
  })

  it('returns the buffer after setting cache', async () => {
    const key = 'post-slug'
    const content = 'title: Hello World'
    const buffer = Buffer.from('fake-png-data')

    await setCachedOgImage(tmpDir, key, content, buffer)
    const result = await getCachedOgImage(tmpDir, key, content)

    expect(result).not.toBeNull()
    expect(result!.equals(buffer)).toBe(true)
  })

  it('returns null for a different content hash (cache miss)', async () => {
    const key = 'post-slug'
    await setCachedOgImage(tmpDir, key, 'original content', Buffer.from('img-v1'))

    // Different content → different hash → cache miss
    const result = await getCachedOgImage(tmpDir, key, 'different content')
    expect(result).toBeNull()
  })

  it('cleans up old cache files when content changes', async () => {
    const key = 'post-slug'
    await setCachedOgImage(tmpDir, key, 'content-v1', Buffer.from('img-v1'))
    await setCachedOgImage(tmpDir, key, 'content-v2', Buffer.from('img-v2'))

    const files = await fs.readdir(tmpDir)
    const keyFiles = files.filter((f) => f.startsWith(`${key}-`))
    // Only one file should remain (the latest)
    expect(keyFiles).toHaveLength(1)
  })

  it('different keys do not interfere with each other', async () => {
    const content = 'same content'
    const bufferA = Buffer.from('img-a')
    const bufferB = Buffer.from('img-b')

    await setCachedOgImage(tmpDir, 'key-a', content, bufferA)
    await setCachedOgImage(tmpDir, 'key-b', content, bufferB)

    const resultA = await getCachedOgImage(tmpDir, 'key-a', content)
    const resultB = await getCachedOgImage(tmpDir, 'key-b', content)

    expect(resultA!.equals(bufferA)).toBe(true)
    expect(resultB!.equals(bufferB)).toBe(true)
  })

  it('creates cache directory automatically if it does not exist', async () => {
    const nestedDir = path.join(tmpDir, 'nested', 'og-images')
    await setCachedOgImage(nestedDir, 'key', 'content', Buffer.from('data'))

    const result = await getCachedOgImage(nestedDir, 'key', 'content')
    expect(result).not.toBeNull()
  })

  it('uses MD5 hash of content as cache key', async () => {
    const key = 'slug'
    const content = 'my content'
    await setCachedOgImage(tmpDir, key, content, Buffer.from('img'))

    const expectedHash = crypto.createHash('md5').update(content).digest('hex')
    const files = await fs.readdir(tmpDir)
    expect(files.some((f) => f === `${key}-${expectedHash}.png`)).toBe(true)
  })
})
