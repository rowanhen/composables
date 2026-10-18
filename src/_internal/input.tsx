import { Input as InputPrimitive } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

/**
 * The field surface shared by every text-like control: border, fill, radius,
 * height, text size and focus/hover rings. Use it for anything that should
 * read as a field, e.g. a button that opens a picker.
 */
const fieldControlVariants = cva(
	cn(
		FOCUS_RING,
		HOVER_RING,
		'bg-surface-input border-field h-(--control-size-md) rounded-(--input-radius) border text-(length:--control-font-size) max-md:text-[length:max(var(--control-font-size),var(--text-sm))] leading-relaxed w-full min-w-(--control-min-width) outline-none disabled:cursor-not-allowed disabled:opacity-disabled',
	),
)

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				fieldControlVariants(),
				'px-2 py-0.5 file:h-6 file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none',
				className,
			)}
			{...props}
			onWheel={(e) => {
				e.currentTarget.blur()
			}}
		/>
	)
}

/** A button styled as a field, for controls that open a picker (dates, menus). */
function FieldTrigger({ className, type = 'button', ...props }: React.ComponentProps<'button'>) {
	return (
		<button
			type={type}
			data-slot="field-trigger"
			className={cn(
				fieldControlVariants(),
				'flex cursor-pointer items-center justify-between gap-2 px-3 text-left data-[placeholder]:text-muted-foreground',
				className,
			)}
			{...props}
		/>
	)
}

export { FieldTrigger, Input, fieldControlVariants }
