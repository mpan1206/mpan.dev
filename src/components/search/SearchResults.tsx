import { useRef, useEffect } from 'react'
import { SearchGroup } from './SearchGroup'
import { SearchHit } from './SearchHit'
import type { OramaHit } from './hooks/useOrama'

interface SearchResultsProps {
  results: OramaHit[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  onClickHit: () => void
}

export function SearchResults({
  results,
  activeIndex,
  setActiveIndex,
  onClickHit,
}: SearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll the active item into view within the scroll container
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector<HTMLElement>('[aria-selected="true"]')
      if (activeEl) {
        // scrollIntoView with block: 'nearest' ensures smooth focus tracking
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  // Group results by url path
  const grouped: { [key: string]: { hits: OramaHit[]; startIndex: number } } = {}
  let indexCounter = 0

  results.forEach((hit) => {
    const url = hit.document.url
    const groupName = url.startsWith('/posts')
      ? '文章'
      : url.startsWith('/projects')
        ? '项目'
        : '其他'

    if (!grouped[groupName]) {
      grouped[groupName] = { hits: [], startIndex: indexCounter }
    }
    grouped[groupName].hits.push(hit)
    indexCounter++
  })

  return (
    <div ref={containerRef} className="search-results-container">
      {Object.entries(grouped).map(([groupName, groupData]) => (
        <SearchGroup key={groupName} title={groupName}>
          {groupData.hits.map((hit, localIdx) => {
            const globalIdx = groupData.startIndex + localIdx
            return (
              <SearchHit
                key={hit.id}
                hit={hit}
                isSelected={globalIdx === activeIndex}
                onClick={onClickHit}
                onMouseEnter={() => setActiveIndex(globalIdx)}
              />
            )
          })}
        </SearchGroup>
      ))}
    </div>
  )
}
export default SearchResults
