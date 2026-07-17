import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { Slot } from 'radix-ui'

import { cn, FOCUS_RING } from '../lib/utils'

function BubbleGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="bubble-group"
			className={cn('flex min-w-0 flex-col gap-2', className)}
			{...props}
		/>
	)
}

const bubbleVariants = cva(
	'group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
	{
		variants: {
			variant: {
				default:
					'*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground',
				secondary:
					'*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground',
				muted: '*:data-[slot=bubble-content]:bg-muted *:data-[slot=bubble-content]:text-foreground',
				outline: '*:data-[slot=bubble-content]:border-stroke *:data-[slot=bubble-content]:bg-page',
				ghost:
					'border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0',
				destructive:
					'*:data-[slot=bubble-content]:bg-surface-critical *:data-[slot=bubble-content]:text-critical *:data-[slot=bubble-content]:border-stroke-critical',
				/** @deprecated Use `destructive` — kept for backwards compatibility. */
				critical:
					'*:data-[slot=bubble-content]:bg-surface-critical *:data-[slot=bubble-content]:text-critical *:data-[slot=bubble-content]:border-stroke-critical',
				success:
					'*:data-[slot=bubble-content]:bg-surface-success *:data-[slot=bubble-content]:text-success *:data-[slot=bubble-content]:border-stroke-success',
				warning:
					'*:data-[slot=bubble-content]:bg-surface-warning *:data-[slot=bubble-content]:text-warning *:data-[slot=bubble-content]:border-stroke-warning',
				info: '*:data-[slot=bubble-content]:bg-surface-info *:data-[slot=bubble-content]:text-info *:data-[slot=bubble-content]:border-stroke-info',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface BubbleProps
	extends React.ComponentProps<'div'>, VariantProps<typeof bubbleVariants> {
	align?: 'start' | 'end'
}

function Bubble({ variant = 'default', align = 'start', className, ...props }: BubbleProps) {
	return (
		<div
			data-slot="bubble"
			data-variant={variant}
			data-align={align}
			className={cn(bubbleVariants({ variant }), className)}
			{...props}
		/>
	)
}

function BubbleContent({
	asChild = false,
	className,
	...props
}: React.ComponentProps<'div'> & {
	asChild?: boolean
}) {
	const Comp = asChild ? Slot.Root : 'div'

	return (
		<Comp
			data-slot="bubble-content"
			className={cn(
				`${FOCUS_RING} w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-xs/relaxed wrap-break-word motion-colors [button]:text-left [button,a]:outline-none`,
				className,
			)}
			{...props}
		/>
	)
}

const bubbleReactionsVariants = cva(
	'bg-muted ring-card absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-1.5 py-0.5 text-xs ring-[length:var(--focus-ring-width)] has-[button]:p-0',
	{
		variants: {
			side: {
				top: 'top-0 -translate-y-3/4',
				bottom: 'bottom-0 translate-y-3/4',
			},
			align: {
				start: 'left-3',
				end: 'right-3',
			},
		},
		defaultVariants: {
			side: 'bottom',
			align: 'end',
		},
	},
)

function BubbleReactions({
	side = 'bottom',
	align = 'end',
	className,
	...props
}: React.ComponentProps<'div'> & {
	align?: 'start' | 'end'
	side?: 'top' | 'bottom'
}) {
	return (
		<div
			data-slot="bubble-reactions"
			data-align={align}
			data-side={side}
			className={cn(bubbleReactionsVariants({ side, align }), className)}
			{...props}
		/>
	)
}

export {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReactions,
	bubbleReactionsVariants,
	bubbleVariants,
}
