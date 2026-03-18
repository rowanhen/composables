// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { Dialog as SheetPrimitiveBase } from '@base-ui/react/dialog'
import type * as React from 'react'

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  Sheet as SheetPrimitive,
  SheetTitle,
  SheetTrigger,
} from '@/components/_internal/sheet'

export interface SheetProps extends Omit<SheetPrimitiveBase.Root.Props, 'children'> {
  // Opinionated API props
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  showCloseButton?: boolean
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

function Sheet({
  trigger,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  side = 'right',
  open,
  onOpenChange,
  ...sheetProps
}: SheetProps) {
  // If opinionated props are provided, use opinionated API
  if (
    trigger !== undefined ||
    title !== undefined ||
    description !== undefined ||
    footer !== undefined
  ) {
    return (
      <SheetPrimitive open={open} onOpenChange={onOpenChange} {...sheetProps}>
        {trigger && <SheetTrigger>{trigger}</SheetTrigger>}
        <SheetContent side={side} className={className} showCloseButton={showCloseButton}>
          {(title || description) && (
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && <SheetDescription>{description}</SheetDescription>}
            </SheetHeader>
          )}
          {children}
          {footer && <SheetFooter>{footer}</SheetFooter>}
        </SheetContent>
      </SheetPrimitive>
    )
  }

  // Fallback to children-based API for advanced use cases
  if (children) {
    return (
      <SheetPrimitive open={open} onOpenChange={onOpenChange} {...sheetProps}>
        {children}
      </SheetPrimitive>
    )
  }

  // If neither opinionated props nor children provided, return empty sheet
  return (
    <SheetPrimitive open={open} onOpenChange={onOpenChange} {...sheetProps}>
      {null}
    </SheetPrimitive>
  )
}

// Re-export all sheet sub-components for convenience
export {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}

export { Sheet }
