import React from 'react'

interface SearchGroupProps {
  title: string
  children: React.ReactNode
}

export function SearchGroup({ title, children }: SearchGroupProps) {
  return (
    <div role="group">
      <div
        className="mt-2 mb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase"
        aria-label={title}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}
export default SearchGroup
