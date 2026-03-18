import { AlertTriangleIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import type * as React from 'react'

import {
  AlertAction,
  AlertDescription,
  Alert as AlertPrimitive,
  AlertTitle,
} from '../_internal/alert'

export type AlertType = 'notice' | 'negative' | 'positive' | 'default' | 'warning'

/**
 * Props for the opinionated Alert component.
 *
 * Maps a semantic `type` prop to the appropriate icon and visual variant,
 * so you don't need to handle that mapping yourself.
 *
 * @example
 * ```tsx
 * <Alert type="positive" title="Payment successful" message="Your invoice has been sent." />
 * <Alert type="negative" title="Something went wrong" message={error.message} />
 * <Alert type="notice" message="Your session expires in 5 minutes." />
 * <Alert type="warning" title="Storage almost full">
 *   <Button size="sm">Upgrade plan</Button>
 * </Alert>
 * ```
 */
export interface AlertProps
  extends Omit<React.ComponentProps<typeof AlertPrimitive>, 'variant' | 'title'> {
  /**
   * Semantic type that controls the icon and colour variant.
   * - `default` — no icon, neutral styling
   * - `notice` — info icon (ℹ), neutral styling
   * - `positive` — check icon, green styling
   * - `warning` — triangle icon, amber styling
   * - `negative` — alert triangle icon, red/destructive styling
   * @default 'default'
   */
  type?: AlertType
  /** Alert heading rendered in bold. */
  title?: React.ReactNode
  /** Alert body text. Alternatively pass `children`. */
  message?: React.ReactNode
  children?: React.ReactNode
  /** Content rendered at the trailing edge of the alert (e.g. a dismiss button). */
  action?: React.ReactNode
  className?: string
}

function Alert({
  type = 'default',
  title,
  message,
  children,
  action,
  className,
  ...alertProps
}: AlertProps) {
  // Map alert types to variants
  const variant = type === 'negative' ? 'destructive' : type === 'warning' ? 'warning' : 'default'

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'negative':
        return <AlertTriangleIcon className="size-3.5" />
      case 'positive':
        return <CircleCheckIcon className="size-3.5" />
      case 'notice':
        return <InfoIcon className="size-3.5" />
      case 'warning':
        return <TriangleAlertIcon className="size-3.5" />
      default:
        return null
    }
  }

  const icon = getIcon()
  const content = message || children

  return (
    <AlertPrimitive variant={variant} className={className} {...alertProps}>
      {icon}
      <div className="flex-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {content && <AlertDescription>{content}</AlertDescription>}
      </div>
      {action && <AlertAction>{action}</AlertAction>}
    </AlertPrimitive>
  )
}

// Re-export all alert sub-components for convenience
export { AlertAction, AlertDescription, AlertTitle }

export { Alert }
