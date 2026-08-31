import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

// Content collections config

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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.date(),
      tags: z.array(z.string()).optional(),
      image: image().optional(),
      githubUrl: z.string().optional(),
      demoUrl: z.string().optional(),
      npmUrl: z.string().optional(),
      featured: z.boolean().optional(),
      status: z.string().optional(),
      language: z.string().optional(),
      license: z.string().optional(),
      category: z.enum(['web', 'cli', 'devops', 'template', 'other']).optional(),
      highlights: z.array(z.string()).optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
}
