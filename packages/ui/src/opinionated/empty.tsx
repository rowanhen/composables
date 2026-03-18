import type * as React from 'react'

import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  Empty as EmptyPrimitive,
  EmptyTitle,
} from '../_internal/empty'
import { TableCell, TableRow } from './table'
import { Typography } from './typography'

export interface EmptyProps {
  /**
   * Title text for the empty state
   */
  title?: React.ReactNode
  /**
   * Description text for the empty state
   */
  description?: React.ReactNode
  /**
   * Icon or media content to display
   */
  icon?: React.ReactNode
  /**
   * Additional content to display below the description
   */
  children?: React.ReactNode
  /**
   * Additional className
   */
  className?: string
}

/**
 * Opinionated Empty component with sensible defaults and common patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Empty title="No items found" description="There are no items to display." />
 *
 * // With icon
 * <Empty
 *   title="No proposals"
 *   description="Create your first proposal to get started."
 *   icon={<Icon />}
 * />
 *
 * // With action
 * <Empty title="No data" description="Get started by adding some data.">
 *   <Button>Add Data</Button>
 * </Empty>
 * ```
 */
function Empty({
  title,
  description,
  icon,
  children,
  className,
  ...props
}: EmptyProps & Omit<React.ComponentProps<typeof EmptyPrimitive>, 'children'>) {
  return (
    <EmptyPrimitive className={className} {...props}>
      {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
      {(title || description) && (
        <EmptyHeader>
          {title && (
            <EmptyTitle>
              {typeof title === 'string' ? (
                <Typography variant="heading-100">{title}</Typography>
              ) : (
                title
              )}
            </EmptyTitle>
          )}
          {description && (
            <EmptyDescription>
              {typeof description === 'string' ? (
                <Typography variant="body-100" className="text-muted-foreground">
                  {description}
                </Typography>
              ) : (
                description
              )}
            </EmptyDescription>
          )}
        </EmptyHeader>
      )}
      {children && <EmptyContent>{children}</EmptyContent>}
    </EmptyPrimitive>
  )
}

export interface EmptyTableStateProps {
  /**
   * Number of columns to span
   */
  colSpan: number
  /**
   * Title text for the empty state
   */
  title?: React.ReactNode
  /**
   * Subtitle/description text for the empty state
   */
  subtitle?: React.ReactNode
  /**
   * Icon or media content to display
   */
  icon?: React.ReactNode
  /**
   * Additional content to display below the description
   */
  children?: React.ReactNode
  /**
   * Additional className
   */
  className?: string
}

/**
 * Opinionated Empty state component specifically for tables.
 * Renders as a table row with a cell spanning all columns.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   {isEmpty ? (
 *     <EmptyTableState
 *       colSpan={columns.length}
 *       title="No proposals found"
 *       subtitle="There are no proposals matching your criteria."
 *     />
 *   ) : (
 *     // ... table rows
 *   )}
 * </TableBody>
 * ```
 */
function EmptyTableState({
  colSpan,
  title,
  subtitle,
  icon,
  children,
  className,
}: EmptyTableStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={className}>
        <EmptyPrimitive>
          {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
          {(title || subtitle) && (
            <EmptyHeader>
              {title && (
                <EmptyTitle>
                  {typeof title === 'string' ? (
                    <Typography variant="heading-100">{title}</Typography>
                  ) : (
                    title
                  )}
                </EmptyTitle>
              )}
              {subtitle && (
                <EmptyDescription>
                  {typeof subtitle === 'string' ? (
                    <Typography variant="body-100" className="text-muted-foreground">
                      {subtitle}
                    </Typography>
                  ) : (
                    subtitle
                  )}
                </EmptyDescription>
              )}
            </EmptyHeader>
          )}
          {children && <EmptyContent>{children}</EmptyContent>}
        </EmptyPrimitive>
      </TableCell>
    </TableRow>
  )
}

// Export individual components for advanced usage
export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }

export { Empty, EmptyTableState }
