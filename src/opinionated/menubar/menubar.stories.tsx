import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Menubar,
	MenubarMenu,
	MenubarMenuContent,
	MenubarMenuItem,
	MenubarMenuTrigger,
} from '@leitware/composables'

const meta = { title: 'Components/Menubar' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Menubar',
	render: () => (
		<Menubar>
			<MenubarMenu>
				<MenubarMenuTrigger>File</MenubarMenuTrigger>
				<MenubarMenuContent>
					<MenubarMenuItem value="new">New document</MenubarMenuItem>
				</MenubarMenuContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarMenuTrigger>Edit</MenubarMenuTrigger>
				<MenubarMenuContent>
					<MenubarMenuItem value="undo">Undo</MenubarMenuItem>
				</MenubarMenuContent>
			</MenubarMenu>
		</Menubar>
	),
}
