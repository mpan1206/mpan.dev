import { useState, useEffect, useCallback, useRef } from 'react'
import { create, load, search, type AnyOrama, type Result } from '@orama/orama'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'

export interface OramaDocument {
  id: string
  title: string
  content: string
  url: string
}

export type OramaHit = Result<OramaDocument>

export function useOrama(isOpen: boolean) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState<OramaHit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const dbRef = useRef<AnyOrama | null>(null)
  const [isDbLoaded, setIsDbLoaded] = useState(false)

  // Lazy load the database when the dialog is opened
  useEffect(() => {
    if (isOpen && !dbRef.current && !loading && !isDbLoaded) {
      setLoading(true)
      fetch('/api/orama.json')
        .then((res) => res.json())
        .then(async (data) => {
          const db = await create({
            schema: {
              id: 'string',
              title: 'string',
              content: 'string',
              url: 'string',
            },
            components: {
              tokenizer: await createTokenizer({
                language: 'mandarin',
                stopWords: mandarinStopwords,
              }),
            },
          })
          await load(db, data)
          dbRef.current = db
          setIsDbLoaded(true)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Failed to load Orama DB', err)
          setError(err)
          setLoading(false)
        })
    }
  }, [isOpen, loading, isDbLoaded])

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

    if (!debouncedQuery.trim() || !isDbLoaded || !dbRef.current) {
      const timer = setTimeout(() => {
        setResults([])
        if (isDbLoaded) setLoading(false)
        setError(null)
        setActiveIndex(0)
      }, 0)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (active) {
        setLoading(true)
        setError(null)
      }
    }, 0)

    const doSearch = async () => {
      try {
        const res = await search(dbRef.current!, {
          term: debouncedQuery,
          limit: 10,
          tolerance: 1, // typo tolerance
        })
        if (!active) return
        setResults(res.hits as unknown as OramaHit[])
        setActiveIndex(0)
        setLoading(false)
      } catch (err) {
        if (!active) return
        console.error('Orama search error:', err)
        setError(err as Error)
        setLoading(false)
      }
    }
    doSearch()

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [debouncedQuery, isDbLoaded])

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
