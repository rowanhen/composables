import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { Label } from './label'
import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn('grid gap-3 w-full', className)}
			{...props}
		/>
	)
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			className={cn(
				FOCUS_RING,
				HOVER_RING,
				'border-(color:--choice-border-color) not-data-checked:hover:bg-(--bg-surface-hover) dark:bg-surface-field/30 data-checked:bg-selected data-checked:text-selected-foreground dark:data-checked:bg-selected data-checked:border-selected flex size-(--choice-size) rounded-full transition-shadow group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-disabled',
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="flex size-full items-center justify-center"
			>
				<div className="absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current group-aria-invalid/radio-group-item:bg-fill-critical" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	)
}

const radioGroupOptionVariants = cva(
	'flex cursor-pointer items-center gap-2 text-(length:--body-font-size) text-foreground normal-case font-normal leading-snug',
	{
		variants: {
			variant: {
				default: '',
				// Selectable tile: the whole card is the hit area and the checked
				// tile takes the selected colour as its border.
				card: 'bg-accent hover:bg-secondary rounded-(--input-radius) border border-transparent p-3 has-data-checked:border-selected has-disabled:cursor-not-allowed has-disabled:opacity-disabled motion-colors',
			},
		},
		defaultVariants: { variant: 'default' },
	},
)

/** A clickable row (or card) wrapping one RadioGroupItem and its label. */
function RadioGroupOption({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof Label> & VariantProps<typeof radioGroupOptionVariants>) {
	return (
		<Label
			data-slot="radio-group-option"
			data-variant={variant}
			className={cn(radioGroupOptionVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { RadioGroup, RadioGroupItem, RadioGroupOption, radioGroupOptionVariants }
