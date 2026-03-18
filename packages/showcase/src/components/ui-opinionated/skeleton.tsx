// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type * as React from 'react'

import { Skeleton as SkeletonPrimitive } from '@/components/_internal/skeleton'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.ComponentProps<typeof SkeletonPrimitive> {
  /**
   * Width of the skeleton
   * Can be a number (pixels), string (e.g., "100%", "50px"), or "auto"
   */
  width?: number | string
  /**
   * Height of the skeleton
   * Can be a number (pixels), string (e.g., "100%", "50px"), or "auto"
   */
  height?: number | string
  /**
   * Shape variant
   * @default 'rectangle'
   */
  variant?: 'rectangle' | 'circle' | 'text'
  /**
   * Size preset for common use cases
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Opinionated Skeleton component with sensible defaults and common patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton width="100%" height="20px" />
 *
 * // Text skeleton
 * <Skeleton variant="text" width="200px" />
 *
 * // Circle (avatar)
 * <Skeleton variant="circle" size="lg" />
 *
 * // With size preset
 * <Skeleton size="md" width="100%" />
 * ```
 */
function Skeleton({
  width,
  height,
  variant = 'rectangle',
  size,
  className,
  style,
  ...props
}: SkeletonProps) {
  const sizeStyles = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
  }

  const variantStyles = {
    rectangle: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded',
  }

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined && {
      width: typeof width === 'number' ? `${width}px` : width,
    }),
    ...(height !== undefined && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
  }

  return (
    <SkeletonPrimitive
      className={cn(variantStyles[variant], size && !height && sizeStyles[size], className)}
      style={computedStyle}
      {...props}
    />
  )
}

/**
 * Skeleton component for text lines
 */
export function SkeletonText({
  lines = 1,
  width,
  className,
  ...props
}: {
  lines?: number
  width?: number | string | 'full' | 'sm' | 'md' | 'lg'
} & Omit<SkeletonProps, 'variant' | 'width'>) {
  const widthMap = {
    full: '100%',
    sm: '60%',
    md: '80%',
    lg: '90%',
  }

  const computedWidth =
    typeof width === 'string' && width in widthMap
      ? widthMap[width as keyof typeof widthMap]
      : width

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: not needed
          key={index}
          variant="text"
          width={index === lines - 1 ? computedWidth || '60%' : computedWidth || '100%'}
          height="1em"
        />
      ))}
    </div>
  )
}

/**
 * Skeleton component for avatars
 */
export function SkeletonAvatar({
  size = 'md',
  className,
  ...props
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return <Skeleton variant="circle" className={cn(sizeMap[size], className)} {...props} />
}

/**
 * Skeleton component for buttons
 */
export function SkeletonButton({
  size = 'md',
  className,
  ...props
}: {
  size?: 'sm' | 'md' | 'lg'
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  const sizeMap = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-6',
  }

  return (
    <Skeleton
      variant="rectangle"
      className={cn(sizeMap[size], 'rounded-md', className)}
      {...props}
    />
  )
}

/**
 * Skeleton component for form inputs
 */
export function SkeletonInput({ className, ...props }: Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <Skeleton
      variant="rectangle"
      height="40px"
      className={cn('rounded-md w-full', className)}
      {...props}
    />
  )
}

/**
 * Skeleton component for cards
 */
export function SkeletonCard({
  showHeader = true,
  showContent = true,
  lines = 3,
  className,
  ...props
}: {
  showHeader?: boolean
  showContent?: boolean
  lines?: number
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <div className={cn('rounded-lg border p-4 space-y-4', className)} {...props}>
      {showHeader && (
        <div className="space-y-2">
          <Skeleton variant="text" width="60%" height="1.5em" />
          <Skeleton variant="text" width="40%" height="1em" />
        </div>
      )}
      {showContent && (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: not needed
              key={index}
              variant="text"
              width={index === lines - 1 ? '60%' : '100%'}
              height="1em"
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Skeleton component for table rows
 */
export function SkeletonTableRow({
  columns = 3,
  className,
  ...props
}: {
  columns?: number
  className?: string
} & Omit<React.ComponentProps<'tr'>, 'className'>) {
  return (
    <tr className={className} {...props}>
      {Array.from({ length: columns }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: not needed
        <td key={index} className="px-4 py-3">
          <Skeleton variant="text" width="80%" height="1em" />
        </td>
      ))}
    </tr>
  )
}

export { Skeleton }
