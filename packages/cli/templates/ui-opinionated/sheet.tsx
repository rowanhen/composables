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

/**
 * Props for the opinionated Sheet component.
 *
 * A slide-out panel that animates in from a screen edge. Works like Dialog
 * but is anchored to an edge and typically used for forms or side panels.
 *
 * @example
 * ```tsx
 * <Sheet
 *   trigger={<Button>Open panel</Button>}
 *   title="Edit record"
 *   footer={<Button type="submit">Save</Button>}
 * >
 *   <FormInput label="Name" />
 * </Sheet>
 *
 * // From left edge
 * <Sheet side="left" trigger={<Button>Menu</Button>} title="Navigation">
 *   <nav>...</nav>
 * </Sheet>
 * ```
 */
export interface SheetProps extends Omit<SheetPrimitiveBase.Root.Props, 'children'> {
  /** Element that opens the sheet when clicked. */
  trigger?: React.ReactNode
  /** Sheet heading rendered in the header. */
  title?: React.ReactNode
  /** Subtitle text rendered below the title. */
  description?: React.ReactNode
  /** Sheet body content. */
  children?: React.ReactNode
  /** Content rendered in the sheet footer. */
  footer?: React.ReactNode
  /** Whether to show the built-in close (×) button. @default true */
  showCloseButton?: boolean
  className?: string
  /** Which edge the sheet slides in from. @default 'right' */
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
