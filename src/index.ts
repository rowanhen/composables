// ============================================================================
// @leitware/composables - barrel exports
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
	AccordionHeader,
	AccordionItem,
	AccordionTrigger,
	type AccordionItemData,
	type AccordionProps,
} from './opinionated/accordion'

export {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
	type AlertDialogProps,
} from './opinionated/alert-dialog'

export {
	Alert,
	AlertClose,
	AlertDescription,
	AlertTitle,
	type AlertVariant,
	type AlertType,
	type AlertProps,
} from './opinionated/alert'

export { AspectRatio } from './opinionated/aspect-ratio'
export {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentProgress,
	AttachmentRemove,
	AttachmentTitle,
	AttachmentTrigger,
} from './opinionated/attachment'

export { Autocomplete, type AutocompleteProps } from './opinionated/autocomplete'

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

export {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReactions,
	type BubbleProps,
} from './opinionated/bubble'

export { Button, type ButtonProps } from './opinionated/button'
export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	type ButtonGroupProps,
} from './opinionated/button-group'

export { Calendar, CalendarDay } from './opinionated/calendar'

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
	type CarouselApi,
	CarouselContent,
	CarouselIndicator,
	CarouselIndicatorGroup,
	CarouselItem,
	CarouselNext,
	CarouselPlayToggle,
	CarouselPrevious,
	CarouselProgress,
	type CarouselProps,
	CarouselViewport,
	createCarouselController,
} from './opinionated/carousel'

export { Checkbox, type CheckboxProps } from './opinionated/checkbox'
export { ColorPicker, type ColorPickerProps } from './opinionated/color-picker'
export { CodeBlock, type CodeBlockProps } from './opinionated/code-block'

export {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	type CollapsibleProps,
} from './opinionated/collapsible'

export { Combobox, type ComboboxProps } from './opinionated/combobox'

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandItemIcon,
	CommandItemText,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from './opinionated/command'

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
	createContextMenuController,
	type ContextMenuData,
	type ContextMenuProps,
} from './opinionated/context-menu'

export {
	DescriptionList,
	type DescriptionListEntry,
	type DescriptionListProps,
} from './opinionated/description-list'

export { Dialog, DialogClose, type DialogProps } from './opinionated/dialog'

export {
	DataTable,
	DataTableBulkAction,
	type DataTableColumn,
	type DataTableProps,
} from './opinionated/data-table'

export { DatePicker, type DatePickerProps } from './opinionated/date-picker'

export {
	Direction,
	DirectionProvider,
	DirectionToggle,
	useDirection,
	type DirectionProviderProps,
	type TextDirection,
} from './opinionated/direction'

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

export {
	DropZone,
	type Accept,
	type DropZoneProps,
	type FileRejection,
} from './opinionated/dropzone'

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
	FieldControl,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldGroup,
	FieldLegend,
	FieldSet,
	FieldContent,
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
export { FormDropZone, type FormDropZoneProps } from './opinionated/form-dropzone'
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

export {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	type HoverCardProps,
} from './opinionated/hover-card'

export { Input } from './opinionated/input'

export { Kbd, KbdCombo, type KbdComboProps, type KbdProps } from './opinionated/kbd'

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupCount,
	InputGroupInput,
	InputGroupTextarea,
	InputGroupText,
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

export { Marker, MarkerContent, MarkerIcon, type MarkerProps } from './opinionated/marker'

export {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from './opinionated/message'
export {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerLabel,
	MessageScrollerViewport,
} from './opinionated/message-scroller'
export {
	Trace,
	TraceCollapsible,
	TraceCollapsibleContent,
	TraceCollapsibleTrigger,
	TraceDescription,
	TraceIcon,
	TraceLine,
	TraceTitle,
	type TraceStatus,
} from './opinionated/trace'

export {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
	type NativeSelectOptionData,
	type NativeSelectProps,
} from './opinionated/native-select'

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuLinkIcon,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	createNavigationMenuController,
	type NavigationMenuItemData,
	type NavigationMenuProps,
} from './opinionated/navigation-menu'

export { NumberInput, type NumberInputProps } from './opinionated/number-input'

export {
	createOTPInputController,
	OTPInput,
	OTPInputGroup,
	type OTPInputProps,
	OTPInputSeparator,
	OTPInputSlot,
} from './opinionated/otp-input'

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

export { PasswordInput, type PasswordInputProps } from './opinionated/password-input'

