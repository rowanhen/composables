import type React from 'react'
import {
	BarChart3Icon,
	BellIcon,
	FileTextIcon,
	FolderIcon,
	HomeIcon,
	LayoutDashboardIcon,
	MessageSquareIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '../_internal/skeleton'
import { Gallery, Group } from '../_storybook/gallery'
import { Avatar, AvatarFallback } from '../_internal/avatar'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarSeparator,
	SidebarTrigger,
} from '../_internal/sidebar'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Navigation/Sidebar',
	parameters: {
		docs: {
			description: { component: 'Application navigation shells and rail patterns.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const mainNav = [
	{ icon: HomeIcon, label: 'Home', isActive: true },
	{ icon: LayoutDashboardIcon, label: 'Dashboard' },
	{ icon: BarChart3Icon, label: 'Analytics', badge: '3' },
	{ icon: FileTextIcon, label: 'Documents' },
	{ icon: UsersIcon, label: 'Team' },
	{ icon: MessageSquareIcon, label: 'Messages', badge: '12' },
]
const settingsNav = [
	{ icon: BellIcon, label: 'Notifications' },
	{ icon: SettingsIcon, label: 'Settings' },
]
function SidebarDemo({ children, height = 300 }: { children: React.ReactNode; height?: number }) {
	return (
		<div
			className="relative overflow-hidden rounded-lg border border-stroke"
			style={{ height, transform: 'translateZ(0)' }}
		>
			{children}
		</div>
	)
}
function DemoSidebarContent() {
	return (
		<>
			<SidebarHeader>
				<HStack gap={2} align="center" className="px-1 py-0.5">
					<Avatar size="md" className="rounded-md">
						<AvatarFallback className="rounded-md bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
							A
						</AvatarFallback>
					</Avatar>
					<span className="text-sm font-semibold text-sidebar-foreground truncate">Acme Corp</span>
				</HStack>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainNav.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton isActive={item.isActive} tooltip={item.label}>
										<item.icon />
										<span>{item.label}</span>
									</SidebarMenuButton>
									{item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Account</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{settingsNav.map((item) => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton tooltip={item.label}>
										<item.icon />
										<span>{item.label}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<Avatar size="md">
								<AvatarFallback className="bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
									R
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col min-w-0">
								<span className="text-xs font-medium truncate">Rowan H.</span>
								<span className="text-xs text-sidebar-foreground/60 truncate">rowan@acme.com</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</>
	)
}

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<HStack gap={4} align="start">
					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							sidebar (default)
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar variant="sidebar" collapsible="none">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<Typography variant="caption-100" className="text-muted-foreground">
										Main content
									</Typography>
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							floating
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar variant="floating" collapsible="none">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<Typography variant="caption-100" className="text-muted-foreground">
										Main content
									</Typography>
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							inset
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar variant="inset" collapsible="none">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<Typography variant="caption-100" className="text-muted-foreground">
										Main content
									</Typography>
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const CollapsibleModes: Story = {
	name: 'Collapsible modes',
	render: () => (
		<Gallery>
			<Group label="Collapsible modes">
				<HStack gap={4} align="start">
					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							expanded
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar collapsible="offExamples">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<SidebarTrigger />
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							collapsible="offExamples" (collapsed)
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen={false}>
								<Sidebar collapsible="offExamples">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<SidebarTrigger />
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							collapsible="icon" (collapsed)
						</Typography>
						<SidebarDemo>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen={false}>
								<Sidebar collapsible="icon">
									<DemoSidebarContent />
								</Sidebar>
								<SidebarInset className="p-4">
									<SidebarTrigger />
								</SidebarInset>
							</SidebarProvider>
						</SidebarDemo>
					</VStack>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const RightSide: Story = {
	name: 'Right side',
	render: () => (
		<Gallery>
			<Group label="Right side">
				<SidebarDemo>
					<SidebarProvider className="!min-h-0 h-full" defaultOpen>
						<SidebarInset className="p-4">
							<Typography variant="caption-100" className="text-muted-foreground">
								Main content
							</Typography>
						</SidebarInset>
						<Sidebar side="right" collapsible="none">
							<DemoSidebarContent />
						</Sidebar>
					</SidebarProvider>
				</SidebarDemo>
			</Group>
		</Gallery>
	),
}

export const MenuButtonSizes: Story = {
	name: 'Menu button sizes',
	render: () => (
		<Gallery>
			<Group label="Menu button sizes">
				<HStack gap={4} align="start">
					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							sm
						</Typography>
						<SidebarDemo height={220}>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar collapsible="none">
									<SidebarContent>
										<SidebarGroup>
											<SidebarGroupContent>
												<SidebarMenu>
													{mainNav.slice(0, 5).map((item) => (
														<SidebarMenuItem key={item.label}>
															<SidebarMenuButton size="sm" isActive={item.isActive}>
																<item.icon />
																<span>{item.label}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>
								<SidebarInset />
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							default
						</Typography>
						<SidebarDemo height={220}>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar collapsible="none">
									<SidebarContent>
										<SidebarGroup>
											<SidebarGroupContent>
												<SidebarMenu>
													{mainNav.slice(0, 5).map((item) => (
														<SidebarMenuItem key={item.label}>
															<SidebarMenuButton size="default" isActive={item.isActive}>
																<item.icon />
																<span>{item.label}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>
								<SidebarInset />
							</SidebarProvider>
						</SidebarDemo>
					</VStack>

					<VStack gap={2} className="flex-1 min-w-0">
						<Typography variant="caption-100" className="text-muted-foreground">
							lg
						</Typography>
						<SidebarDemo height={220}>
							<SidebarProvider className="!min-h-0 h-full" defaultOpen>
								<Sidebar collapsible="none">
									<SidebarContent>
										<SidebarGroup>
											<SidebarGroupContent>
												<SidebarMenu>
													{mainNav.slice(0, 4).map((item) => (
														<SidebarMenuItem key={item.label}>
															<SidebarMenuButton size="lg" isActive={item.isActive}>
																<div className="size-8 rounded-md bg-sidebar-accent shrink-0 flex items-center justify-center">
																	<item.icon className="size-4 text-sidebar-accent-foreground" />
																</div>
																<span>{item.label}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>
								<SidebarInset />
							</SidebarProvider>
						</SidebarDemo>
					</VStack>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const SubMenu: Story = {
	name: 'Sub-menu',
	render: () => (
		<Gallery>
			<Group label="Sub-menu">
				<SidebarDemo height={280}>
					<SidebarProvider className="!min-h-0 h-full" defaultOpen>
						<Sidebar collapsible="none">
							<SidebarContent>
								<SidebarGroup>
									<SidebarGroupLabel>Files</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu>
											<SidebarMenuItem>
												<SidebarMenuButton isActive>
													<FolderIcon />
													<span>Projects</span>
												</SidebarMenuButton>
												<SidebarMenuSub>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton isActive>
															<span>Design System</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Marketing Site</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Mobile App</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												</SidebarMenuSub>
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuButton>
													<FolderIcon />
													<span>Archive</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuButton>
													<FileTextIcon />
													<span>Readme</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
						</Sidebar>
						<SidebarInset className="p-4">
							<Typography variant="caption-100" className="text-muted-foreground">
								Design System
							</Typography>
						</SidebarInset>
					</SidebarProvider>
				</SidebarDemo>
			</Group>
		</Gallery>
	),
}

export const SkeletonLoadingState: Story = {
	name: 'Skeleton / loading state',
	render: () => (
		<Gallery>
			<Group label="Skeleton / loading state">
				<SidebarDemo height={220}>
					<SidebarProvider className="!min-h-0 h-full" defaultOpen>
						<Sidebar collapsible="none">
							<SidebarHeader>
								<div className="flex h-8 items-center gap-2 px-2">
									<Skeleton className="size-4" />
									<Skeleton variant="text" size="sm" className="w-3/4" />
								</div>
							</SidebarHeader>
							<SidebarContent>
								<SidebarGroup>
									<SidebarGroupContent>
										<SidebarMenu>
											{Array.from({ length: 5 }).map((_, i) => (
												<SidebarMenuItem key={i}>
													<div className="flex h-8 items-center gap-2 px-2">
														<Skeleton className="size-4" />
														<Skeleton variant="text" size="sm" className="w-3/4" />
													</div>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
						</Sidebar>
						<SidebarInset className="p-4">
							<Typography variant="caption-100" className="text-muted-foreground">
								Loading…
							</Typography>
						</SidebarInset>
					</SidebarProvider>
				</SidebarDemo>
			</Group>
		</Gallery>
	),
}
