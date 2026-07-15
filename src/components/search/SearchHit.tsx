import React from 'react'
import { FileTextIcon } from 'lucide-react'
import type { ResolvedPagefindHit } from './hooks/usePagefind'

interface SearchHitProps {
  hit: ResolvedPagefindHit
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
}

function HighlightedText({ text, className }: { text: string; className?: string }) {
  if (!text) return null
  return <span className={className} dangerouslySetInnerHTML={{ __html: text }} />
}

export function SearchHit({ hit, isSelected, onClick, onMouseEnter }: SearchHitProps) {
  const title = hit.document.meta?.title || hit.url
  const excerpt = hit.document.excerpt

  return (
    <div
      className="group mb-1 block overflow-hidden rounded-md transition-colors outline-none aria-selected:bg-accent"
      aria-selected={isSelected}
      onMouseEnter={onMouseEnter}
    >
      <a
        href={hit.url}
        onClick={onClick}
        className="flex w-full items-start gap-3 px-3 py-2.5 text-foreground"
      >
        <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground group-aria-selected:text-foreground" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 [&_mark]:bg-transparent [&_mark]:p-0 [&_mark]:font-semibold [&_mark]:text-primary [&_mark]:underline [&_mark]:underline-offset-2 dark:[&_mark]:text-foreground">
          <HighlightedText text={title} className="text-sm font-medium" />
          {excerpt && (
            <HighlightedText
              text={excerpt}
              className="mt-1 line-clamp-2 text-xs text-muted-foreground group-aria-selected:text-foreground group-aria-selected:opacity-90"
            />
          )}
        </div>
      </a>
    </div>
  )
}
export default SearchHit
