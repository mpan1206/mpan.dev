// ============================================================================
// Platform / Icon names
// ============================================================================

/** All recognised platform / icon identifiers (social + share). */
export type PlatformName =
  'github' | 'twitter' | 'bluesky' | 'rss' | 'weibo' | 'zhihu' | 'bilibili' | 'qq' | 'discord'

/** Platforms that expose a share-URL template. Subset of PlatformName. */
export type ShareName = 'twitter' | 'weibo' | 'qq'

// ============================================================================
// Placement (replaces showInNavbar / showInFooter / showInHero booleans)
// ============================================================================

export type Placement = 'navbar' | 'footer' | 'hero'

// ============================================================================
// Site config – split by concern
// ============================================================================

/** Core identity used in <title>, OG tags, JSON-LD, and footer. */
export interface SiteMeta {
  title: string
  author: string
  description: string
  url: string
  email?: string
}

/** i18n / l10n settings. */
export interface SiteLocale {
  lang: string
  dir: 'ltr' | 'rtl'
  timezone: string
}

/** Visual assets: favicons, logos, OG image, theme-color. */
export interface SiteBranding {
  favicon: string
  logo: string
  logoDark: string
  ogImage: string
  themeColor: string
}

export interface SiteConfig {
  meta: SiteMeta
  locale: SiteLocale
  brand: SiteBranding
}

// ============================================================================
// Links
// ============================================================================

export interface SocialLink {
  name: PlatformName
  url: string
  linkTitle: string
  /** Where the icon should appear. An empty array hides it everywhere. */
  placements: Placement[]
}

export interface ShareLink {
  name: ShareName
  linkTitle: string
}

export interface NavLink {
  href: string
  label: string
}

// ============================================================================
// Top-level config
// ============================================================================

export interface MpanConfig {
  site: SiteConfig
  nav: NavLink[]
  social: SocialLink[]
  share: ShareLink[]
}

/** Type-safe config helper. */
export function defineConfig(config: MpanConfig): MpanConfig {
  return config
}
