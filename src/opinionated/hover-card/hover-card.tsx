'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	HoverCard as Root,
	HoverCardContent,
	HoverCardTrigger,
} from '../../components/keyframery/hover-card'

export type HoverCardProps = Omit<ComponentProps<typeof Root>, 'children'> &
	Pick<ComponentProps<typeof HoverCardContent>, 'align' | 'side' | 'sideOffset' | 'className'> & {
		trigger: ReactElement
		children: ReactNode
	}

export function HoverCard({
	trigger,
	children,
	className,
	align,
	side,
	sideOffset,
	...props
}: HoverCardProps) {
	return (
		<Root {...props}>
			<HoverCardTrigger render={trigger} />
			<HoverCardContent className={className} align={align} side={side} sideOffset={sideOffset}>
				{children}
			</HoverCardContent>
		</Root>
	)
}

export { HoverCardContent, HoverCardTrigger }
