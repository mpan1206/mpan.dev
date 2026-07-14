import React from 'react'

interface SearchGroupProps {
  title: string
  children: React.ReactNode
}

export function SearchGroup({ title, children }: SearchGroupProps) {
  return (
    <div className="search-group" role="group">
      <div className="search-group-title" aria-label={title}>
        {title}
      </div>
      <div className="search-group-items">{children}</div>
    </div>
  )
}
export default SearchGroup
