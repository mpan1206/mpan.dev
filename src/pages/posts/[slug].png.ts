import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { getDefaultTheme } from '@/lib/og/theme'
import { PostOGTemplate } from '@/lib/og/templates'
import { renderOG } from '@/lib/og/renderer'
import { getCachedOgImage, setCachedOgImage } from '@/lib/og/cache'

export async function getStaticPaths() {
  const posts = await getCollection('posts')
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props, params }) => {
  const post = props.post as CollectionEntry<'posts'>
  const slug = params.slug as string

  const title = post.data.title || 'Untitled'
  const publishDate = post.data.publishDate
    ? new Date(post.data.publishDate).toISOString().split('T')[0]
    : undefined

  const theme = await getDefaultTheme()

  // We hash title, publishDate, and logo to check for modifications
  const contentToHash = `${title}|${publishDate || ''}|${theme.logoBase64 || ''}`

  // Check cache
  const cached = await getCachedOgImage(slug, contentToHash)
  if (cached) {
    return new Response(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  // Generate image
  const template = new PostOGTemplate(title, publishDate, theme)
  const imageBuffer = await renderOG(template)

  // Save to cache
  await setCachedOgImage(slug, contentToHash, imageBuffer)

  return new Response(new Uint8Array(imageBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
