import type { ProjectCardProps } from '@/types'
import { Scale, Activity } from 'lucide-react'
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  tags,
  image,
  githubUrl,
  license,
  status,
  language,
}: ProjectCardProps) => {
  const imageWrapperClass =
    'relative block aspect-[2/1] w-full overflow-hidden border-b border-border/30 bg-muted'
  const imageUrl = image ? (typeof image === 'string' ? image : image.src) : undefined
  const image_ = imageUrl ? (
    <img
      src={imageUrl}
      alt={title}
      className="h-full w-full object-cover object-center"
      loading="lazy"
    />
  ) : null

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:ring-2 hover:ring-primary/20">
      {image_ &&
        (githubUrl ? (
          // Decorative duplicate of the title link; hidden from AT and keyboard.
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden
            tabIndex={-1}
            className={imageWrapperClass}
          >
            {image_}
          </a>
        ) : (
          <div className={imageWrapperClass}>{image_}</div>
        ))}

      <CardHeader className="relative z-10 grow pb-4">
        <div className="mb-2 flex items-center justify-between">
          <time className="text-xs text-muted-foreground" dateTime={date.toISOString()}>
            {date.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
            })}
          </time>
        </div>
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link block"
          >
            <CardTitle className="text-xl leading-tight transition-colors group-hover/link:text-primary">
              {title}
            </CardTitle>
          </a>
        ) : (
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
        )}
        <CardDescription className="mt-2 line-clamp-3 text-sm">{description}</CardDescription>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md bg-secondary/70 font-medium backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {(status || language || license) && (
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/50 pt-4 text-xs font-medium text-muted-foreground">
            {status && (
              <div className="flex items-center gap-1.5 text-foreground" title="项目状态">
                <Activity className="h-3.5 w-3.5" />
                <span>{status}</span>
              </div>
            )}
            {language && (
              <div className="flex items-center gap-1.5 text-foreground" title="主要语言">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: languageColors[language] || 'currentColor',
                  }}
                />
                <span>{language}</span>
              </div>
            )}
            {license && (
              <div className="flex items-center gap-1 text-foreground" title="开源协议">
                <Scale className="h-3.5 w-3.5" />
                <span>{license}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}

export default ProjectCard
