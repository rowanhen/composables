'use client'

import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import {
	Tooltip as Root,
	TooltipContent,
	TooltipTrigger,
} from '../../components/keyframery/tooltip'

export type TooltipProps = Omit<ComponentProps<typeof Root>, 'children'> &
	Pick<
		ComponentProps<typeof TooltipContent>,
		'side' | 'sideOffset' | 'align' | 'alignOffset' | 'className'
	> & {
		content: ReactNode
		children: ReactNode
	}

export function Tooltip({
	content,
	children,
	side,
	sideOffset,
	align,
	alignOffset,
	className,
	...props
}: TooltipProps) {
	return (
		<Root {...props}>
			{isValidElement(children) ? (
				<TooltipTrigger render={children} />
			) : (
				<TooltipTrigger>{children}</TooltipTrigger>
			)}
			<TooltipContent
				className={className}
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
			>
				{content}
			</TooltipContent>
		</Root>
	)
}

export { TooltipContent, TooltipTrigger }
