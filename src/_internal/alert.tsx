import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../lib/utils'

const alertVariants = cva(
	// Padding and icon scale with the body copy. --alert-accent-width draws a
	// leading bar in the variant's --alert-accent colour (0 by default).
	"grid gap-0.5 overflow-hidden rounded-lg border-(length:--alert-border-width) p-[0.75em] pl-[calc(0.75em_+_var(--alert-accent-width))] before:absolute before:inset-y-0 before:left-0 before:w-alert-accent-width before:bg-(--alert-accent) [--alert-accent:var(--bg-fill-secondary)] text-left text-body leading-relaxed has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-[0.5em] *:[svg]:row-span-2 *:[svg]:translate-y-[0.125em] *:[svg]:text-current *:[svg:not([class*='size-'])]:size-[1.25em] w-full relative group/alert",
	{
		variants: {
			variant: {
				default: 'bg-surface-default text-content-default',
				secondary: 'bg-muted text-content-default',
				outline: 'border-stroke bg-transparent text-content-default',
				destructive:
					'[--alert-accent:var(--bg-fill-critical)] bg-surface-critical border-stroke-critical text-critical *:data-[slot=alert-description]:text-critical/90 *:[svg]:text-icon-critical',
				warning:
					'[--alert-accent:var(--bg-fill-warning)] bg-surface-warning border-stroke-warning text-warning *:data-[slot=alert-description]:text-warning *:[svg]:text-icon-warning',
				success:
					'[--alert-accent:var(--bg-fill-success)] bg-surface-success border-stroke-success text-success *:data-[slot=alert-description]:text-success *:[svg]:text-icon-success',
				info: '[--alert-accent:var(--bg-fill-info)] bg-surface-info border-stroke-info text-info *:data-[slot=alert-description]:text-info *:[svg]:text-icon-info',
				brand:
					'bg-surface-brand border-stroke-brand text-brand *:data-[slot=alert-description]:text-brand/90 *:[svg]:text-icon-brand',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	)
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-content-default [&_a]:underline [&_a]:underline-offset-3',
				className,
			)}
			{...props}
		/>
	)
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-content-muted text-body leading-relaxed text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:hover:text-content-default [&_a]:underline [&_a]:underline-offset-3',
				className,
			)}
			{...props}
		/>
	)
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-action"
			className={cn('absolute top-[0.75em] right-[0.75em]', className)}
			{...props}
		/>
	)
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
