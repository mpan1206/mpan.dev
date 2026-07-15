import { useState, useEffect, useCallback } from 'react'

import type { ResolvedPagefindHit } from '@/types'

export function usePagefind(isOpen: boolean) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState<ResolvedPagefindHit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pagefind, setPagefind] = useState<any>(null)
  const [isDbLoaded, setIsDbLoaded] = useState(false)

  // Lazy load the database when the dialog is opened
  useEffect(() => {
    if (isOpen && !pagefind && !loading && !isDbLoaded) {
      const loadPagefind = async () => {
        setLoading(true)
        try {
          if (import.meta.env.DEV) {
            throw new Error('Search is disabled in development mode.')
          }
          const pagefindPath = '/pagefind/pagefind.js'
          const pf = await import(/* @vite-ignore */ pagefindPath)
          await pf.options({})
          pf.init()
          setPagefind(pf)
          setIsDbLoaded(true)
          setLoading(false)
        } catch (err) {
          console.warn('Failed to load Pagefind. Search is disabled in development mode.', err)
          setError(new Error('开发环境下搜索不可用，请运行 pnpm build && pnpm preview 测试。'))
          setLoading(false)
        }
      }

      loadPagefind()
    }
  }, [isOpen, loading, isDbLoaded, pagefind])

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  // Execute search when debounced query changes
  useEffect(() => {
    let active = true

    if (!debouncedQuery.trim() || !isDbLoaded || !pagefind) {
      const timer = setTimeout(() => {
        setResults([])
        if (isDbLoaded) setLoading(false)
        setActiveIndex(0)
      }, 0)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (active) {
        setLoading(true)
      }
    }, 0)

    const doSearch = async () => {
      try {
        const res = await pagefind.search(debouncedQuery)

        if (!active) return

        // Take top 10 results and load their data
        const topHits = res.results.slice(0, 10)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resolvedHitsData = await Promise.all(topHits.map((h: any) => h.data()))

        if (!active) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resolvedHits: ResolvedPagefindHit[] = topHits.map((hit: any, i: number) => ({
          id: hit.id,
          url: resolvedHitsData[i].url,
          document: {
            url: resolvedHitsData[i].url,
            meta: resolvedHitsData[i].meta,
            excerpt: resolvedHitsData[i].excerpt,
            content: resolvedHitsData[i].content,
          },
        }))

        setResults(resolvedHits)
        setActiveIndex(0)
        setLoading(false)
      } catch (err) {
        if (!active) return
        console.error('Pagefind search error:', err)
        setError(err as Error)
        setLoading(false)
      }
    }
    doSearch()

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [debouncedQuery, isDbLoaded, pagefind])

  const clear = useCallback(() => {
    setQuery('')
    setResults([])
    setActiveIndex(0)
  }, [])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    activeIndex,
    setActiveIndex,
    clear,
  }
}
