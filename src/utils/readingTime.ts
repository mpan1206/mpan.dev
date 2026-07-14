const WORDS_PER_MINUTE = 200
const CJK_CHARS_PER_MINUTE = 350

// CJK ideographs, kana, and related ranges that are not separated by spaces.
const CJK_REGEX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g

/** Estimate reading time from raw Markdown, counting CJK by character. */
export function getReadingTime(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')

  const cjkChars = (text.match(CJK_REGEX) || []).length
  const words = text.replace(CJK_REGEX, ' ').split(/\s+/).filter(Boolean).length

  const minutes = Math.max(
    1,
    Math.round(cjkChars / CJK_CHARS_PER_MINUTE + words / WORDS_PER_MINUTE)
  )

  return `${minutes} 分钟阅读`
}
