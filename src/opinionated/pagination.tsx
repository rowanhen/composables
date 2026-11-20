'use client'

import type { ComponentProps } from 'react'
import { Pagination as Root, PaginationList } from '../components/keyframery/pagination'

export type PaginationProps = ComponentProps<typeof Root>

export function Pagination({ children, ...props }: PaginationProps) {
	return (
		<Root aria-label="Pagination" {...props}>
			{children ?? <PaginationList />}
		</Root>
	)
}

export {
	PaginationList as PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../components/keyframery/pagination'
