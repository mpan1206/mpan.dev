import { describe, expect, it } from 'vitest'
import { getPostUrl } from '@/utils/getPostPaths'

describe('getPostUrl', () => {
  it('wraps a simple slug with /posts/ prefix and trailing slash', () => {
    expect(getPostUrl('hello-world')).toBe('/posts/hello-world/')
  })

  it('handles slugs with hyphens', () => {
    expect(getPostUrl('my-awesome-post')).toBe('/posts/my-awesome-post/')
  })

  it('handles slugs with numbers', () => {
    expect(getPostUrl('post-2024')).toBe('/posts/post-2024/')
  })

  it('handles slugs with subdirectory paths', () => {
    expect(getPostUrl('2024/hello-world')).toBe('/posts/2024/hello-world/')
  })

  it('handles short single-word slugs', () => {
    expect(getPostUrl('astro')).toBe('/posts/astro/')
  })

  it('always has a leading slash', () => {
    const result = getPostUrl('any-slug')
    expect(result.startsWith('/')).toBe(true)
  })

  it('always has a trailing slash', () => {
    const result = getPostUrl('any-slug')
    expect(result.endsWith('/')).toBe(true)
  })
})
