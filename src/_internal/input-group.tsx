import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'
import { cn, GROUP_FOCUS_RING, HOVER_RING } from '../lib/utils'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="input-group"
			role="group"
			className={cn(
				GROUP_FOCUS_RING,
				HOVER_RING,
				'data-[disabled=true]:opacity-disabled border-field bg-surface-input h-(--control-size-md) rounded-(--input-radius) border overflow-hidden bg-clip-padding has-data-[align=block-end]:rounded-(--input-radius) has-data-[align=block-start]:rounded-(--input-radius) has-[textarea]:rounded-(--input-radius) has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2 [[data-slot=combobox-content]_&]:focus-within:border-inherit [[data-slot=combobox-content]_&]:focus-within:ring-0 group/input-group relative flex w-full min-w-(--control-min-width) items-center outline-none has-[>textarea]:h-auto',
				className,
			)}
			{...props}
		/>
	)
}

const inputGroupAddonVariants = cva(
	"text-muted-foreground **:data-[slot=kbd]:bg-muted-foreground/10 h-auto gap-1 py-2 text-(length:--control-font-size) leading-relaxed font-medium **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-2xs [&>svg:not([class*='size-'])]:size-[1.5em] flex cursor-text items-center justify-center select-none",
	{
		variants: {
			align: {
				'inline-start':
					'pl-3 has-[>button]:pl-(--input-group-inset) has-[>kbd]:pl-(--input-group-inset) order-first',
				'inline-end':
					'pr-3 has-[>button]:pr-(--input-group-inset) has-[>kbd]:pr-(--input-group-inset) order-last',
				'block-start':
					'px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start',
				'block-end':
					'px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start',
			},
		},
		defaultVariants: {
			align: 'inline-start',
		},
	},
)

function InputGroupAddon({
	className,
	align = 'inline-start',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			role="group"
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest('button')) {
					return
				}
				e.currentTarget.parentElement?.querySelector('input')?.focus()
			}}
			{...props}
		/>
	)
}

const inputGroupButtonVariants = cva(
	// Sized by --input-group-button-size so buttons always sit inside the group,
	// never at full control size or the standalone button's min-width.
	'min-w-0 gap-1 rounded-md text-xs/relaxed shadow-none hover:border-transparent hover:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-(--bg-surface-hover) flex items-center',
	{
		variants: {
			size: {
				xs: "h-(--input-group-button-size) px-(--input-group-inset) [&>svg:not([class*='size-'])]:size-[1.25em]",
				sm: "h-(--input-group-button-size) px-3 [&>svg:not([class*='size-'])]:size-[1.25em]",
				'icon-xs':
					'size-[calc(var(--input-group-button-size)_-_var(--spacing))] p-0 has-[>svg]:p-0',
				'icon-sm': 'size-(--input-group-button-size) p-0 has-[>svg]:p-0',
			},
		},
		defaultVariants: {
			size: 'xs',
		},
	},
)

function InputGroupButton({
	className,
	type = 'button',
	variant = 'ghost',
	size = 'xs',
	...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
	VariantProps<typeof inputGroupButtonVariants> & {
		type?: 'button' | 'submit' | 'reset'
	}) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	)
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				"text-muted-foreground gap-2 text-(length:--control-font-size) leading-relaxed [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	)
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
	return (
		<Input
			data-slot="input-group-control"
			className={cn(
				'min-w-0 disabled:opacity-100 rounded-none border-0 bg-transparent shadow-none ring-0 hover:border-transparent hover:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent flex-1',
				className,
			)}
			{...props}
		/>
	)
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<Textarea
			data-slot="input-group-control"
			className={cn(
				'rounded-none border-0 bg-transparent py-2 shadow-none ring-0 hover:border-transparent hover:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent flex-1 resize-none',
				className,
			)}
			{...props}
		/>
	)
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
}
