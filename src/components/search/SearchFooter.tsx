interface SearchFooterProps {
  isMobile?: boolean
}

export function SearchFooter({ isMobile }: SearchFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-border bg-popover px-4 py-3 max-sm:pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      {!isMobile && (
        <div className="flex w-full items-center justify-between max-sm:hidden">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius)*0.6)] border border-border bg-muted px-1 text-[11px]">
                ↑
              </kbd>
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius)*0.6)] border border-border bg-muted px-1 text-[11px]">
                ↓
              </kbd>
              <span className="text-[10px] text-muted-foreground">导航</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius)*0.6)] border border-border bg-muted px-1 text-[11px]">
                ↵
              </kbd>
              <span className="text-[10px] text-muted-foreground">选择</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius)*0.6)] border border-border bg-muted px-1 text-[11px]">
                esc
              </kbd>
              <span className="text-[10px] text-muted-foreground">关闭</span>
            </div>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground no-underline">
            <span className="text-[10px] font-normal text-muted-foreground">
              搜索由 Pagefind 提供支持
            </span>
          </div>
        </div>
      )}
    </footer>
  )
}
export default SearchFooter
