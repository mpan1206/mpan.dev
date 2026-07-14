interface SearchFooterProps {
  isMobile?: boolean
}

export function SearchFooter({ isMobile }: SearchFooterProps) {
  return (
    <footer className="search-footer">
      {!isMobile && (
        <div className="search-shortcuts w-full flex justify-between">
          <div className="flex gap-4">
            <div className="search-shortcut-item">
              <kbd className="search-key">↑</kbd>
              <kbd className="search-key">↓</kbd>
              <span className="text-[10px] text-muted-foreground">导航</span>
            </div>
            <div className="search-shortcut-item">
              <kbd className="search-key">↵</kbd>
              <span className="text-[10px] text-muted-foreground">选择</span>
            </div>
            <div className="search-shortcut-item">
              <kbd className="search-key">esc</kbd>
              <span className="text-[10px] text-muted-foreground">关闭</span>
            </div>
          </div>
          <div className="search-brand shrink-0">
             <span className="text-[10px] font-normal text-muted-foreground">搜索由 Orama 提供支持</span>
          </div>
        </div>
      )}
    </footer>
  )
}
export default SearchFooter
