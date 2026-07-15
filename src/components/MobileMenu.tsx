import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MobileMenuProps } from '@/types'

export const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="打开菜单"
        onClick={() => setOpen(!open)}
        className="hover:bg-transparent focus-visible:ring-0 md:hidden"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {open && (
        <div className="absolute top-full left-0 z-40 w-full animate-in border-b border-border/50 bg-background px-4 py-8 shadow-sm duration-200 fade-in slide-in-from-top-2">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium tracking-wide text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {children && <div className="mt-8 flex justify-center">{children}</div>}
        </div>
      )}
    </>
  )
}

export default MobileMenu
