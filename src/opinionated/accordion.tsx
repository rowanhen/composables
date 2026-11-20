'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Accordion as Root,
	AccordionHeader,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from '../components/keyframery/accordion'

export interface AccordionItemData {
	value: string
	trigger: ReactNode
	content: ReactNode
	defaultOpen?: boolean
	disabled?: boolean
}

export type AccordionProps = ComponentProps<typeof Root> & {
	items?: readonly AccordionItemData[]
}

export function Accordion({ items, children, defaultValue, multiple, ...props }: AccordionProps) {
	const initiallyOpen = items?.filter((item) => item.defaultOpen).map((item) => item.value) ?? []
	const initialValue = defaultValue ?? (multiple ? initiallyOpen : initiallyOpen.slice(0, 1))

	return (
		<Root defaultValue={initialValue} multiple={multiple} {...props}>
			{items
				? items.map(({ value, trigger, content, disabled }) => (
						<AccordionItem key={value} value={value} disabled={disabled}>
							<AccordionHeader>
								<AccordionTrigger>{trigger}</AccordionTrigger>
							</AccordionHeader>
							<AccordionPanel>{content}</AccordionPanel>
						</AccordionItem>
					))
				: children}
		</Root>
	)
}

export { AccordionHeader, AccordionItem, AccordionPanel as AccordionContent, AccordionTrigger }
