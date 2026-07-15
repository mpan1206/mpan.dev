import { useState } from 'react'
import type { TableOfContentsProps } from '@/types'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ListIcon } from 'lucide-react'

type Props = TableOfContentsProps

export function MobileTableOfContents({ headings }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const filteredHeadings = headings.filter((heading) => heading.depth <= 2)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="fixed right-8 bottom-24 z-50 h-12 w-12 rounded-full border-border bg-background/80 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-accent hover:text-accent-foreground lg:hidden"
            aria-label="目录"
          />
        }
      >
        <ListIcon className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex max-h-[80vh] flex-col overflow-hidden rounded-t-xl sm:max-w-none"
      >
        <SheetHeader className="text-left">
          <SheetTitle>目录</SheetTitle>
        </SheetHeader>
        <div className="hidden-scrollbar flex-1 overflow-y-auto px-4 pt-2 pb-8">
          {filteredHeadings.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无目录</p>
          ) : (
            <ul id="mobile-toc" className="flex flex-col gap-3.5 text-base text-muted-foreground">
              {filteredHeadings.map((heading) => (
                <li key={heading.slug} className="transition-colors hover:text-foreground">
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="block truncate py-1"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
