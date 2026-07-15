import { InboxIcon } from 'lucide-react'

interface SearchEmptyProps {
  query: string
  onSuggestionClick: (suggestion: string) => void
}

export function SearchEmpty({ query, onSuggestionClick }: SearchEmptyProps) {
  const suggestions = ['React', 'Vue', 'Astro', 'HarmonyOS']

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center text-muted-foreground animate-in fade-in-0">
      <InboxIcon className="mb-4 size-10 text-muted-foreground opacity-60" />
      <h3 className="text-sm font-medium text-foreground">
        {query ? `没有找到关于 “${query}” 的相关结果` : '搜索文章'}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        尝试搜索文章标题、技术栈或设计规范等关键字。
      </p>

      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          试试搜索
        </span>
        <div className="mt-1 flex max-w-sm flex-wrap justify-center gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick(suggestion)}
              className="cursor-pointer rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm transition-colors hover:bg-background hover:text-foreground sm:text-xs"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SearchEmpty
