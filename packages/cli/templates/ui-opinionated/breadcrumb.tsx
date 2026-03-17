import * as React from 'react'

import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export interface BreadcrumbItemData {
  /** Display label for the breadcrumb item */
  label: React.ReactNode
  /** URL to navigate to (omit for current page) */
  href?: string
  /** Click handler (alternative to href) */
  onClick?: () => void
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items. Last item is treated as current page. */
  items: BreadcrumbItemData[]
  /** Custom separator element */
  separator?: React.ReactNode
  /** Additional class names */
  className?: string
  /** Children for advanced usage (overrides items) */
  children?: React.ReactNode
}

/**
 * Opinionated Breadcrumb component with items array API.
 * The last item is automatically rendered as the current page (no link).
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics', href: '/products/electronics' },
 *     { label: 'Phones' }, // Current page, no link
 *   ]}
 * />
 * ```
 */
function Breadcrumb({ items, separator, className, children }: BreadcrumbProps) {
  // If children provided, use primitive API
  if (children) {
    return <BreadcrumbPrimitive className={className}>{children}</BreadcrumbPrimitive>
  }

  return (
    <BreadcrumbPrimitive className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <React.Fragment key={index}>
              {!isFirst && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : item.onClick ? (
                  <BreadcrumbLink
                    render={
                      <button type="button" onClick={item.onClick}>
                        {item.label}
                      </button>
                    }
                  />
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  )
}

// Re-export sub-components for advanced usage
export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
export { Breadcrumb }
