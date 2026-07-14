import type { ShareName } from '@/types'

const TEMPLATES: Record<ShareName, (url: string, title: string, description?: string) => string> = {
  twitter: (url, title) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,

  weibo: (url, title) =>
    `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,

  qq: (url, title, description) =>
    `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || title)}`,
}

/** Generate a platform share URL from a post's metadata. */
export function generateShareUrl(
  name: ShareName,
  postUrl: string,
  title: string,
  description?: string
): string {
  return TEMPLATES[name](postUrl, title, description)
}
