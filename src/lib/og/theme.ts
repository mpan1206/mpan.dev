import fs from 'node:fs/promises'
import path from 'node:path'
import config from '@/config'
import type { OGTheme } from './types'

let cachedLogoBase64: string | null = null

async function getLogoBase64(): Promise<string> {
  if (cachedLogoBase64) return cachedLogoBase64

  try {
    // logo-dark.png usually resides in the public/ folder
    const logoPath = path.resolve('public', config.site.brand.logoDark.replace(/^\//, ''))
    const data = await fs.readFile(logoPath)
    cachedLogoBase64 = `data:image/png;base64,${data.toString('base64')}`
    return cachedLogoBase64
  } catch (error) {
    console.error('Failed to read logo-dark.png for OG image, falling back to empty string', error)
    return ''
  }
}

export async function getDefaultTheme(): Promise<OGTheme> {
  const logoBase64 = await getLogoBase64()

  return {
    backgroundColor: '#09090b',
    backgroundGradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    textColor: '#ffffff',
    mutedTextColor: '#a1a1aa',
    accentColor: '#3b82f6',
    logoBase64,
    brandName: config.site.meta.title || 'MPan',
  }
}
