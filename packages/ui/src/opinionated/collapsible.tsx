import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type * as React from 'react'
import {
  CollapsibleContent,
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger,
} from '../_internal/collapsible'
import { FOCUS_RING } from '../lib/utils'

/**
 * Props for the opinionated Collapsible component.
 *
 * Pass `trigger` to use the opinionated API (styled trigger row with chevron icon).
 * Pass `children` directly for full manual control over the trigger/content structure.
 *
 * @example
 * ```tsx
 * <Collapsible trigger="Advanced settings" defaultOpen>
 *   <FormInput label="API key" />
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible trigger="Details" open={open} onOpenChange={setOpen}>
 *   <p>Some content here</p>
 * </Collapsible>
 * ```
 */
export interface CollapsibleProps
  extends Omit<React.ComponentProps<typeof CollapsiblePrimitive>, 'children'> {
  /** Content rendered in the clickable trigger row. */
  trigger?: React.ReactNode
  /** Content revealed when the collapsible is open. */
  children?: React.ReactNode
  /** Whether the collapsible starts open (uncontrolled). */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void
  className?: string
  /** Whether to render the chevron expand/collapse icon in the trigger. @default true */
  showIcon?: boolean
}

function Collapsible({
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
  className,
  showIcon = true,
  ...collapsibleProps
}: CollapsibleProps) {
  // If opinionated props are provided, use opinionated API
  if (trigger !== undefined) {
    return (
      <CollapsiblePrimitive
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        className={className}
        {...collapsibleProps}
      >
        <CollapsibleTrigger
          className={`group/collapsible-trigger flex w-full items-center justify-between gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-xs/relaxed font-medium transition-[opacity,box-shadow] outline-none hover:bg-muted/50 ${FOCUS_RING} disabled:pointer-events-none disabled:opacity-50 aria-expanded:bg-muted/50`}
        >
          <span className="flex-1">{trigger}</span>
          {showIcon && (
            <>
              <ChevronDownIcon
                data-slot="collapsible-trigger-icon"
                className="pointer-events-none shrink-0 size-4 text-muted-foreground group-aria-expanded/collapsible-trigger:hidden"
              />
              <ChevronUpIcon
                data-slot="collapsible-trigger-icon"
                className="pointer-events-none hidden shrink-0 size-4 text-muted-foreground group-aria-expanded/collapsible-trigger:inline"
              />
            </>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden px-2 text-xs/relaxed">
          <div className="pt-0 pb-4 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4">
            {children}
          </div>
        </CollapsibleContent>
      </CollapsiblePrimitive>
    )
  }

  // Fallback to children-based API for advanced use cases
  if (children) {
    return (
      <CollapsiblePrimitive
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        className={className}
        {...collapsibleProps}
      >
        {children}
      </CollapsiblePrimitive>
    )
  }

  // If neither opinionated props nor children provided, return empty collapsible
  return (
    <CollapsiblePrimitive
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      className={className}
      {...collapsibleProps}
    >
      {null}
    </CollapsiblePrimitive>
  )
}

// Re-export all collapsible sub-components for convenience
export { CollapsibleContent, CollapsibleTrigger, Collapsible }
