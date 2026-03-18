// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type * as React from 'react'
import {
  CollapsibleContent,
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger,
} from '@/components/_internal/collapsible'
import { FOCUS_RING } from '@/lib/utils'

export interface CollapsibleProps
  extends Omit<React.ComponentProps<typeof CollapsiblePrimitive>, 'children'> {
  // Opinionated API props
  trigger?: React.ReactNode
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
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
