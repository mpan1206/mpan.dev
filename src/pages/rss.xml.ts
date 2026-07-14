import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import config from '@/config'

export const prerender = true

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')
  posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())

  const site = context.site ?? new URL(config.site.meta.url)

  return rss({
    title: 'mpan.dev | 博客',
    description: '我的最新文章与想法。',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      content: post.data.description || post.body,
    })),
    customData: `<language>zh-cn</language>`,
  })
}
