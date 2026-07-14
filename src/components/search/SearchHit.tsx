import React from 'react'
import { FileTextIcon } from 'lucide-react'
import type { OramaHit } from './hooks/useOrama'

interface SearchHitProps {
  hit: OramaHit
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
}

function HighlightedText({ text, className }: { text: string; className?: string }) {
  if (!text) return null
  return <span className={className} dangerouslySetInnerHTML={{ __html: text }} />
}

export function SearchHit({ hit, isSelected, onClick, onMouseEnter }: SearchHitProps) {

  const contentPreview =
    hit.document.content && hit.document.content.length > 100
      ? hit.document.content.slice(0, 100) + '...'
      : hit.document.content

  return (
    <div className="search-hit" aria-selected={isSelected} onMouseEnter={onMouseEnter}>
      <a href={hit.document.url} onClick={onClick} className="search-hit-link">
        <FileTextIcon className="search-hit-icon size-4" />
        <div className="search-hit-details">
          <HighlightedText text={hit.document.title} className="search-hit-title" />
          {contentPreview && (
            <HighlightedText text={contentPreview} className="search-hit-content" />
          )}
        </div>
      </a>
    </div>
  )
}
export default SearchHit
