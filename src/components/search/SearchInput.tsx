import { useRef, useEffect } from 'react'
import { SearchIcon, Loader2Icon, XIcon } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  onClose: () => void
  loading: boolean
  placeholder: string
  isMobile?: boolean
}

export function SearchInput({
  value,
  onChange,
  onClear,
  onClose,
  loading,
  placeholder,
  isMobile,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input automatically on open
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="search-header">
      <div className="search-input-wrapper">
        {loading ? (
          <Loader2Icon className="size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="搜索"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 cursor-pointer rounded p-1 text-muted-foreground hover:bg-muted-foreground/15 hover:text-foreground"
            aria-label="清除查询"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
      {isMobile ? (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 shrink-0 cursor-pointer text-sm font-normal text-muted-foreground hover:text-foreground"
        >
          取消
        </button>
      ) : (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 flex shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="关闭对话框"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}
export default SearchInput
