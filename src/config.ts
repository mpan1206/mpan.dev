import { defineConfig } from '@/types/config'

const config = defineConfig({
  site: {
    meta: {
      title: 'MPan',
      author: 'Miles Pan',
      description: '一名普通的前端开发工程师',
      url: 'https://mpan.dev',
      email: 'hi@mpan.dev',
    },
    locale: {
      lang: 'zh-CN',
      dir: 'ltr',
      timezone: 'Asia/Shanghai',
    },
    brand: {
      favicon: '/favicon.svg',
      logo: '/logo.png',
      logoDark: '/logo-dark.png',
      ogImage: '/og.png',
      themeColor: '#ffffff',
    },
    seo: {
      algoliaVerification: '54637A85BD5301FD',
    },
  },
  nav: [
    { href: '/posts/', label: '文章' },
    { href: '/projects/', label: '项目' },
  ],
  social: [
    {
      name: 'github',
      url: 'https://github.com/mpan1206',
      linkTitle: 'GitHub',
      placements: ['navbar', 'hero'],
    },
    {
      name: 'twitter',
      url: 'https://x.com/mpan1206',
      linkTitle: 'Twitter',
      placements: ['hero'],
    },
    {
      name: 'bluesky',
      url: 'https://bsky.app/profile/mpan.dev',
      linkTitle: 'Bluesky',
      placements: ['hero'],
    },
    {
      name: 'discord',
      url: 'https://discord.gg/s6Z8d4kaAp',
      linkTitle: 'Discord',
      placements: ['hero'],
    },
    {
      name: 'weibo',
      url: 'https://weibo.com/u/6686849996',
      linkTitle: '微博',
      placements: ['hero'],
    },
    {
      name: 'zhihu',
      url: 'https://www.zhihu.com/people/mpan1206',
      linkTitle: '知乎',
      placements: ['hero'],
    },
    {
      name: 'bilibili',
      url: 'https://space.bilibili.com/490523113',
      linkTitle: '哔哩哔哩',
      placements: ['hero'],
    },
    {
      name: 'rss',
      url: '/rss.xml',
      linkTitle: 'RSS 订阅',
      placements: ['navbar'],
    },
  ],
  share: [
    { name: 'twitter', linkTitle: '分享到 X (Twitter)' },
    { name: 'weibo', linkTitle: '分享到微博' },
    { name: 'qq', linkTitle: '分享到 QQ' },
  ],
})

export default config
