import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'

import { cn } from '../lib/utils'

const spinnerVariants = cva('shrink-0', {
	variants: {
		variant: {
			default: 'size-4 animate-spin',
			// Three bouncing dots in currentColor.
			dots: 'h-4 w-auto text-primary',
		},
	},
	defaultVariants: { variant: 'default' },
})

function Spinner({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'svg'> & VariantProps<typeof spinnerVariants>) {
	if (variant === 'dots') {
		return (
			<svg
				role="status"
				aria-label="Loading"
				viewBox="0 0 60 32"
				fill="currentColor"
				className={cn(spinnerVariants({ variant }), className)}
				{...props}
			>
				{[8, 30, 52].map((cx, index) => (
					<circle
						key={cx}
						cx={cx}
						cy={20}
						r={7}
						className="motion-safe:animate-bounce [transform-box:fill-box]"
						style={{ animationDelay: `${index * 150}ms` }}
					/>
				))}
			</svg>
		)
	}

	return (
		<Loader2Icon
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Spinner, spinnerVariants }
