'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	Popover as Root,
	PopoverContent,
	PopoverTrigger,
	PopoverDescription,
	PopoverTitle,
} from '../components/keyframery/popover'

export type PopoverProps = Omit<ComponentProps<typeof Root>, 'children'> &
	Pick<ComponentProps<typeof PopoverContent>, 'align' | 'side' | 'sideOffset' | 'className'> & {
		trigger: ReactElement | string
		children: ReactNode
	}

export function Popover({
	trigger,
	children,
	className,
	align,
	side,
	sideOffset,
	...props
}: PopoverProps) {
	return (
		<Root {...props}>
			{typeof trigger === 'string' ? (
				<PopoverTrigger>{trigger}</PopoverTrigger>
			) : (
				<PopoverTrigger render={trigger} />
			)}
			<PopoverContent className={className} align={align} side={side} sideOffset={sideOffset}>
				{children}
			</PopoverContent>
		</Root>
	)
}

export { PopoverContent, PopoverTrigger, PopoverDescription, PopoverTitle }
