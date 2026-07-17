import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../lib/utils'

const alertVariants = cva(
	"grid gap-0.5 rounded-lg border px-2 py-1.5 text-left text-xs/relaxed has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-1.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-3.5 w-full relative group/alert",
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				secondary: 'bg-muted text-foreground',
				outline: 'border-stroke bg-transparent text-foreground',
				destructive:
					'bg-surface-critical border-stroke-critical text-critical *:data-[slot=alert-description]:text-critical/90 *:[svg]:text-icon-critical',
				warning:
					'bg-surface-warning border-stroke-warning text-warning *:data-[slot=alert-description]:text-warning *:[svg]:text-icon-warning',
				success:
					'bg-surface-success border-stroke-success text-success *:data-[slot=alert-description]:text-success *:[svg]:text-icon-success',
				info: 'bg-surface-info border-stroke-info text-info *:data-[slot=alert-description]:text-info *:[svg]:text-icon-info',
				brand:
					'bg-surface-brand border-stroke-brand text-brand *:data-[slot=alert-description]:text-brand/90 *:[svg]:text-icon-brand',
				'brand-2':
					'bg-surface-brand-2 border-stroke-brand-2 text-brand-2 *:data-[slot=alert-description]:text-brand-2/90 *:[svg]:text-icon-brand-2',
				'brand-3':
					'bg-surface-brand-3 border-stroke-brand-3 text-brand-3 *:data-[slot=alert-description]:text-brand-3/90 *:[svg]:text-icon-brand-3',
				'brand-4':
					'bg-surface-brand-4 border-stroke-brand-4 text-brand-4 *:data-[slot=alert-description]:text-brand-4/90 *:[svg]:text-icon-brand-4',
				'brand-5':
					'bg-surface-brand-5 border-stroke-brand-5 text-brand-5 *:data-[slot=alert-description]:text-brand-5/90 *:[svg]:text-icon-brand-5',
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
				'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3',
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
				'text-muted-foreground text-xs/relaxed text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3',
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
			className={cn('absolute top-1.5 right-2', className)}
			{...props}
		/>
	)
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
