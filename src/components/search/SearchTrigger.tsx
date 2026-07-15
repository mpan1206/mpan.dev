import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
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
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
    >
      <SearchIcon className="size-5 shrink-0" />
    </button>
  )
}
export default SearchTrigger
