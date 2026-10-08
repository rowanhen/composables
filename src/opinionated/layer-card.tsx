import { forwardRef, type ReactNode } from 'react'
import {
	LayerCardRoot,
	LayerCardPrimary,
	LayerCardSecondary,
	type LayerCardRootProps,
} from '../_internal/layer-card'

export interface LayerCardProps extends Omit<LayerCardRootProps, 'title' | 'layered'> {
	/** Content in the recessed upper layer. */
	title?: ReactNode
	/** Action beside the upper-layer title. */
	action?: ReactNode
	/** Optional recessed lower layer. */
	footer?: ReactNode
}

const LayerCardComponent = forwardRef<HTMLDivElement, LayerCardProps>(function LayerCard(
	{ title, action, footer, children, ...props },
	ref,
) {
	const header = title != null || action != null
	const layered = header || footer != null
	return (
		<LayerCardRoot ref={ref} layered={layered} {...props}>
			{header && (
				<LayerCardSecondary>
					<div className="min-w-0 flex-1">{title}</div>
					{action}
				</LayerCardSecondary>
			)}
			{layered ? (
				<LayerCardPrimary>{children}</LayerCardPrimary>
			) : (
				<div className="p-(--layer-card-padding)">{children}</div>
			)}
			{footer != null && <LayerCardSecondary>{footer}</LayerCardSecondary>}
		</LayerCardRoot>
	)
})

/** Recessed header/footer layers around a raised content surface. */
export const LayerCard = Object.assign(LayerCardComponent, {
	Root: LayerCardRoot,
	Primary: LayerCardPrimary,
	Secondary: LayerCardSecondary,
})
export { LayerCardRoot, LayerCardPrimary, LayerCardSecondary }
export type { LayerCardRootProps, LayerCardSectionProps } from '../_internal/layer-card'
