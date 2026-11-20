'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Card as Root,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/keyframery/card'

export type CardProps = Omit<ComponentProps<typeof Root>, 'title' | 'children'> & {
	title?: ReactNode
	description?: ReactNode
	action?: ReactNode
	children?: ReactNode
	footer?: ReactNode
}

export function Card({ title, description, action, children, footer, ...props }: CardProps) {
	const hasHeader = title != null || description != null || action != null
	return (
		<Root {...props}>
			{hasHeader && (
				<CardHeader>
					{title != null && <CardTitle>{title}</CardTitle>}
					{description != null && <CardDescription>{description}</CardDescription>}
					{action != null && <CardAction>{action}</CardAction>}
				</CardHeader>
			)}
			{children != null && <CardContent>{children}</CardContent>}
			{footer != null && <CardFooter>{footer}</CardFooter>}
		</Root>
	)
}

export { CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
