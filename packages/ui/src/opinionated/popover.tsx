import type { Popover as PopoverPrimitiveBase } from '@base-ui/react/popover'
import type * as React from 'react'

import {
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	Popover as PopoverPrimitive,
	PopoverTitle,
	PopoverTrigger,
} from '../_internal/popover'

export interface PopoverProps extends Omit<PopoverPrimitiveBase.Root.Props, 'children'> {
	/** Element that triggers the popover */
	trigger: React.ReactNode
	/** Content to display in the popover */
	children: React.ReactNode
	/** Additional class names for the content */
	className?: string
	/** Alignment of the content relative to trigger */
	align?: 'start' | 'center' | 'end'
	/** Side to position the content */
	side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * Opinionated Popover component for floating content panels.
 *
 * @example
 * ```tsx
 * <Popover trigger={<Button variant="outline">Open Popover</Button>}>
 *   <PopoverHeader>
 *     <PopoverTitle>Dimensions</PopoverTitle>
 *     <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
 *   </PopoverHeader>
 *   <div className="grid gap-2">
 *     <Input placeholder="Width" />
 *     <Input placeholder="Height" />
 *   </div>
 * </Popover>
 *
 * // Simple usage
 * <Popover trigger={<Button>Info</Button>} side="right">
 *   <p>Additional information goes here.</p>
 * </Popover>
 * ```
 */
function Popover({
	trigger,
	children,
	className,
	align = 'center',
	side = 'bottom',
	...popoverProps
}: PopoverProps) {
	return (
		<PopoverPrimitive {...popoverProps}>
			<PopoverTrigger render={<>{trigger}</>} />
			<PopoverContent className={className} align={align} side={side}>
				{children}
			</PopoverContent>
		</PopoverPrimitive>
	)
}

// Re-export sub-components for advanced usage
export { PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
export { Popover }
