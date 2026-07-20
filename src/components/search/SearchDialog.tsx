import React from 'react'
import { Dialog } from '@base-ui/react/dialog'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  children: React.ReactNode
}

export function SearchDialog({ isOpen, onClose, onKeyDown, children }: SearchDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Popup
          className="fixed top-32 left-1/2 z-50 flex w-full max-w-[560px] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-xl duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[10%] max-sm:fixed max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:h-full max-sm:w-full max-sm:max-w-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-none max-sm:data-[state=closed]:slide-out-to-left-0 max-sm:data-[state=open]:slide-in-from-left-0"
          onKeyDown={onKeyDown}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">搜索网站文章</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default SearchDialog
