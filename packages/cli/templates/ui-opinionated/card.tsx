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

/**
 * Props for the opinionated Card component.
 *
 * @example
 * ```tsx
 * <Card title="Revenue" description="This month">
 *   <p>$12,400</p>
 * </Card>
 *
 * <Card
 *   title="Settings"
 *   action={<Button size="sm">Edit</Button>}
 *   footer={<Button variant="outline">Cancel</Button>}
 * >
 *   <FormInput label="Name" />
 * </Card>
 * ```
 */
export interface CardProps
  extends Omit<React.ComponentProps<typeof CardPrimitive>, 'size' | 'children' | 'title'> {
  /** Card heading displayed in the header. */
  title?: React.ReactNode
  /** Subtitle text displayed below the title. */
  description?: React.ReactNode
  /** Content placed in the top-right of the header (e.g. a button or badge). */
  action?: React.ReactNode
  /** Main card body content. */
  children?: React.ReactNode
  /** Content rendered in the card footer. */
  footer?: React.ReactNode
  /** Size variant affecting padding. @default 'default' */
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
