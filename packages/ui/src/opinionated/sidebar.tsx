/**
 * Opinionated Sidebar components.
 * Re-exports all primitives for advanced sidebar layouts.
 * The sidebar API is intentionally low-level to support diverse navigation patterns.
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarHeader>
 *       <SidebarMenu>
 *         <SidebarMenuItem>
 *           <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *         </SidebarMenuItem>
 *       </SidebarMenu>
 *     </SidebarHeader>
 *     <SidebarContent>
 *       <SidebarGroup>
 *         <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *         <SidebarGroupContent>
 *           <SidebarMenu>
 *             <SidebarMenuItem>
 *               <SidebarMenuButton>Home</SidebarMenuButton>
 *             </SidebarMenuItem>
 *           </SidebarMenu>
 *         </SidebarGroupContent>
 *       </SidebarGroup>
 *     </SidebarContent>
 *     <SidebarFooter>
 *       <SidebarMenu>
 *         <SidebarMenuItem>
 *           <SidebarMenuButton>Settings</SidebarMenuButton>
 *         </SidebarMenuItem>
 *       </SidebarMenu>
 *     </SidebarFooter>
 *   </Sidebar>
 *   <SidebarInset>
 *     <main>Page content</main>
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '../_internal/sidebar'
