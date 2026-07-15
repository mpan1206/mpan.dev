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
    <div className="group mb-1 block overflow-hidden rounded-md outline-none transition-colors aria-selected:bg-accent" aria-selected={isSelected} onMouseEnter={onMouseEnter}>
      <a href={hit.document.url} onClick={onClick} className="flex w-full items-start gap-3 px-3 py-2.5 text-foreground">
        <FileTextIcon className="size-4 mt-0.5 shrink-0 text-muted-foreground group-aria-selected:text-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 [&_.search-highlight]:bg-transparent [&_.search-highlight]:font-semibold [&_.search-highlight]:text-primary [&_.search-highlight]:underline [&_.search-highlight]:underline-offset-2 dark:[&_.search-highlight]:text-foreground">
          <HighlightedText text={hit.document.title} className="text-sm font-medium" />
          {contentPreview && (
            <HighlightedText text={contentPreview} className="mt-1 line-clamp-2 text-xs text-muted-foreground group-aria-selected:text-foreground group-aria-selected:opacity-90" />
          )}
        </div>
      </a>
    </div>
  )
}
export default SearchHit
