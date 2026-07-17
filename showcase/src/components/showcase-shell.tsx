import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ArrowUpIcon, ComponentIcon, GalleryVerticalEndIcon, LayersIcon } from 'lucide-react'
import { Toaster } from '@/components/_internal/sonner'
import { HStack } from '@/components/_internal/stack'
import { Container } from '@/components/ui-opinionated/container'
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
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '@/components/ui-opinionated/sidebar'
import { aiElementPageMeta, type AIElementPageMeta } from '../ai-elements-pages'
import { showcaseGroups, type ShowcasePageMeta } from '../showcase-pages'
import { ThemeInjector } from './theme-injector'

export function ShowcaseShell() {
	const pathname = useRouterState({
		select: (state) => normalizePath(state.location.pathname),
	})

	return (
		<SidebarProvider className="bg-page text-foreground">
			<Toaster />
			<ThemeInjector />

			<Sidebar collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" tooltip="@leitware/composables" render={<Link to="/" />}>
								{/* Intentional icon tile (product logo mark), not an Avatar — semantic classes only. */}
								<div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
									<LayersIcon className="size-4" />
								</div>
								<div className="flex min-w-0 flex-col">
									<span className="truncate text-sm font-semibold">@leitware/composables</span>
									<span className="truncate text-xs text-sidebar-foreground/60">Showcase</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip="Index"
										isActive={pathname === '/'}
										render={<Link to="/" />}
									>
										<ComponentIcon />
										<span>Index</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										tooltip="Full showcase"
										isActive={pathname === '/showcase'}
										render={<Link to="/showcase" />}
									>
										<GalleryVerticalEndIcon />
										<span>Full showcase</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					<SidebarSeparator />

					{showcaseGroups.map((group) => (
						<SidebarGroup key={group.category}>
							<SidebarGroupLabel>{group.category}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.pages.map((page) => (
										<ComponentNavItem key={page.slug} page={page} pathname={pathname} />
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="sm" onClick={() => window.scrollTo({ top: 0 })}>
								<ArrowUpIcon />
								<span>Back to top</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>

			<SidebarInset>
				<header className="sticky top-0 z-sticky border-b border-stroke/60 bg-page/95 md:hidden">
					<Container maxWidth="full">
						<HStack align="center" gap={3} className="h-12">
							<SidebarTrigger />
							<Link to="/" className="min-w-0 font-medium hover:text-muted-foreground">
								@leitware/composables
							</Link>
						</HStack>
					</Container>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	)
}

function ComponentNavItem({ page, pathname }: { page: ShowcasePageMeta; pathname: string }) {
	const isAIElements = page.slug === 'ai-elements'
	const isActive = pathname === page.path || (isAIElements && pathname.startsWith('/ai-elements/'))

	return (
		<SidebarMenuItem>
			<SidebarMenuButton tooltip={page.title} isActive={isActive} render={<Link to={page.path} />}>
				<span>{page.title}</span>
			</SidebarMenuButton>

			{isAIElements && (
				<SidebarMenuSub>
					{aiElementPageMeta.map((aiPage) => (
						<AIElementNavItem key={aiPage.slug} page={aiPage} pathname={pathname} />
					))}
				</SidebarMenuSub>
			)}
		</SidebarMenuItem>
	)
}

function AIElementNavItem({ page, pathname }: { page: AIElementPageMeta; pathname: string }) {
	return (
		<SidebarMenuSubItem>
			<SidebarMenuSubButton isActive={pathname === page.path} render={<Link to={page.path} />}>
				<span>{page.title}</span>
			</SidebarMenuSubButton>
		</SidebarMenuSubItem>
	)
}

function normalizePath(pathname: string) {
	if (pathname === '/') {
		return pathname
	}

	return pathname.replace(/\/$/, '')
}
