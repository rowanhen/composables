// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
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
import type React from 'react'
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
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/_internal/sidebar'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

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

// Uses CSS transform to create a new containing block so `position:fixed`
// children are scoped to this element rather than the viewport.
function SidebarDemo({
  children,
  height = 300,
}: {
  children: React.ReactNode
  height?: number
}) {
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
          <div className="size-7 rounded-md bg-sidebar-accent shrink-0 flex items-center justify-center">
            <span className="text-xs font-bold text-sidebar-accent-foreground">A</span>
          </div>
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
              <div className="size-8 rounded-full bg-sidebar-accent shrink-0 flex items-center justify-center">
                <span className="text-xs font-bold text-sidebar-accent-foreground">R</span>
              </div>
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

export function SidebarShowcase() {
  return (
    <ShowcaseSection
      title="Sidebar"
      description="Application sidebar with collapsible navigation, multiple visual variants, and icon-only collapse mode."
    >
      <VStack gap={8}>
        {/* Variants */}
        <ShowcaseGroup label="Variants">
          <HStack gap={4} align="start">
            <VStack gap={2} className="flex-1 min-w-0">
              <Typography variant="caption-100" className="text-muted-foreground">sidebar (default)</Typography>
              <SidebarDemo>
                <SidebarProvider className="!min-h-0 h-full" defaultOpen>
                  <Sidebar variant="sidebar" collapsible="none">
                    <DemoSidebarContent />
                  </Sidebar>
                  <SidebarInset className="p-4">
                    <Typography variant="caption-100" className="text-muted-foreground">Main content</Typography>
                  </SidebarInset>
                </SidebarProvider>
              </SidebarDemo>
            </VStack>

            <VStack gap={2} className="flex-1 min-w-0">
              <Typography variant="caption-100" className="text-muted-foreground">floating</Typography>
              <SidebarDemo>
                <SidebarProvider className="!min-h-0 h-full" defaultOpen>
                  <Sidebar variant="floating" collapsible="none">
                    <DemoSidebarContent />
                  </Sidebar>
                  <SidebarInset className="p-4">
                    <Typography variant="caption-100" className="text-muted-foreground">Main content</Typography>
                  </SidebarInset>
                </SidebarProvider>
              </SidebarDemo>
            </VStack>

            <VStack gap={2} className="flex-1 min-w-0">
              <Typography variant="caption-100" className="text-muted-foreground">inset</Typography>
              <SidebarDemo>
                <SidebarProvider className="!min-h-0 h-full" defaultOpen>
                  <Sidebar variant="inset" collapsible="none">
                    <DemoSidebarContent />
                  </Sidebar>
                  <SidebarInset className="p-4">
                    <Typography variant="caption-100" className="text-muted-foreground">Main content</Typography>
                  </SidebarInset>
                </SidebarProvider>
              </SidebarDemo>
            </VStack>
          </HStack>
        </ShowcaseGroup>

        {/* Collapsible modes */}
        <ShowcaseGroup label="Collapsible modes">
          <HStack gap={4} align="start">
            <VStack gap={2} className="flex-1 min-w-0">
              <Typography variant="caption-100" className="text-muted-foreground">expanded</Typography>
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
              <Typography variant="caption-100" className="text-muted-foreground">collapsible="offExamples" (collapsed)</Typography>
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
              <Typography variant="caption-100" className="text-muted-foreground">collapsible="icon" (collapsed)</Typography>
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
        </ShowcaseGroup>

        {/* Right side */}
        <ShowcaseGroup label="Right side">
          <SidebarDemo>
            <SidebarProvider className="!min-h-0 h-full" defaultOpen>
              <SidebarInset className="p-4">
                <Typography variant="caption-100" className="text-muted-foreground">Main content</Typography>
              </SidebarInset>
              <Sidebar side="right" collapsible="none">
                <DemoSidebarContent />
              </Sidebar>
            </SidebarProvider>
          </SidebarDemo>
        </ShowcaseGroup>

        {/* Menu button sizes */}
        <ShowcaseGroup label="Menu button sizes">
          <HStack gap={4} align="start">
            <VStack gap={2} className="flex-1 min-w-0">
              <Typography variant="caption-100" className="text-muted-foreground">sm</Typography>
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
              <Typography variant="caption-100" className="text-muted-foreground">default</Typography>
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
              <Typography variant="caption-100" className="text-muted-foreground">lg</Typography>
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
        </ShowcaseGroup>

        {/* Sub-menu */}
        <ShowcaseGroup label="Sub-menu">
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
                <Typography variant="caption-100" className="text-muted-foreground">Design System</Typography>
              </SidebarInset>
            </SidebarProvider>
          </SidebarDemo>
        </ShowcaseGroup>

        {/* Skeleton loading */}
        <ShowcaseGroup label="Skeleton / loading state">
          <SidebarDemo height={220}>
            <SidebarProvider className="!min-h-0 h-full" defaultOpen>
              <Sidebar collapsible="none">
                <SidebarHeader>
                  <SidebarMenuSkeleton showIcon />
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {Array.from({ length: 5 }).map((_, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no identity
                          <SidebarMenuItem key={i}>
                            <SidebarMenuSkeleton showIcon />
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <SidebarInset className="p-4">
                <Typography variant="caption-100" className="text-muted-foreground">Loading…</Typography>
              </SidebarInset>
            </SidebarProvider>
          </SidebarDemo>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
