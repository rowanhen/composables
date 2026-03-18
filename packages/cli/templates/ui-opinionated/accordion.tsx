import type { Accordion as AccordionPrimitiveBase } from '@base-ui/react/accordion'
import type * as React from 'react'

import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionPrimitive,
  AccordionTrigger,
} from '@/components/_internal/accordion'

/** A single panel in an Accordion. */
export interface AccordionItemData {
  /** Unique identifier for this panel (used for controlled open state). */
  value: string
  /** Content rendered in the clickable trigger/header row. */
  trigger: React.ReactNode
  /** Content revealed when this panel is open. */
  content: React.ReactNode
  /** Whether this panel is open by default. @default false */
  defaultOpen?: boolean
}

/**
 * Props for the opinionated Accordion component.
 *
 * Pass `items` for the convenience array API, or use `children`
 * with `AccordionItem` / `AccordionTrigger` / `AccordionContent` for full control.
 *
 * @example
 * ```tsx
 * <Accordion items={[
 *   { value: 'faq-1', trigger: 'What is this?', content: 'A component library.' },
 *   { value: 'faq-2', trigger: 'How do I install it?', content: '...', defaultOpen: true },
 * ]} />
 * ```
 */
export interface AccordionProps extends Omit<AccordionPrimitiveBase.Root.Props, 'children'> {
  className?: string
  /** Panels to render. When provided, `children` is ignored. */
  items?: AccordionItemData[]
  children?: React.ReactNode
}

function Accordion({
  className,
  items,
  children,
  defaultValue,
  ...accordionProps
}: AccordionProps) {
  // If items prop is provided, use opinionated API
  if (items) {
    // Calculate default value from items that have defaultOpen: true
    const defaultOpenValues = items.filter((item) => item.defaultOpen).map((item) => item.value)
    const computedDefaultValue =
      defaultValue ?? (defaultOpenValues.length > 0 ? defaultOpenValues : undefined)

    return (
      <AccordionPrimitive
        className={className}
        defaultValue={computedDefaultValue}
        {...accordionProps}
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive>
    )
  }

  // Fallback to children-based API for advanced use cases
  if (children) {
    return (
      <AccordionPrimitive className={className} defaultValue={defaultValue} {...accordionProps}>
        {children}
      </AccordionPrimitive>
    )
  }

  // If neither items nor children provided, return empty accordion
  return (
    <AccordionPrimitive className={className} defaultValue={defaultValue} {...accordionProps}>
      {null}
    </AccordionPrimitive>
  )
}

// Re-export all accordion sub-components for convenience
export { AccordionContent, AccordionItem, AccordionTrigger, Accordion }
