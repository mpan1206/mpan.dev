import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export const prerender = true

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')

  // Sort posts by date, descending
  posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())

  const site = context.site ?? new URL('https://mpan.dev')

  return rss({
    title: 'mpan.dev | Blog',
    description: '我的最新文章与想法。',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      // For Cloudflare compatibility, we skip full HTML generation using sanitize-html
      // and use the description as the primary feed content.
      content: post.data.description || post.body,
    })),
    customData: `<language>zh-cn</language>`,
  })
}
