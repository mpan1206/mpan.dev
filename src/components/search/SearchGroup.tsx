import React from 'react'

interface SearchGroupProps {
  title: string
  children: React.ReactNode
}

export function SearchGroup({ title, children }: SearchGroupProps) {
  return (
    <div role="group">
      <div className="mb-1 mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground" aria-label={title}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}
export default SearchGroup
