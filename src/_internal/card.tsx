import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../lib/utils'

// Every card gap and inset reads the card-scoped --card-space, derived from
// the --card-padding token: sm sits one spacing step tighter. Presets tune a
// single token and every size stays on the spacing scale.
const cardVariants = cva(
	'border-(length:--card-border-width) border-stroke text-content-default gap-(--card-space) overflow-hidden rounded-card py-(--card-space) text-body leading-relaxed has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-card *:[img:last-child]:rounded-b-card group/card flex flex-col',
	{
		variants: {
			size: {
				default: '[--card-space:var(--card-padding)]',
				sm: '[--card-space:calc(var(--card-padding)_-_var(--spacing))]',
			},
			variant: {
				default: 'bg-surface-default',
				// On the popover surface (white in light themes).
				raised: 'bg-surface-popover',
			},
		},
		defaultVariants: { size: 'default', variant: 'default' },
	},
)

function Card({
	className,
	size = 'default',
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
	return (
		<div
			data-slot="card"
			data-size={size}
			data-variant={variant}
			className={cn(cardVariants({ size, variant }), className)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'gap-1 rounded-t-card px-(--card-space) [.border-b]:pb-(--card-space) group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
				className,
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn('text-title leading-title font-medium', className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-content-muted text-body leading-relaxed', className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="card-content" className={cn('px-(--card-space)', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				'rounded-b-card px-(--card-space) [.border-t]:pt-(--card-space) flex items-center',
				className,
			)}
			{...props}
		/>
	)
}

export {
	cardVariants,
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
}
