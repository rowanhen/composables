'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Empty as Root,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '../../components/keyframery/empty'
import { TableCell, TableRow } from '../table/table'

export type EmptyProps = Omit<ComponentProps<typeof Root>, 'title' | 'children'> & {
	title?: ReactNode
	description?: ReactNode
	icon?: ReactNode
	children?: ReactNode
}

export function Empty({ title, description, icon, children, ...props }: EmptyProps) {
	return (
		<Root {...props}>
			<EmptyHeader>
				{icon != null && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
				{title != null && <EmptyTitle>{title}</EmptyTitle>}
				{description != null && <EmptyDescription>{description}</EmptyDescription>}
			</EmptyHeader>
			{children != null && <EmptyContent>{children}</EmptyContent>}
		</Root>
	)
}

export type EmptyTableStateProps = Omit<EmptyProps, 'description' | 'className'> & {
	colSpan: number
	subtitle?: ReactNode
	className?: string
}

export function EmptyTableState({ colSpan, subtitle, className, ...props }: EmptyTableStateProps) {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} className={className}>
				<Empty description={subtitle} {...props} />
			</TableCell>
		</TableRow>
	)
}

export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
