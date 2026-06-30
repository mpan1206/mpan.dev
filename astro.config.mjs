// @ts-check

import { readFileSync, readdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, memoryCache } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import astroExpressiveCode from 'astro-expressive-code'
import ogGenerator from './src/integrations/og-generator.ts'

// Map each blog post URL to its frontmatter publishDate so the sitemap can
// expose a per-page <lastmod>.
const postsDir = new URL('./src/content/posts/', import.meta.url)
const lastmodByPath = new Map()
for (const file of readdirSync(postsDir)) {
  if (!/\.(md|mdx)$/.test(file)) continue
  const raw = readFileSync(new URL(file, postsDir), 'utf-8')
  const match = raw.match(/^publishDate:\s*(.+)$/m)
  if (!match) continue
  const date = new Date(match[1].trim())
  if (Number.isNaN(date.valueOf())) continue
  const slug = file.replace(/\.(md|mdx)$/, '')
  lastmodByPath.set(`/posts/${slug}/`, date.toISOString())
}

// https://astro.build/config
export default defineConfig({
  site: 'https://mpan.dev',
  adapter: cloudflare(),
  output: 'server',

  // Route caching (Astro 7 stable) — cache blog posts & project pages
  cache: {
    provider: memoryCache(),
  },
  routeRules: {
    '/posts/[...path]': { maxAge: 300, swr: 60 },
    '/projects/[...path]': { maxAge: 300, swr: 60 },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['sharp'],
    },
  },
  integrations: [
    astroExpressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => (theme.type === 'dark' ? '.dark' : ':root:not(.dark)'),
      useDarkModeMediaQuery: false,
      styleOverrides: {
        frames: {
          // Mac-style window frames are enabled by default
        },
      },
    }),
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname)
        if (lastmod) item.lastmod = lastmod
        return item
      },
    }),
    ogGenerator(),
  ],
})
