import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn, FOCUS_RING } from '../lib/utils'

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				'group/tabs flex min-w-0 gap-2 data-[orientation=horizontal]:flex-col',
				className,
			)}
			{...props}
		/>
	)
}

const segmentedList =
	'rounded-(--tabs-list-radius) bg-muted p-(--tabs-list-padding) shadow-(--tabs-list-shadow)'
const lineList =
	'gap-1 border-b border-stroke bg-transparent pb-1 group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-e group-data-[orientation=vertical]/tabs:pe-1'
const tabsListVariants = cva(
	'relative isolate inline-flex w-fit max-w-full shrink-0 items-stretch overflow-x-auto group/tabs-list group-data-[orientation=vertical]/tabs:flex-col',
	{
		variants: {
			variant: {
				default: segmentedList,
				segmented: segmentedList,
				line: lineList,
				underline: lineList,
			},
		},
		defaultVariants: { variant: 'segmented' },
	},
)

function TabsList({
	className,
	variant = 'segmented',
	children,
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	const segmented = variant === 'default' || variant === 'segmented'
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			data-treatment={segmented ? 'segmented' : 'underline'}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		>
			{children}
			<TabsPrimitive.Indicator
				data-slot="tabs-indicator"
				className={cn(
					'pointer-events-none absolute left-0 top-0 z-0 w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) transition-[translate,width,height] duration-(--motion-duration-disclosure) ease-(--motion-ease-standard) motion-reduce:transition-none',
					segmented
						? 'h-(--active-tab-height) rounded-(--tabs-tab-radius) border-(length:--tabs-indicator-border-width) border-stroke-secondary bg-surface-default shadow-(--tabs-indicator-shadow)'
						: 'h-0.5 bg-fill-primary [translate:var(--active-tab-left)_0] top-auto bottom-0 group-data-[orientation=vertical]/tabs:top-0 group-data-[orientation=vertical]/tabs:bottom-auto group-data-[orientation=vertical]/tabs:left-auto group-data-[orientation=vertical]/tabs:end-0 group-data-[orientation=vertical]/tabs:w-0.5 group-data-[orientation=vertical]/tabs:h-(--active-tab-height) group-data-[orientation=vertical]/tabs:[translate:0_var(--active-tab-top)]',
				)}
			/>
		</TabsPrimitive.List>
	)
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				FOCUS_RING,
				"relative z-10 inline-flex h-(--tabs-tab-height) shrink-0 items-center justify-center gap-1.5 rounded-(--tabs-tab-radius) bg-transparent px-2.5 text-sm font-normal whitespace-nowrap text-default outline-none transition-colors duration-(--motion-duration-color) data-active:font-medium disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled group-data-[orientation=vertical]/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
				'group-data-[treatment=underline]/tabs-list:hover:bg-surface-hover',
				className,
			)}
			{...props}
		/>
	)
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn('flex-1 text-xs/relaxed outline-none', className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
