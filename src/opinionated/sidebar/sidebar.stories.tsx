import type { Meta, StoryObj } from '@storybook/react-vite'
import { FolderIcon, HouseIcon, SettingsIcon } from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from './sidebar'

const meta = { title: 'Components/Sidebar' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Sidebar',
	render: () => (
		<SidebarProvider className="min-h-80 overflow-hidden rounded-xl border">
			<Sidebar>
				<SidebarHeader>
					<SidebarTrigger aria-label="Collapse sidebar" />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup collapsible>
						<SidebarGroupLabel>Workspace</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton isActive tooltip="Home">
										<HouseIcon />
										<SidebarLabel>Home</SidebarLabel>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Projects">
										<FolderIcon />
										<SidebarLabel>Projects</SidebarLabel>
										<SidebarMenuBadge>3</SidebarMenuBadge>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Settings">
										<SettingsIcon />
										<SidebarLabel>Settings</SidebarLabel>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<SidebarInset className="p-4">
				<SidebarTrigger aria-label="Toggle sidebar" />
				<h2 className="mt-3 text-lg font-medium">Workspace overview</h2>
			</SidebarInset>
		</SidebarProvider>
	),
}
