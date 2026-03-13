import { AlertTriangleIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import type * as React from 'react'

import {
  AlertAction,
  AlertDescription,
  Alert as AlertPrimitive,
  AlertTitle,
} from '@/components/ui/alert'

export type AlertType = 'notice' | 'negative' | 'positive' | 'default' | 'warning'

export interface AlertProps
  extends Omit<React.ComponentProps<typeof AlertPrimitive>, 'variant' | 'title'> {
  type?: AlertType
  title?: React.ReactNode
  message?: React.ReactNode
  children?: React.ReactNode
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
