// @ts-check

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import astroExpressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import ogGenerator from './src/integrations/og-generator.ts'
import config from './src/config.ts'
import { getLastmod } from './src/utils/sitemap.ts'

// https://astro.build/config
export default defineConfig({
  site: config.site.meta.url,
  integrations: [
    react(),
    astroExpressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => (theme.type === 'dark' ? '.dark' : ':root:not(.dark)'),
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = getLastmod(item.url)
        if (lastmod) item.lastmod = lastmod
        return item
      },
    }),
    ogGenerator(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
