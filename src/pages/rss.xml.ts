import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()

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
      content: sanitizeHtml(parser.render(post.body ?? ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height'],
        },
      }),
    })),
    customData: `<language>zh-cn</language>`,
  })
}
