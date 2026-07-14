import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
})

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().optional(),
    status: z.string().optional(),
    language: z.string().optional(),
    license: z.string().optional(),
  }),
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
}
