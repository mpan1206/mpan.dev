import {
  Info,
  AlertTriangle,
  AlertOctagon,
  Lightbulb,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import type { CalloutType, CalloutProps } from '@/types'

const iconMap: Record<CalloutType, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertOctagon,
  tip: Lightbulb,
  success: CheckCircle2,
}

const styles: Record<CalloutType, string> = {
  info: 'border-l-callout-info bg-callout-info/10 [&_svg]:text-callout-info',
  warning: 'border-l-callout-warning bg-callout-warning/10 [&_svg]:text-callout-warning',
  danger: 'border-l-callout-danger bg-callout-danger/10 [&_svg]:text-callout-danger',
  tip: 'border-l-callout-tip bg-callout-tip/10 [&_svg]:text-callout-tip',
  success: 'border-l-callout-success bg-callout-success/10 [&_svg]:text-callout-success',
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
