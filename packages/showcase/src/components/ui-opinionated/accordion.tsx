import type { Accordion as AccordionPrimitiveBase } from '@base-ui/react/accordion'
import type * as React from 'react'

import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionPrimitive,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface AccordionItemData {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
  defaultOpen?: boolean
}

export interface AccordionProps extends Omit<AccordionPrimitiveBase.Root.Props, 'children'> {
  className?: string
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
