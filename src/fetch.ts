/**
 * Advanced Routing entrypoint (Astro 7 stable).
 *
 * Uses Hono middleware for custom response headers, logging, and
 * future extensibility (auth, rate-limiting, i18n, etc.).
 *
 * @see https://docs.astro.build/en/guides/advanced-routing/
 */
import { Hono } from 'hono'
import { middleware, pages, sessions, actions, cache, getFetchState } from 'astro/hono'

const app = new Hono()

// Security & performance headers for every response
app.use(async (c, next) => {
  await next()
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
})

app.use(middleware())
app.use(sessions())
app.use(actions())

// Workaround for Astro 7 prerender bug: if cache provider is missing during build, inject a dummy one
app.use(async (c, next) => {
  const state = getFetchState(c)
  if (!state.resolve('cache')) {
    state.provide('cache', { create: () => ({}) })
  }
  await next()
})

app.use(cache())
app.use(pages())

app.onError((err, c) => {
  console.error('Hono Error:', err)
  return c.text('Internal Server Error', 500)
})

export default app
