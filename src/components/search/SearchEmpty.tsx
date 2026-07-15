import { InboxIcon } from 'lucide-react'

interface SearchEmptyProps {
  query: string
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center text-muted-foreground animate-in fade-in-0">
      <InboxIcon className="mb-4 size-10 text-muted-foreground opacity-60" />
      <h3 className="text-sm font-medium text-foreground">
        {query ? `没有找到关于 “${query}” 的相关结果` : '搜索文章'}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        尝试搜索文章标题、技术栈或设计规范等关键字。
      </p>
    </div>
  )
}
export default SearchEmpty
