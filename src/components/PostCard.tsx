import { Badge } from '@/components/ui/badge'
import { CalendarDays } from 'lucide-react'
import type { PostCardProps } from '@/types'

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  date,
  href,
  tags,
  readingTime,
}: PostCardProps) => {
  return (
    <article>
      <a href={href} className="group block">
        <h3 className="mb-1 text-[1.3rem] font-medium text-primary underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-primary/60">
          {title}
        </h3>

        <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {readingTime && (
            <>
              <span className="mx-0.5 text-border">•</span>
              <span>{readingTime}</span>
            </>
          )}
        </div>

        <p className="mb-4 text-muted-foreground">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </a>
    </article>
  )
}

export default PostCard
