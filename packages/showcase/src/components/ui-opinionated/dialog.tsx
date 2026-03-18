// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { Dialog as DialogPrimitiveBase } from '@base-ui/react/dialog'
import type * as React from 'react'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  Dialog as DialogPrimitive,
  DialogTitle,
  DialogTrigger,
} from '@/components/_internal/dialog'

export interface DialogProps extends Omit<DialogPrimitiveBase.Root.Props, 'children'> {
  // Opinionated API props
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  showCloseButton?: boolean
  className?: string
}

function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  open,
  onOpenChange,
  ...dialogProps
}: DialogProps) {
  // If opinionated props are provided, use opinionated API
  if (
    trigger !== undefined ||
    title !== undefined ||
    description !== undefined ||
    footer !== undefined
  ) {
    return (
      <DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
        {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
        <DialogContent className={className} showCloseButton={showCloseButton}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </DialogPrimitive>
    )
  }

  // Fallback to children-based API for advanced use cases
  if (children) {
    return (
      <DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
        {children}
      </DialogPrimitive>
    )
  }

  // If neither opinionated props nor children provided, return empty dialog
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
      {null}
    </DialogPrimitive>
  )
}

// Re-export all dialog sub-components for convenience
export {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

export { Dialog }
