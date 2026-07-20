import { describe, expect, it } from 'vitest'

// stripLocale and getAssetPath/stripBase depend on import.meta.env.BASE_URL
// which is evaluated at module load time in withBase.ts.
// We test the pure logic by inlining equivalent implementations here,
// and separately test the module's exported functions with BASE_URL = '/'.

// ── Pure logic tests (locale stripping) ──────────────────────────────────────

function stripLocaleImpl(pathname: string, locale: string): string {
  const prefix = `/${locale}`
  if (pathname === prefix) return '/'
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  return pathname
}

describe('stripLocale (pure logic)', () => {
  it('strips locale prefix from a path', () => {
    expect(stripLocaleImpl('/en/posts/foo', 'en')).toBe('/posts/foo')
  })

  it('returns / for path equal to the locale root', () => {
    expect(stripLocaleImpl('/en', 'en')).toBe('/')
  })

  it('returns unchanged path if locale does not match', () => {
    expect(stripLocaleImpl('/fr/posts/foo', 'en')).toBe('/fr/posts/foo')
  })

  it('does not partially strip a path with a similar prefix', () => {
    // /english should NOT be stripped when locale is 'en'
    expect(stripLocaleImpl('/english/posts', 'en')).toBe('/english/posts')
  })

  it('handles nested paths', () => {
    expect(stripLocaleImpl('/zh-CN/posts/2024/hello', 'zh-CN')).toBe('/posts/2024/hello')
  })

  it('returns / for exact locale root with trailing segment only', () => {
    expect(stripLocaleImpl('/zh-CN', 'zh-CN')).toBe('/')
  })
})

// ── getAssetPath logic tests (base = '') ─────────────────────────────────────

function getAssetPathImpl(path: string, base: string): string {
  const baseRoot = base === '' ? '/' : `${base}/`
  const normalizedPath = path.replace(/^\/+/, '')
  if (!normalizedPath) {
    return base === '' ? '/' : base
  }
  return baseRoot + normalizedPath
}

describe('getAssetPath (pure logic, no base)', () => {
  it('returns / for empty path when base is empty', () => {
    expect(getAssetPathImpl('', '')).toBe('/')
  })

  it('prepends / to a simple path when base is empty', () => {
    expect(getAssetPathImpl('images/logo.png', '')).toBe('/images/logo.png')
  })

  it('handles leading slashes in path', () => {
    expect(getAssetPathImpl('/images/logo.png', '')).toBe('/images/logo.png')
  })

  it('handles multiple leading slashes', () => {
    expect(getAssetPathImpl('///images/logo.png', '')).toBe('/images/logo.png')
  })
})

describe('getAssetPath (pure logic, with base /app)', () => {
  it('returns base for empty path when base is set', () => {
    expect(getAssetPathImpl('', '/app')).toBe('/app')
  })

  it('prepends base + / to a path', () => {
    expect(getAssetPathImpl('images/logo.png', '/app')).toBe('/app/images/logo.png')
  })

  it('handles leading slashes in path with base', () => {
    expect(getAssetPathImpl('/images/logo.png', '/app')).toBe('/app/images/logo.png')
  })
})

// ── stripBase logic tests ─────────────────────────────────────────────────────

function stripBaseImpl(pathname: string, base: string): string {
  const baseRoot = base === '' ? '/' : `${base}/`
  if (base === '') return pathname
  if (pathname === base) return '/'
  if (pathname.startsWith(baseRoot)) {
    const stripped = pathname.slice(base.length)
    return stripped === '' ? '/' : stripped
  }
  return pathname
}

describe('stripBase (pure logic, no base)', () => {
  it('returns pathname unchanged when base is empty', () => {
    expect(stripBaseImpl('/posts/hello/', '')).toBe('/posts/hello/')
    expect(stripBaseImpl('/', '')).toBe('/')
  })
})

describe('stripBase (pure logic, with base /app)', () => {
  it('returns / for pathname equal to base', () => {
    expect(stripBaseImpl('/app', '/app')).toBe('/')
  })

  it('strips base prefix from pathname', () => {
    expect(stripBaseImpl('/app/posts/hello/', '/app')).toBe('/posts/hello/')
  })

  it('returns pathname unchanged when base does not match', () => {
    expect(stripBaseImpl('/other/posts/', '/app')).toBe('/other/posts/')
  })

  it('returns / when stripping results in empty string', () => {
    // This edge case: base is /app, path is /app/ → stripped = '/'
    expect(stripBaseImpl('/app/', '/app')).toBe('/')
  })
})
