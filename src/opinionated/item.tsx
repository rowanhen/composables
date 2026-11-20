'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Item as Root,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from '../components/keyframery/item'

export type ItemProps = Omit<ComponentProps<typeof Root>, 'title' | 'children'> & {
	title?: ReactNode
	description?: ReactNode
	icon?: ReactNode
	image?: ReactNode
	actions?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	children?: ReactNode
}

export function Item({
	title,
	description,
	icon,
	image,
	actions,
	header,
	footer,
	children,
	...props
}: ItemProps) {
	const hasContent = header != null || title != null || description != null || children != null

	return (
		<Root {...props}>
			{(image != null || icon != null) && (
				<ItemMedia variant={image != null ? 'image' : 'icon'}>{image ?? icon}</ItemMedia>
			)}
			{hasContent && (
				<ItemContent>
					{header ?? (
						<>
							{title != null && <ItemTitle>{title}</ItemTitle>}
							{description != null && <ItemDescription>{description}</ItemDescription>}
						</>
					)}
					{children}
				</ItemContent>
			)}
			{actions != null && <ItemActions>{actions}</ItemActions>}
			{footer != null && <ItemFooter>{footer}</ItemFooter>}
		</Root>
	)
}

export {
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
}
