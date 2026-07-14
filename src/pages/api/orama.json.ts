import { getCollection } from 'astro:content'
import { create, insert, save } from '@orama/orama'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'

export async function GET() {
  const posts = await getCollection('posts')

  const db = await create({
    schema: {
      id: 'string',
      title: 'string',
      content: 'string',
      url: 'string',
    },
    components: {
      tokenizer: await createTokenizer({
        language: 'mandarin',
        stopWords: mandarinStopwords,
      }),
    },
  })

  // Index posts
  for (const post of posts) {
    await insert(db, {
      id: post.id,
      title: post.data.title,
      // Markdown body might be empty if it's purely frontmatter, fallback to description
      content: post.body || post.data.description || '',
      url: `/posts/${post.id}/`,
    })
  }



  const dbData = await save(db)

  return new Response(JSON.stringify(dbData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
