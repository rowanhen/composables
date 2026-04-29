import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '../lib/utils'

const iconVariants = cva(
	'inline-flex items-center justify-center shrink-0 pointer-events-none [&>svg]:size-full',
	{
		variants: {
			size: {
				xs: 'size-2.5',
				sm: 'size-3',
				md: 'size-3.5',
				lg: 'size-4',
				xl: 'size-5',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

function Icon({
	className,
	size = 'md',
	spin = false,
	children,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof iconVariants> & {
		spin?: boolean
	}) {
	return (
		<span
			data-slot="icon"
			aria-hidden="true"
			className={cn(iconVariants({ size }), spin && 'animate-spin', className)}
			{...props}
		>
			{children}
		</span>
	)
}

export { Icon, iconVariants }
