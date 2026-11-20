import type { ComponentProps } from 'react'
import { ContextMenu } from '../../components/keyframery/context-menu'

export type ContextMenuProps = ComponentProps<typeof ContextMenu>

export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuGroupLabel,
	ContextMenuItem,
	ContextMenuItemIcon,
	ContextMenuItemIndicator,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
	createMenuController as createContextMenuController,
	type MenuData as ContextMenuData,
} from '../../components/keyframery/context-menu'
