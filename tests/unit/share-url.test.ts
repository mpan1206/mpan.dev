import { describe, expect, it } from 'vitest'
import { generateShareUrl } from '@/utils/share-url'

describe('generateShareUrl', () => {
  const url = 'https://mpan.dev/posts/hello-world/'
  const title = 'Hello World'
  const description = 'A test post description'

  describe('twitter', () => {
    it('generates a valid Twitter share URL', () => {
      const result = generateShareUrl('twitter', url, title)
      expect(result).toContain('https://twitter.com/intent/tweet')
      expect(result).toContain('url=')
      expect(result).toContain('text=')
    })

    it('encodes the URL parameter', () => {
      const result = generateShareUrl('twitter', url, title)
      expect(result).toContain(encodeURIComponent(url))
    })

    it('encodes the title parameter', () => {
      const result = generateShareUrl('twitter', url, title)
      expect(result).toContain(encodeURIComponent(title))
    })

    it('handles special characters in title', () => {
      const specialTitle = 'Hello & "World" <test>'
      const result = generateShareUrl('twitter', url, specialTitle)
      expect(result).toContain(encodeURIComponent(specialTitle))
    })
  })

  describe('weibo', () => {
    it('generates a valid Weibo share URL', () => {
      const result = generateShareUrl('weibo', url, title)
      expect(result).toContain('https://service.weibo.com/share/share.php')
      expect(result).toContain('url=')
      expect(result).toContain('title=')
    })

    it('encodes the URL parameter', () => {
      const result = generateShareUrl('weibo', url, title)
      expect(result).toContain(encodeURIComponent(url))
    })

    it('encodes the title parameter', () => {
      const result = generateShareUrl('weibo', url, title)
      expect(result).toContain(encodeURIComponent(title))
    })
  })

  describe('qq', () => {
    it('generates a valid QQ share URL', () => {
      const result = generateShareUrl('qq', url, title, description)
      expect(result).toContain('http://connect.qq.com/widget/shareqq/index.html')
      expect(result).toContain('url=')
      expect(result).toContain('title=')
      expect(result).toContain('summary=')
    })

    it('uses description when provided', () => {
      const result = generateShareUrl('qq', url, title, description)
      expect(result).toContain(encodeURIComponent(description))
    })

    it('falls back to title when description is omitted', () => {
      const result = generateShareUrl('qq', url, title)
      // summary should be title when no description
      expect(result).toContain(`summary=${encodeURIComponent(title)}`)
    })

    it('falls back to title when description is undefined', () => {
      const result = generateShareUrl('qq', url, title, undefined)
      expect(result).toContain(`summary=${encodeURIComponent(title)}`)
    })

    it('encodes the URL parameter', () => {
      const result = generateShareUrl('qq', url, title, description)
      expect(result).toContain(encodeURIComponent(url))
    })
  })

  describe('Chinese content', () => {
    it('correctly encodes Chinese titles', () => {
      const chineseTitle = '你好世界——一篇测试文章'
      const result = generateShareUrl('twitter', url, chineseTitle)
      expect(result).toContain(encodeURIComponent(chineseTitle))
    })

    it('correctly encodes Chinese description in QQ', () => {
      const chineseDesc = '这是一篇关于前端开发的文章'
      const result = generateShareUrl('qq', url, title, chineseDesc)
      expect(result).toContain(encodeURIComponent(chineseDesc))
    })
  })
})
