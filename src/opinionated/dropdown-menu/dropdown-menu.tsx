'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	Menu,
	MenuCheckboxItem,
	MenuContent,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuItemIcon,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubContent,
	MenuSubTrigger,
	MenuTrigger,
} from '../../components/keyframery/menu'

export type DropdownMenuItemData =
	| {
			label: ReactNode
			value?: string
			onClick?: ComponentProps<typeof MenuItem>['onSelect']
			icon?: ReactNode
			shortcut?: string
			disabled?: boolean
			destructive?: boolean
			separator?: false
	  }
	| { separator: true }

export type DropdownMenuProps = Omit<ComponentProps<typeof Menu>, 'items' | 'children'> &
	Pick<ComponentProps<typeof MenuContent>, 'align' | 'side' | 'className'> & {
		trigger: string | ReactElement
		items?: readonly DropdownMenuItemData[]
		children?: ReactNode
	}

export function DropdownMenu({
	trigger,
	items,
	align = 'start',
	side = 'bottom',
	className,
	children,
	...props
}: DropdownMenuProps) {
	return (
		<Menu {...props}>
			{typeof trigger === 'string' ? (
				<MenuTrigger>{trigger}</MenuTrigger>
			) : (
				<MenuTrigger render={trigger} />
			)}
			<MenuContent className={className} align={align} side={side}>
				{children ??
					items?.map((item, index) =>
						item.separator ? (
							<MenuSeparator key={index} />
						) : (
							<MenuItem
								key={item.value ?? index}
								value={item.value}
								label={typeof item.label === 'string' ? item.label : undefined}
								shortcut={item.shortcut}
								onSelect={item.onClick}
								disabled={item.disabled}
								destructive={item.destructive}
							>
								{item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
								{item.label}
							</MenuItem>
						),
					)}
			</MenuContent>
		</Menu>
	)
}

export {
	MenuCheckboxItem as DropdownMenuCheckboxItem,
	MenuContent as DropdownMenuContent,
	MenuGroup as DropdownMenuGroup,
	MenuGroupLabel as DropdownMenuLabel,
	MenuItem as DropdownMenuItem,
	MenuRadioGroup as DropdownMenuRadioGroup,
	MenuRadioItem as DropdownMenuRadioItem,
	MenuSeparator as DropdownMenuSeparator,
	MenuShortcut as DropdownMenuShortcut,
	MenuSub as DropdownMenuSub,
	MenuSubContent as DropdownMenuSubContent,
	MenuSubTrigger as DropdownMenuSubTrigger,
	MenuTrigger as DropdownMenuTrigger,
}