export {
	Popover,
	PopoverContent,
	PopoverDescription,
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

export {
	Resizable,
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from './opinionated/resizable'

export { ScrollArea, ScrollBar, type ScrollAreaProps } from './opinionated/scroll-area'

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValue,
	type SelectOption,
	type SelectProps,
} from './opinionated/select'

export {
	SegmentedControl,
	SegmentedControlItem,
	createSegmentedControlController,
	type SegmentedControlItemData,
	type SegmentedControlProps,
} from './opinionated/segmented-control'

export { Separator, SeparatorLabel } from './opinionated/separator'

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
	useSidebar,
} from './opinionated/sidebar'

export {
	Skeleton,
	SkeletonText,
	SkeletonAvatar,
	SkeletonButton,
	SkeletonInput,
	SkeletonCard,
	SkeletonTableRow,
	type SkeletonProps,
} from './opinionated/skeleton'

export { Slider } from './opinionated/slider'
export { TimeInput, type TimeInputProps } from './opinionated/time-input'

export {
	createToaster,
	toast,
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastIcon,
	ToastRegion,
	ToastTitle,
} from './opinionated/toast'
export { Spinner, type SpinnerSize } from './opinionated/spinner'
export { Stat, StatGroup, type StatProps } from './opinionated/stat'

export { Stepper, type StepperProps, type StepperStep } from './opinionated/stepper'

export { Switch, type SwitchProps } from './opinionated/switch'

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

export { Tabs, type TabItem, type TabsProps } from './opinionated/tabs'

export { Textarea } from './opinionated/textarea'
export { Toggle, type ToggleProps } from './opinionated/toggle'
export {
	ToggleGroup,
	ToggleGroupItem,
	type ToggleGroupOption,
	type ToggleGroupProps,
} from './opinionated/toggle-group'

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
	type ToolbarProps,
} from './opinionated/toolbar'

export { Tooltip, TooltipContent, TooltipTrigger, type TooltipProps } from './opinionated/tooltip'

// ── Supplementary exports ───────────────────────────────────────────────────
// Everything publicly exported by an opinionated module is reachable from the
// root barrel. (v3 subpath imports exposed whole modules; the root entrypoint
// must offer the same surface.)

export { AlertDialogFooter, AlertDialogHeader, AlertDialogMedia } from './opinionated/alert-dialog'
export { DropdownMenuShortcut } from './opinionated/dropdown-menu'
export {
	ACCEPT_PRESETS,
	DEFAULT_ACCEPT,
	DEFAULT_MAX_SIZE,
	formatFileSize,
} from './opinionated/dropzone'
export { SelectSeparator } from './opinionated/select'

export {
	useTableOfContentsActiveId,
	type TableOfContentsTrackingOptions,
} from './hooks/use-table-of-contents-active-id'

