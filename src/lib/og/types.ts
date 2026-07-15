export interface OGTheme {
  backgroundColor: string
  backgroundGradient?: string
  textColor: string
  mutedTextColor: string
  accentColor: string
  logoUrl?: string
  logoBase64?: string
  brandName: string
}

export interface OGTemplate {
  render(): Record<string, unknown>
  getTheme(): OGTheme
}

export interface DefaultTemplateOptions {
  title: string
  description: string
  theme: OGTheme
}

export interface PostTemplateOptions {
  title: string
  publishDate?: string
  theme: OGTheme
}
