// ============================================================================
// @leitware/composables — barrel exports
// ============================================================================

// ── Utilities ───────────────────────────────────────────────────────────────
export { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE, DISABLED_OPACITY, leftPad } from './lib/utils'
export {
	formatNumericValue,
	parseNumericValue,
	sanitizeNumericInput,
	type NumericMode,
} from './lib/numeric-input'

// ── Hooks ───────────────────────────────────────────────────────────────────
export { useIsMobile } from './hooks/use-mobile'
export {
	useNumericInput,
	type NumericInputOptions,
	type UseNumericInputOptions,
	type UseNumericInputReturn,
} from './hooks/use-numeric-input'

// ── Opinionated components ──────────────────────────────────────────────────
// These are the recommended, higher-level wrappers that most users should use.

export {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	type AccordionItemData,
	type AccordionProps,
} from './opinionated/accordion'

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
	type AlertDialogProps,
} from './opinionated/alert-dialog'

export {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
	type AlertType,
	type AlertProps,
} from './opinionated/alert'

export { AspectRatio } from './opinionated/aspect-ratio'

export { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from './opinionated/avatar'

export { Badge, type BadgeProps } from './opinionated/badge'

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	type BreadcrumbItemData,
	type BreadcrumbProps,
} from './opinionated/breadcrumb'

export { Button, type ButtonProps } from './opinionated/button'
export { Calendar, CalendarDayButton } from './opinionated/calendar'

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	type CardProps,
} from './opinionated/card'

export {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselProps,
} from './opinionated/carousel'

export { Checkbox } from './opinionated/checkbox'
export { CodeBlock } from './opinionated/code-block'

export {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	type CollapsibleProps,
} from './opinionated/collapsible'

export {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	ComboboxValue,
	type ComboboxOption,
	type ComboboxProps,
} from './opinionated/combobox'

export { Container } from './opinionated/container'

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	type DialogProps,
} from './opinionated/dialog'

export { Divider } from './opinionated/divider'

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	type DropdownMenuItemData,
	type DropdownMenuProps,
} from './opinionated/dropdown-menu'

export { DropZone, DropZoneFile } from './opinionated/dropzone'

export {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTableState,
	EmptyTitle,
	type EmptyProps,
	type EmptyTableStateProps,
} from './opinionated/empty'

export {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle,
} from './opinionated/field'

export {
	FormCalendarPopover,
	type FormCalendarPopoverProps,
} from './opinionated/form-calendar-popover'
export { FormCheckbox, type FormCheckboxProps } from './opinionated/form-checkbox'
export {
	FormCombobox,
	type FormComboboxOption,
	type FormComboboxProps,
} from './opinionated/form-combobox'
export {
	FormDateOfBirth,
	type DateOfBirthValue,
	type FormDateOfBirthProps,
} from './opinionated/form-date-of-birth'
export { FormDropZone, ACCEPT_PRESETS, type FormDropZoneProps } from './opinionated/form-dropzone'
export { FormInput, type FormInputProps } from './opinionated/form-input'
export {
	FormInputGroup,
	type FormInputGroupProps,
	type FormInputGroupInputProps,
} from './opinionated/form-input-group'
export {
	FormMultiCombobox,
	type FormMultiComboboxOption,
	type FormMultiComboboxProps,
} from './opinionated/form-multi-combobox'
export { FormMultiDropZone, type FormMultiDropZoneProps } from './opinionated/form-multi-dropzone'
export {
	FormRadioGroup,
	type FormRadioGroupOption,
	type FormRadioGroupProps,
} from './opinionated/form-radiogroup'
export { FormSelect, type FormSelectOption, type FormSelectProps } from './opinionated/form-select'
export { FormSlider, type FormSliderProps } from './opinionated/form-slider'
export { FormSwitch, type FormSwitchProps } from './opinionated/form-switch'
export { FormTextarea, type FormTextareaProps } from './opinionated/form-textarea'

export { Grid } from './opinionated/grid'
export { GridOverlay, type GridOverlayProps } from './opinionated/grid-overlay'

export {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	type HoverCardProps,
} from './opinionated/hover-card'

export { Icon } from './opinionated/icon'
export { Input } from './opinionated/input'

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupTextarea,
} from './opinionated/input-group'

export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
	type ItemProps,
} from './opinionated/item'

export { Label } from './opinionated/label'

export { Section, NewspaperGrid, NewspaperCell } from './opinionated/layout'

export { BentoGrid, BentoCell } from './opinionated/layout-bento'

export {
	List,
	ListArrowItem,
	ListBulletItem,
	type ListItemData,
	type ListVariant,
	type ListProps,
} from './opinionated/list'

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	type PaginationProps,
} from './opinionated/pagination'

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
	type PopoverProps,
} from './opinionated/popover'

export {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
	type ProgressProps,
} from './opinionated/progress'

export { RadioGroup, RadioGroupItem } from './opinionated/radio-group'

export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './opinionated/resizable'

export { ScrollArea, ScrollBar, type ScrollAreaProps } from './opinionated/scroll-area'

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	type SelectOption,
	type SelectProps,
} from './opinionated/select'

export { Separator } from './opinionated/separator'

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	type SheetProps,
} from './opinionated/sheet'

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
} from './opinionated/sidebar'

export {
	Skeleton,
	SkeletonText,
	SkeletonAvatar,
	SkeletonButton,
	SkeletonInput,
	type SkeletonProps,
} from './opinionated/skeleton'

export { Slider } from './opinionated/slider'
export { Toaster } from './opinionated/sonner'
export { Spacer } from './opinionated/spacer'
export { Stack } from './opinionated/stack'
export { Switch } from './opinionated/switch'

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './opinionated/table'

export { Tabs, TabsContent, type TabItem } from './opinionated/tabs'

export { Textarea } from './opinionated/textarea'
export { ThemeInjector } from './opinionated/theme-injector'
export { Toggle, type ToggleProps } from './opinionated/toggle'

export { Tooltip, TooltipContent, TooltipTrigger, type TooltipProps } from './opinionated/tooltip'

export { Typography } from './opinionated/typography'

// Token config panel (advanced)
export { TokenConfigPanel } from './opinionated/token-config-panel'

// ── AI Elements (chatbot components) ───────────────────────────────────

export * from './opinionated/ai-message'
export * from './opinionated/ai-conversation'
export * from './opinionated/ai-prompt-input'
export * from './opinionated/ai-reasoning'
export * from './opinionated/ai-suggestion'
export * from './opinionated/ai-tool'
export * from './opinionated/ai-plan'
export * from './opinionated/ai-task'
export * from './opinionated/ai-chain-of-thought'
export * from './opinionated/ai-sources'
export * from './opinionated/ai-confirmation'
export * from './opinionated/ai-attachments'
export * from './opinionated/ai-inline-citation'
export * from './opinionated/ai-shimmer'
export * from './opinionated/ai-code-block'
