import { useRef, useEffect } from 'react'
import { SearchGroup } from './SearchGroup'
import { SearchHit } from './SearchHit'
import type { ResolvedPagefindHit } from './hooks/usePagefind'

interface SearchResultsProps {
  results: ResolvedPagefindHit[]
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
  const grouped: { [key: string]: { hits: ResolvedPagefindHit[]; startIndex: number } } = {}
  let indexCounter = 0

  results.forEach((hit) => {
    const url = hit.url
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
    <div
      ref={containerRef}
      className="max-h-[400px] overflow-y-auto px-4 py-2 max-sm:max-h-none max-sm:min-h-0 max-sm:flex-1"
    >
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
