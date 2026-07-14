import { useEffect } from 'react'

interface UseKeyboardProps {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
}

export function useKeyboard({ onOpen, onClose, isOpen }: UseKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          onOpen()
        }
      }

      // Open search on '/' key press (except when writing in text fields)
      if (e.key === '/' && !isOpen) {
        const target = e.target as HTMLElement
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return
        }
        e.preventDefault()
        onOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onOpen, onClose])
}
