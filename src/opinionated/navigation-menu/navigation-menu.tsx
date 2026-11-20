'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	NavigationMenu as Root,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from '../../components/keyframery/navigation-menu'

export type NavigationMenuItemData<Value extends string = string> = {
	label: ReactNode
} & ({ href: string; current?: boolean } | { value: Value; content: ReactNode; disabled?: boolean })

export type NavigationMenuProps<Value extends string = string> = ComponentProps<
	typeof Root<Value>
> & {
	items?: readonly NavigationMenuItemData<Value>[]
}

export function NavigationMenu<Value extends string = string>({
	items,
	children,
	...props
}: NavigationMenuProps<Value>) {
	return (
		<Root<Value> {...props}>
			{items ? (
				<>
					<NavigationMenuList>
						{items.map((item) =>
							'href' in item ? (
								<NavigationMenuItem key={item.href}>
									<NavigationMenuLink href={item.href} current={item.current}>
										{item.label}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem key={item.value} value={item.value}>
									<NavigationMenuTrigger disabled={item.disabled}>
										{item.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent>{item.content}</NavigationMenuContent>
								</NavigationMenuItem>
							),
						)}
					</NavigationMenuList>
					<NavigationMenuIndicator />
					<NavigationMenuViewport />
				</>
			) : (
				children
			)}
		</Root>
	)
}

export {
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuLinkIcon,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	createNavigationMenuController,
} from '../../components/keyframery/navigation-menu'
