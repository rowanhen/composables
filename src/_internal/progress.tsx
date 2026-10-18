import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const progressIndicatorVariants = cva(
	'h-full rounded-full transition-[width] duration-normal ease-out',
	{
		variants: {
			variant: {
				default: 'bg-primary',
				success: 'bg-fill-success',
				warning: 'bg-fill-warning',
				destructive: 'bg-fill-critical',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Progress({ className, value, ...props }: ProgressPrimitive.Root.Props) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			value={value}
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
	return (
		<ProgressPrimitive.Track
			data-slot="progress-track"
			className={cn(
				'relative h-2 w-full overflow-hidden rounded-full bg-muted has-data-[variant=success]:bg-surface-success has-data-[variant=warning]:bg-surface-warning has-data-[variant=destructive]:bg-surface-critical',
				className,
			)}
			{...props}
		/>
	)
}

function ProgressIndicator({
	className,
	variant,
	...props
}: ProgressPrimitive.Indicator.Props & VariantProps<typeof progressIndicatorVariants>) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			data-variant={variant ?? 'default'}
			className={cn(progressIndicatorVariants({ variant, className }))}
			{...props}
		/>
	)
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			data-slot="progress-label"
			className={cn('text-xs font-medium', className)}
			{...props}
		/>
	)
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			data-slot="progress-value"
			className={cn('text-xs text-muted-foreground tabular-nums', className)}
			{...props}
		/>
	)
}

export {
	Progress,
	ProgressTrack,
	ProgressIndicator,
	progressIndicatorVariants,
	ProgressLabel,
	ProgressValue,
}
