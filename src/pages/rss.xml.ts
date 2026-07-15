import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { getPostUrl } from '@/utils/getPostPaths'
import config from '@/config'

export async function GET() {
  const posts = await getCollection('posts')
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  )

  return rss({
    title: config.site.meta.title,
    description: config.site.meta.description,
    site: config.site.meta.url,
    items: sortedPosts.map(({ data, id }) => ({
      link: getPostUrl(id),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.publishDate),
    })),
    customData: `<language>${config.site.locale.lang.toLowerCase()}</language>`,
  })
}
