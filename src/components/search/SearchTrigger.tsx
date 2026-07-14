import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SearchTriggerProps {
  onClick: () => void
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isMacPlatform =
        userAgent.includes('mac') || userAgent.includes('iphone') || userAgent.includes('ipad')
      const timer = setTimeout(() => {
        setIsMac(isMacPlatform)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="搜索"
      title="搜索"
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'relative flex cursor-pointer items-center justify-start gap-2 px-3 text-muted-foreground hover:text-foreground sm:px-4'
      )}
    >
      <SearchIcon className="size-5 shrink-0" />
      <span className="hidden text-sm font-normal sm:inline">搜索</span>
      <kbd className="pointer-events-none hidden h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-80 select-none md:inline-flex">
        <span>{isMac ? '⌘' : 'Ctrl'}</span>K
      </kbd>
    </button>
  )
}
export default SearchTrigger