// Keyframery registry components with their documented names.
export {
	Chart,
	ChartCenter,
	ChartCursor,
	ChartGrid,
	ChartLegend,
	ChartMarks,
	ChartPlot,
	ChartTooltip,
	ChartXAxis,
	ChartYAxis,
	ChartContainer,
} from './opinionated/chart'
export { DateInput, DateInputSegment, createDateInputController } from './opinionated/date-input'
export {
	Drawer,
	DrawerBackdrop,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerGrip,
	DrawerHandle,
	DrawerHeader,
	DrawerOutlet,
	DrawerShortcut,
	DrawerTitle,
	DrawerTrigger,
	createDrawerController,
	sheetPhysics,
} from './opinionated/drawer'
export {
	FileInput,
	FileInputDropzone,
	FileInputDropzoneIcon,
	FileInputItem,
	FileInputItemRemove,
	FileInputList,
	FileInputTrigger,
	createFileInputController,
	relativePath,
} from './opinionated/file-input'
export {
	Filter,
	FilterBar,
	FilterBarReset,
	FilterClear,
	FilterContent,
	FilterEmpty,
	FilterInput,
	FilterList,
	FilterOption,
	FilterOptionIndicator,
	FilterSeparator,
	FilterTrigger,
	FilterValues,
	type FilterItem,
} from './opinionated/filter'
export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormStatus,
	FormSubmit,
	useFieldControl,
} from './opinionated/form'
export {
	createImageCropperController,
	type ImageCrop,
	ImageCropper,
	ImageCropperFlip,
	ImageCropperGrid,
	ImageCropperHandle,
	ImageCropperImage,
	ImageCropperRotate,
	ImageCropperSelection,
	ImageCropperViewport,
	ImageCropperZoom,
} from './opinionated/image-cropper'
export {
	createListboxController,
	Listbox,
	ListboxGroup,
	ListboxGroupLabel,
	ListboxItem,
	ListboxItemIcon,
	ListboxItemIndicator,
	ListboxItems,
	ListboxSeparator,
} from './opinionated/listbox'
export {
	contextMenuMotion,
	createMenuController,
	type MenuData,
	Menu,
	MenuCheckboxItem,
	MenuContent,
	MenuContextTrigger,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuItemIcon,
	MenuItemIndicator,
	MenuItems,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubContent,
	MenuSubTrigger,
	MenuTrigger,
} from './opinionated/menu'
export {
	createMenubarController,
	MenubarMenu,
	Menubar,
	MenubarMenuCheckboxItem,
	MenubarMenuContent,
	MenubarMenuContextTrigger,
	MenubarMenuGroup,
	MenubarMenuGroupLabel,
	MenubarMenuItem,
	MenubarMenuItemIcon,
	MenubarMenuItemIndicator,
	MenubarMenuItems,
	MenubarMenuRadioGroup,
	MenubarMenuRadioItem,
	MenubarMenuSeparator,
	MenubarMenuShortcut,
	MenubarMenuSub,
	MenubarMenuSubContent,
	MenubarMenuSubTrigger,
	MenubarMenuTrigger,
} from './opinionated/menubar'
export {
	Meter,
	MeterIndicator,
	MeterLabel,
	MeterTrack,
	MeterValue,
	type MeterProps,
} from './opinionated/meter'
export {
	createMotionStyle,
	MotionStyle,
	motionStyle,
	type MotionStylePreference,
	motionStyles,
	type MotionStyleValue,
	MotionStyleSwitcher,
} from './opinionated/motion-style'
export {
	Preferences,
	type PreferencesProps,
	usePreference,
	PreferenceSwitcher,
} from './opinionated/preferences'
export {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoiceDescription,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireError,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireItems,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from './opinionated/questionnaire'
export { Radio, RadioIndicator, createRadioGroupController } from './opinionated/radio'
export { Rating, RatingItem, createRatingController } from './opinionated/rating'
export { Sparkline, SparklinePlot } from './opinionated/sparkline'
export {
	Timeline,
	TimelineConnector,
	TimelineDescription,
	TimelineItem,
	TimelineMarker,
	TimelineTime,
	TimelineTitle,
	createTimelineController,
	type TimelineProps,
	type TimelineEvent,
} from './opinionated/timeline'
export {
	createTokenInputController,
	defaultCodec,
	fromText,
	toLabel,
	TokenInput,
	TokenInputEditor,
	TokenInputToken,
	TokenInputTokenRemove,
	toText,
	type TokenInputProps,
} from './opinionated/token-input'
export {
	Tree,
	TreeGroup,
	TreeItem,
	TreeItemCheckbox,
	TreeItemIndicator,
	TreeItemLabel,
	TreeItems,
	createTreeController,
	toggleTreeChecked,
	treeCheckedStates,
	treeFromPaths,
	visibleTreeRows,
} from './opinionated/tree'
export {
	createTriggerMenuController,
	textFieldAdapter,
	TriggerMenu,
	TriggerMenuContent,
	TriggerMenuEmpty,
	TriggerMenuGroup,
	TriggerMenuGroupLabel,
	TriggerMenuHint,
	TriggerMenuInput,
	TriggerMenuItem,
	TriggerMenuItemIcon,
	TriggerMenuItems,
	TriggerMenuList,
	TriggerMenuSeparator,
	TriggerMenuStatus,
} from './opinionated/trigger-menu'
export {
	createWaterfallController,
	visibleWaterfallRows,
	type WaterfallData,
	Waterfall,
	WaterfallAxis,
	WaterfallBar,
	WaterfallCell,
	WaterfallColumnHeader,
	WaterfallHeaderRow,
	WaterfallIndicator,
	WaterfallMark,
	WaterfallRow,
	WaterfallRowHeader,
	WaterfallTick,
} from './opinionated/waterfall'

export {
	KeyframeryProvider,
	type MotionStyleName,
	type Speed,
} from './components/keyframery/motion'

export {
	Typography,
	typographyVariants,
	type TypographyProps,
	type TypographyVariant,
} from './opinionated/typography'
