import type { APIRoute } from 'astro'
import config from '@/config'
import { getDefaultTheme } from '@/lib/og/theme'
import { DefaultOGTemplate } from '@/lib/og/templates'
import { renderOG } from '@/lib/og/renderer'
import { getCachedOgImage, setCachedOgImage } from '@/lib/og/cache'

export const GET: APIRoute = async () => {
  const title = config.site.meta.title
  const description = config.site.meta.description
  const theme = await getDefaultTheme()

  // We hash title, description, and logo to check for modifications
  const hashKey = 'site-og'
  const contentToHash = `${title}|${description}|${theme.logoBase64 || ''}`

  // Check cache
  const cached = await getCachedOgImage(hashKey, contentToHash)
  if (cached) {
    return new Response(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  // Generate image
  const template = new DefaultOGTemplate(title, description, theme)
  const imageBuffer = await renderOG(template)

  // Save to cache
  await setCachedOgImage(hashKey, contentToHash, imageBuffer)

  return new Response(new Uint8Array(imageBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
