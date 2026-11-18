import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/utils'

export type LayerCardRootProps = useRender.ComponentProps<'div'> & { layered?: boolean }

export const LayerCardRoot = forwardRef<HTMLDivElement, LayerCardRootProps>(function LayerCardRoot(
	{ layered = true, render, className, ...props },
	ref,
) {
	const defaultProps = {
		'data-slot': 'layer-card',
		'data-layered': layered,
		className: cn(
			'w-full overflow-hidden rounded-layer-card border border-stroke text-content-default',
			layered ? 'bg-muted' : 'bg-surface-default shadow-layer-card',
			className,
		),
	}
	return useRender({
		defaultTagName: 'div',
		render,
		ref,
		props: mergeProps<'div'>(defaultProps, props),
	})
})

export type LayerCardSectionProps = ComponentPropsWithoutRef<'div'>

export const LayerCardPrimary = forwardRef<HTMLDivElement, LayerCardSectionProps>(
	function LayerCardPrimary({ className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-slot="layer-card-primary"
				className={cn(
					'relative z-10 flex min-w-0 flex-col gap-2 rounded-layer-card border border-stroke-secondary bg-surface-default p-layer-card-inset shadow-layer-card',
					className,
				)}
				{...props}
			/>
		)
	},
)

export const LayerCardSecondary = forwardRef<HTMLDivElement, LayerCardSectionProps>(
	function LayerCardSecondary({ className, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-slot="layer-card-secondary"
				className={cn(
					'flex min-w-0 items-center gap-2 px-layer-card-inset py-3 text-sm font-medium text-content-secondary',
					className,
				)}
				{...props}
			/>
		)
	},
)
