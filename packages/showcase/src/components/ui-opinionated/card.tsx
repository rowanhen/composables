// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type * as React from 'react'
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardPrimitive,
  CardTitle,
} from '@/components/_internal/card'

export interface CardProps
  extends Omit<React.ComponentProps<typeof CardPrimitive>, 'size' | 'children' | 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: 'default' | 'sm'
}

export const Card = ({
  title,
  description,
  action,
  children,
  footer,
  size = 'default',
  className,
  ...cardProps
}: CardProps) => {
  const hasHeader = title || description || action

  return (
    <CardPrimitive size={size} className={className} {...cardProps}>
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardPrimitive>
  )
}

// Re-export sub-components for advanced usage
export {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/_internal/card'
