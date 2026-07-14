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
        <Dialog.Backdrop className="search-overlay" />
        <Dialog.Popup className="search-dialog" onKeyDown={onKeyDown} aria-describedby={undefined}>
          <Dialog.Title className="sr-only">搜索网站文章</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default SearchDialog
