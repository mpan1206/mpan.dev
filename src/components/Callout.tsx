import {
  Info,
  AlertTriangle,
  AlertOctagon,
  Lightbulb,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'

export type CalloutType = 'info' | 'warning' | 'danger' | 'tip' | 'success'

export interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const iconMap: Record<CalloutType, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertOctagon,
  tip: Lightbulb,
  success: CheckCircle2,
}

const styles: Record<CalloutType, string> = {
  info: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30 [&_svg]:text-blue-500',
  warning: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30 [&_svg]:text-amber-500',
  danger: 'border-l-red-500 bg-red-50 dark:bg-red-950/30 [&_svg]:text-red-500',
  tip: 'border-l-purple-500 bg-purple-50 dark:bg-purple-950/30 [&_svg]:text-purple-500',
  success: 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 [&_svg]:text-emerald-500',
}

/**
 * Callout/admonition box for MDX content.
 * Usage in MDX:
 *   <Callout type="warning" title="注意">
 *     这是一条重要提示。
 *   </Callout>
 */
export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children, className }) => {
  const Icon = iconMap[type]

  return (
    <div
      className={`not-prose my-6 rounded-r-lg border-l-4 p-4 ${styles[type]} ${className ?? ''}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0" />
        <div className="min-w-0 flex-1 text-sm text-foreground">
          {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
          <div className="[&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Callout
