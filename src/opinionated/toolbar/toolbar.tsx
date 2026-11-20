import type { ComponentProps } from 'react'
import { Toolbar } from '../../components/keyframery/toolbar'

export type ToolbarProps = ComponentProps<typeof Toolbar>

export {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarInput,
	ToolbarLink,
	ToolbarSeparator,
	ToolbarToggle,
	ToolbarToggleGroup,
	createToolbarController,
} from '../../components/keyframery/toolbar'
