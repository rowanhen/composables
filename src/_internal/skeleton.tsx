import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const skeletonVariants = cva('bg-muted animate-pulse', {
	variants: {
		variant: {
			rectangle: 'rounded-md',
			circle: 'rounded-full',
			text: 'rounded',
		},
		size: {
			sm: 'h-4',
			md: 'h-6',
			lg: 'h-8',
		},
	},
	defaultVariants: { variant: 'rectangle' },
})

function Skeleton({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
	return (
		<div
			data-slot="skeleton"
			className={cn(skeletonVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

export { Skeleton, skeletonVariants }
