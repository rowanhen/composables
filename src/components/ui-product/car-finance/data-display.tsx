import type * as React from 'react'
import { Typography } from '@/components/ui-extended/typography'
import { cn } from '@/lib/utils'

export interface DataGridProps extends React.ComponentProps<'dl'> {
  /**
   * Children data rows
   */
  children: React.ReactNode
}

/**
 * Container for data rows. Displays rows in a vertical stack.
 * Uses semantic HTML (`<dl>`) for better accessibility.
 *
 * @example
 * ```tsx
 * <DataGrid>
 *   <DataRow>
 *     <DataLabel>Name</DataLabel>
 *     <DataValue>John Doe</DataValue>
 *   </DataRow>
 * </DataGrid>
 * ```
 */
export function DataGrid({ children, className, ...props }: DataGridProps) {
  return (
    <dl className={cn('flex flex-col gap-1.5', className)} {...props}>
      {children}
    </dl>
  )
}

export interface DataRowProps extends React.ComponentProps<'div'> {
  /**
   * Children should be DataLabel and DataValue components
   */
  children: React.ReactNode
}

/**
 * A single row containing a label and value pair.
 * Displays in a responsive layout: stacked on mobile, 2-column grid on desktop.
 *
 * @example
 * ```tsx
 * <DataRow>
 *   <DataLabel>Email</DataLabel>
 *   <DataValue>user@example.com</DataValue>
 * </DataRow>
 * ```
 */
export function DataRow({ children, className, ...props }: DataRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-2 items-start min-w-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface DataLabelProps extends React.ComponentProps<'dt'> {
  /**
   * Label text
   */
  children: React.ReactNode
}

/**
 * Label component for data rows. Displays muted text.
 * Uses semantic HTML (`<dt>`) for better accessibility.
 *
 * @example
 * ```tsx
 * <DataLabel>Email address</DataLabel>
 * ```
 */
export function DataLabel({ children, className, ...props }: DataLabelProps) {
  return (
    <dt className={cn('break-words min-w-0', className)} {...props}>
      <Typography variant="body-100" className="text-muted-foreground">
        {children}
      </Typography>
    </dt>
  )
}

export interface DataValueProps extends React.ComponentProps<'dd'> {
  /**
   * Value content. Can contain multiple children for complex values.
   * Renders empty string if children are null or undefined.
   */
  children: React.ReactNode
}

/**
 * Value component for data rows. Displays small text and supports multiple children.
 * Uses semantic HTML (`<dd>`) for better accessibility.
 *
 * @example
 * ```tsx
 * // Simple value
 * <DataValue>John Doe</DataValue>
 *
 * // Complex value with multiple children
 * <DataValue>
 *   <span>£1,000</span>
 *   <span className="text-muted">(Calculated)</span>
 * </DataValue>
 * ```
 */
export function DataValue({ children, className, ...props }: DataValueProps) {
  return (
    <dd className={cn('break-words min-w-0', className)} {...props}>
      <Typography variant="body-100">{children}</Typography>
    </dd>
  )
}
