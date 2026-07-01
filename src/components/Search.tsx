import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import config from '@/config'

// We assert that config.algolia exists since we configured it
const DOC_SEARCH_CONFIG = config.algolia!

const MODAL_TRANSLATIONS = {
  searchBox: {
    clearButtonTitle: '清除查询',
    clearButtonAriaLabel: '清除查询',
    closeButtonText: '取消',
    closeButtonAriaLabel: '取消',
  },
  startScreen: {
    recentSearchesTitle: '最近搜索',
    noRecentSearchesText: '没有最近搜索记录',
    saveRecentSearchButtonTitle: '保存到最近搜索',
    removeRecentSearchButtonTitle: '从最近搜索中移除',
    favoriteSearchesTitle: '收藏',
    removeFavoriteSearchButtonTitle: '从收藏中移除',
  },
  errorScreen: {
    titleText: '无法获取搜索结果',
    helpText: '请检查网络连接',
  },
  footer: {
    selectText: '选择',
    selectKeyAriaLabel: '回车',
    navigateText: '导航',
    navigateUpKeyAriaLabel: '上箭头',
    navigateDownKeyAriaLabel: '下箭头',
    closeText: '关闭',
    closeKeyAriaLabel: 'Escape',
    poweredByText: '搜索提供方',
  },
  noResultsScreen: {
    noResultsText: '没有找到相关结果',
    suggestedQueryText: '试试搜索',
    reportMissingResultsText: '你认为这个搜索应该有结果吗？',
    reportMissingResultsLinkText: '点此反馈',
  },
} as const

// Ask AI is unused — provide a type-compatible stub.
const noop = (() => {}) as (toggle: boolean) => void

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const searchButtonRef = useRef<HTMLButtonElement>(null)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    searchButtonRef,
    isAskAiActive: false,
    onAskAiToggle: noop,
  })

  return (
    <>
      <button
        ref={searchButtonRef}
        type="button"
        aria-label="搜索"
        title="搜索"
        onClick={onOpen}
        className={cn(buttonVariants({ variant: 'ghost' }))}
      >
        <SearchIcon className="size-5" />
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            {...DOC_SEARCH_CONFIG}
            initialScrollY={window.scrollY}
            placeholder="搜索文章..."
            onClose={onClose}
            onAskAiToggle={noop}
            translations={MODAL_TRANSLATIONS}
          />,
          document.body
        )}
    </>
  )
}
