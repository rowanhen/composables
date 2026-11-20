'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	ScrollArea as Root,
	ScrollAreaContent,
	ScrollAreaCorner,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from '../components/keyframery/scroll-area'

export type ScrollAreaProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	height?: string
	maxHeight?: string
	showHorizontal?: boolean
	showVertical?: boolean
	children?: ReactNode
}

const maxHeights: Record<string, string> = {
	sm: '12.5rem',
	md: '25rem',
	lg: '37.5rem',
	xl: '50rem',
}

export function ScrollArea({
	height,
	maxHeight,
	showHorizontal = false,
	showVertical = true,
	children,
	...props
}: ScrollAreaProps) {
	return (
		<Root {...props}>
			<ScrollAreaViewport
				style={{
					height,
					maxHeight: !height && maxHeight ? (maxHeights[maxHeight] ?? maxHeight) : undefined,
				}}
			>
				<ScrollAreaContent>{children}</ScrollAreaContent>
			</ScrollAreaViewport>
			{showVertical && <ScrollBar orientation="vertical" />}
			{showHorizontal && <ScrollBar orientation="horizontal" />}
			<ScrollAreaCorner />
		</Root>
	)
}

export function ScrollBar(props: Omit<ComponentProps<typeof ScrollAreaScrollbar>, 'children'>) {
	return (
		<ScrollAreaScrollbar {...props}>
			<ScrollAreaThumb />
		</ScrollAreaScrollbar>
	)
}
