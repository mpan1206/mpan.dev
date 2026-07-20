import { describe, expect, it } from 'vitest'
import { getReadingTime } from '@/utils/readingTime'

describe('getReadingTime', () => {
  it('returns at least 1 分钟阅读 for empty input', () => {
    expect(getReadingTime('')).toBe('1 分钟阅读')
  })

  it('calculates reading time for pure English text', () => {
    // ~200 words → 1 minute
    const words = 'word '.repeat(200).trim()
    expect(getReadingTime(words)).toBe('1 分钟阅读')
  })

  it('calculates reading time for a longer English text', () => {
    // ~400 words → 2 minutes
    const words = 'word '.repeat(400).trim()
    expect(getReadingTime(words)).toBe('2 分钟阅读')
  })

  it('calculates reading time for CJK characters', () => {
    // 350 Chinese chars → 1 minute
    const cjk = '好'.repeat(350)
    expect(getReadingTime(cjk)).toBe('1 分钟阅读')
  })

  it('calculates reading time for 700 CJK chars', () => {
    // 700 Chinese chars → 2 minutes
    const cjk = '好'.repeat(700)
    expect(getReadingTime(cjk)).toBe('2 分钟阅读')
  })

  it('strips fenced code blocks before counting', () => {
    const text = '```\n' + 'code '.repeat(1000) + '\n```\nword'
    // Only "word" remains, should be 1 minute
    expect(getReadingTime(text)).toBe('1 分钟阅读')
  })

  it('strips inline code before counting', () => {
    const text = '`inline code with lots of words `.repeat(100) normal word'
    // Inline code stripped, only surrounding text counted
    expect(getReadingTime(text)).toBe('1 分钟阅读')
  })

  it('strips markdown image/link syntax, keeps link text', () => {
    const text = '[click here](/some/url)'
    // Only "click here" counted
    expect(getReadingTime(text)).toBe('1 分钟阅读')
  })

  it('handles mixed CJK and English content', () => {
    // 175 CJK chars (0.5 min) + 100 English words (0.5 min) = 1 min
    const mixed = '中'.repeat(175) + ' ' + 'word '.repeat(100).trim()
    expect(getReadingTime(mixed)).toBe('1 分钟阅读')
  })

  it('always returns at least 1 分钟阅读 for very short text', () => {
    expect(getReadingTime('Hi')).toBe('1 分钟阅读')
    expect(getReadingTime('你好')).toBe('1 分钟阅读')
  })

  it('returns result in the correct format', () => {
    const result = getReadingTime('test content here')
    expect(result).toMatch(/^\d+ 分钟阅读$/)
  })
})
