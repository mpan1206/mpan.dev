import React, { useState, useEffect } from 'react'
import { useOrama } from './hooks/useOrama'
import { useKeyboard } from './hooks/useKeyboard'
import { useMobile } from './hooks/useMobile'
import { SearchTrigger } from './SearchTrigger'
import { SearchDialog } from './SearchDialog'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { SearchLoading } from './SearchLoading'
import { SearchEmpty } from './SearchEmpty'
import { SearchFooter } from './SearchFooter'

import './styles/docsearch.css'

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  const { query, setQuery, results, loading, activeIndex, setActiveIndex, clear } = useOrama(isOpen)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  // Bind Cmd+K / Ctrl+K / Slash key down events
  useKeyboard({ onOpen, onClose, isOpen })

  // Reset search state on modal close
  useEffect(() => {
    if (!isOpen) {
      clear()
    }
  }, [isOpen, clear])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const activeHit = results[activeIndex]
      if (activeHit) {
        // Trigger click on corresponding link element to support client-side routing
        const activeLink = document.querySelector<HTMLAnchorElement>(
          `.search-results-container .search-hit[aria-selected="true"] a`
        )
        if (activeLink) {
          activeLink.click()
        } else {
          // Fallback
          window.location.href = activeHit.document.url
        }
        onClose()
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  const placeholder = '搜索文章...'

  return (
    <>
      <SearchTrigger onClick={onOpen} />
      <SearchDialog isOpen={isOpen} onClose={onClose} onKeyDown={handleKeyDown}>
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={clear}
          onClose={onClose}
          loading={loading}
          placeholder={placeholder}
          isMobile={isMobile}
        />
        {results.length > 0 ? (
          <SearchResults
            results={results}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClickHit={onClose}
          />
        ) : loading ? (
          <SearchLoading />
        ) : (
          <SearchEmpty query={query} onSuggestionClick={handleSuggestionClick} />
        )}
        <SearchFooter isMobile={isMobile} />
      </SearchDialog>
    </>
  )
}

export default Search
