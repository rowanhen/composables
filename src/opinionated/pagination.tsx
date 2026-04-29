import type * as React from 'react'

import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationPrimitive,
} from '../_internal/pagination'

/**
 * Props for the opinionated Pagination component.
 *
 * Renders a smart pagination bar that automatically shows ellipsis for large
 * page counts and keeps a consistent number of visible page buttons.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={page}
 *   totalPages={totalPages}
 *   onPageChange={setPage}
 * />
 *
 * // Hide previous/next arrows
 * <Pagination currentPage={3} totalPages={10} onPageChange={setPage} showPreviousNext={false} />
 * ```
 */
export interface PaginationProps extends Omit<
	React.ComponentProps<typeof PaginationPrimitive>,
	'children'
> {
	className?: string
	/** Currently active page number (1-indexed). */
	currentPage?: number
	/** Total number of pages. */
	totalPages?: number
	/** Called when the user clicks a page number or previous/next. */
	onPageChange?: (page: number) => void
	/** Whether to render Previous / Next navigation buttons. @default true */
	showPreviousNext?: boolean
	/** Override whether the previous button is enabled (default: `currentPage > 1`). */
	canGoPrevious?: boolean
	/** Override whether the next button is enabled (default: `currentPage < totalPages`). */
	canGoNext?: boolean
	/** Use children for a fully custom pagination layout. */
	children?: React.ReactNode
}

function Pagination({
	className,
	currentPage,
	totalPages,
	onPageChange,
	showPreviousNext = true,
	canGoPrevious,
	canGoNext,
	children,
	...paginationProps
}: PaginationProps) {
	// If opinionated props are provided, use opinionated API
	if (currentPage !== undefined && totalPages !== undefined) {
		const getPageNumbers = () => {
			const maxVisible = 7

			if (totalPages <= maxVisible) {
				return Array.from({ length: totalPages }, (_, i) => i + 1)
			}

			// Always show: [1] [...] [current-1] [current] [current+1] [...] [last]
			// This keeps the number of items consistent
			if (currentPage <= 3) {
				// Near the start: [1] [2] [3] [4] [5] [...] [last]
				return [1, 2, 3, 4, 5, '...', totalPages]
			}

			if (currentPage >= totalPages - 2) {
				// Near the end: [1] [...] [last-4] [last-3] [last-2] [last-1] [last]
				return [
					1,
					'...',
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				]
			}

			// Middle: [1] [...] [current-1] [current] [current+1] [...] [last]
			return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
		}

		const handlePageClick = (page: number) => {
			if (onPageChange) {
				onPageChange(page)
			}
		}

		const handlePrevious = () => {
			if (canGoPrevious !== false && currentPage > 1) {
				handlePageClick(currentPage - 1)
			}
		}

		const handleNext = () => {
			if (canGoNext !== false && currentPage < totalPages) {
				handlePageClick(currentPage + 1)
			}
		}

		const computedCanGoPrevious = canGoPrevious ?? currentPage > 1
		const computedCanGoNext = canGoNext ?? currentPage < totalPages

		return (
			<PaginationPrimitive className={className} {...paginationProps}>
				<PaginationContent>
					{showPreviousNext && (
						<PaginationItem>
							<PaginationPrevious
								onClick={(e) => {
									e.preventDefault()
									handlePrevious()
								}}
								aria-disabled={!computedCanGoPrevious}
								style={{
									pointerEvents: !computedCanGoPrevious ? 'none' : 'auto',
									opacity: !computedCanGoPrevious ? 0.5 : 1,
								}}
							/>
						</PaginationItem>
					)}

					{getPageNumbers().map((page, index) =>
						page === '...' ? (
							// biome-ignore lint/suspicious/noArrayIndexKey: Ellipsis position is stable
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={`page-${page}`}>
								<PaginationLink
									onClick={(e) => {
										e.preventDefault()
										handlePageClick(Number(page))
									}}
									isActive={page === currentPage}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						),
					)}

					{showPreviousNext && (
						<PaginationItem>
							<PaginationNext
								onClick={(e) => {
									e.preventDefault()
									handleNext()
								}}
								aria-disabled={!computedCanGoNext}
								style={{
									pointerEvents: !computedCanGoNext ? 'none' : 'auto',
									opacity: !computedCanGoNext ? 0.5 : 1,
								}}
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</PaginationPrimitive>
		)
	}

	// Fallback to children-based API for advanced use cases
	if (children) {
		return (
			<PaginationPrimitive className={className} {...paginationProps}>
				{children}
			</PaginationPrimitive>
		)
	}

	// If neither opinionated props nor children provided, return empty pagination
	return (
		<PaginationPrimitive className={className} {...paginationProps}>
			{null}
		</PaginationPrimitive>
	)
}

// Re-export all pagination sub-components for convenience
export {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}

export { Pagination }
