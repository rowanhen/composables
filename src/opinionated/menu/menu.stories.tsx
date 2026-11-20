import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Gallery } from '../../_storybook/gallery'
import { DropdownMenu, DropdownMenuCheckboxItem } from '../dropdown-menu/dropdown-menu'
import { Menu, MenuContent, MenuItem, MenuTrigger } from './menu'

const meta = {
	title: 'Components/Menu',
	component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

function Options() {
	const [archived, setArchived] = useState(false)

	return (
		<DropdownMenu trigger="View options">
			<DropdownMenuCheckboxItem
				value="show-archived"
				checked={archived}
				onCheckedChange={setArchived}
			>
				Show archived
			</DropdownMenuCheckboxItem>
		</DropdownMenu>
	)
}

export const Overview: Story = {
	name: 'Menu',
	args: { trigger: 'Project actions' },
	render: (args) => (
		<Gallery>
			<div className="flex flex-wrap items-center gap-3">
				<DropdownMenu
					{...args}
					items={[
						{ label: 'Edit', icon: <PencilIcon /> },
						{ label: 'Duplicate', icon: <CopyIcon /> },
						{ separator: true },
						{ label: 'Delete', icon: <TrashIcon />, destructive: true },
					]}
				/>
				<Options />
				<Menu>
					<MenuTrigger>More actions</MenuTrigger>
					<MenuContent>
						<MenuItem value="archive">Archive</MenuItem>
					</MenuContent>
				</Menu>
			</div>
		</Gallery>
	),
}
