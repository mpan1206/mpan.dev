import type { ProjectCardProps } from '@/types'
import { CATEGORY_LABELS } from '@/types'
import { Scale, ExternalLink, Sparkles } from 'lucide-react'
import { SiGithub, SiNpm } from 'react-icons/si'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Golang: '#00ADD8',
  Go: '#00ADD8',
  Python: '#3572A5',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  Markdown: '#083fa1',
  JSON: '#292929',
  YAML: '#cb171e',
}

const getStatusBadge = (status: string) => {
  if (status.includes('活跃') || status.toLowerCase().includes('active')) {
    return {
      dotClass: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse',
      text: status,
    }
  }
  if (status.includes('贡献') || status.includes('开发') || status.toLowerCase().includes('wip')) {
    return {
      dotClass: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)] animate-pulse',
      text: status,
    }
  }
  return {
    dotClass: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]',
    text: status,
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  tags,
  image,
  githubUrl,
  demoUrl,
  npmUrl,
  license,
  status,
  language,
  category,
  highlights,
}: ProjectCardProps) => {
  const imageWrapperClass =
    'relative block aspect-[2/1] w-full overflow-hidden border-b border-border/40 bg-muted/50 group'
  const imageUrl = image ? (typeof image === 'string' ? image : image.src) : undefined
  const primaryLink = demoUrl || githubUrl || npmUrl
  const statusInfo = status ? getStatusBadge(status) : null

  const image_ = imageUrl ? (
    <img
      src={imageUrl}
      alt={title}
      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      loading="lazy"
    />
  ) : null

  const dateObj = typeof date === 'string' ? new Date(date) : date
  const isoString =
    dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj.toISOString() : ''
  const formattedDate =
    dateObj instanceof Date && !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'short',
        })
      : ''

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:ring-1 hover:shadow-primary/5 hover:ring-primary/30">
      {image_ &&
        (primaryLink ? (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden
            tabIndex={-1}
            className={imageWrapperClass}
          >
            {image_}
            {category && (
              <span className="absolute top-3 right-3 rounded-full border border-border/40 bg-background/85 px-2.5 py-0.5 text-[11px] font-medium text-foreground shadow-xs backdrop-blur-md">
                {CATEGORY_LABELS[category] || category}
              </span>
            )}
          </a>
        ) : (
          <div className={imageWrapperClass}>
            {image_}
            {category && (
              <span className="absolute top-3 right-3 rounded-full border border-border/40 bg-background/85 px-2.5 py-0.5 text-[11px] font-medium text-foreground shadow-xs backdrop-blur-md">
                {CATEGORY_LABELS[category] || category}
              </span>
            )}
          </div>
        ))}

      <CardHeader className="relative z-10 flex grow flex-col p-5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          {isoString && (
            <time className="text-xs font-medium text-muted-foreground" dateTime={isoString}>
              {formattedDate}
            </time>
          )}

          {statusInfo && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-foreground">
              <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dotClass}`} />
              <span>{statusInfo.text}</span>
            </div>
          )}
        </div>

        {primaryLink ? (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link block"
          >
            <CardTitle className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover/link:text-primary sm:text-xl">
              {title}
            </CardTitle>
          </a>
        ) : (
          <CardTitle className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {title}
          </CardTitle>
        )}

        <CardDescription className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>

        {highlights && highlights.length > 0 && (
          <ul className="mt-3.5 space-y-1.5 rounded-lg border border-border/30 bg-muted/30 p-2.5 text-xs text-foreground/80">
            {highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex items-start gap-1.5 leading-snug">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md bg-secondary/60 px-2 py-0.5 text-[11px] font-normal text-muted-foreground backdrop-blur-xs transition-colors hover:text-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-3 font-medium">
              {language && (
                <div className="flex items-center gap-1.5 text-foreground" title="主要语言">
                  <span
                    className="h-2 w-2 rounded-full ring-1 ring-background"
                    style={{
                      backgroundColor: languageColors[language] || 'currentColor',
                    }}
                  />
                  <span>{language}</span>
                </div>
              )}
              {license && (
                <div className="flex items-center gap-1 text-muted-foreground" title="开源协议">
                  <Scale className="h-3.5 w-3.5" />
                  <span>{license}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} 在线演示`}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>体验</span>
                </a>
              )}
              {npmUrl && (
                <a
                  href={npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} NPM 包`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/80 hover:text-primary"
                >
                  <SiNpm className="h-3.5 w-3.5 text-red-500" />
                  <span>NPM</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub 仓库`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/80 hover:text-primary"
                >
                  <SiGithub className="h-3.5 w-3.5" />
                  <span>源码</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
