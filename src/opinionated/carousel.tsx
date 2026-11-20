'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Carousel as Root,
	CarouselContent,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselNext,
	CarouselPlayToggle,
	CarouselPrevious,
	CarouselProgress,
	CarouselViewport,
} from '../components/keyframery/carousel'

export type CarouselProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	items?: readonly ReactNode[]
	children?: ReactNode
	showNavigation?: boolean
	showIndicators?: boolean
	showPlayToggle?: boolean
	viewportClassName?: string
}

export function Carousel({
	items,
	children,
	slidesPerPage,
	showNavigation = false,
	showIndicators = false,
	showPlayToggle = false,
	viewportClassName,
	...props
}: CarouselProps) {
	const slideBasis =
		typeof slidesPerPage === 'number' && slidesPerPage > 1
			? `calc((100% - ${slidesPerPage - 1} * var(--carousel-gap, 0.75rem)) / ${slidesPerPage})`
			: undefined

	return (
		<Root slidesPerPage={slidesPerPage} {...props}>
			{children ?? (
				<CarouselViewport className={viewportClassName}>
					<CarouselContent className="data-[orientation=vertical]:h-full">
						{items?.map((item, index) => (
							<CarouselItem key={index} style={slideBasis ? { flexBasis: slideBasis } : undefined}>
								{item}
							</CarouselItem>
						))}
					</CarouselContent>
				</CarouselViewport>
			)}
			{(showNavigation || showIndicators || showPlayToggle) && (
				<div className="flex flex-wrap items-center justify-between gap-3">
					{showIndicators && (
						<CarouselIndicatorGroup aria-label="Choose a slide page" className="empty:hidden">
							{({ pageCount }) =>
								pageCount && pageCount > 1
									? Array.from({ length: pageCount }, (_, index) => (
											<CarouselIndicator key={index} page={index + 1} />
										))
									: null
							}
						</CarouselIndicatorGroup>
					)}
					{(showNavigation || showPlayToggle) && (
						<div className="ms-auto flex items-center gap-2">
							{showPlayToggle && <CarouselPlayToggle />}
							{showNavigation && (
								<>
									<CarouselPrevious />
									<CarouselNext />
								</>
							)}
						</div>
					)}
				</div>
			)}
		</Root>
	)
}

export {
	CarouselContent,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselNext,
	CarouselPlayToggle,
	CarouselPrevious,
	CarouselProgress,
	CarouselViewport,
}
export { createCarouselController, type CarouselApi } from '../components/keyframery/carousel'
