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
      title={isMac ? '搜索 (⌘K)' : '搜索 (Ctrl+K)'}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        'text-muted-foreground hover:text-foreground'
      )}
    >
      <SearchIcon className="size-5 shrink-0" />
    </button>
  )
}
export default SearchTrigger
