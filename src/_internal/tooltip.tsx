import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
	return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	)
}

const tooltipTriggerVariants = cva('', {
	variants: {
		variant: {
			default: '',
			// Marks inline text that reveals more on hover.
			underline:
				'cursor-help underline decoration-dashed decoration-(color:--bg-fill-primary) underline-offset-4',
		},
	},
	defaultVariants: { variant: 'default' },
})

function TooltipTrigger({
	className,
	variant = 'default',
	...props
}: TooltipPrimitive.Trigger.Props & VariantProps<typeof tooltipTriggerVariants>) {
	return (
		<TooltipPrimitive.Trigger
			data-slot="tooltip-trigger"
			className={cn(tooltipTriggerVariants({ variant }), className)}
			{...props}
		/>
	)
}

const tooltipContentVariants = cva(
	'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-(length:--body-font-size) leading-(--body-line-height) **:data-[slot=kbd]:rounded-md z-tooltip w-fit max-w-xs origin-(--transform-origin)',
	{
		variants: {
			variant: {
				// The preset's tooltip colours (--tooltip-bg / --tooltip-fg).
				default: 'bg-(--tooltip-bg) text-(color:--tooltip-fg)',
				inverse: 'bg-(--bg-inverse) text-(color:--text-inverse)',
				brand: 'bg-surface-brand text-foreground',
			},
		},
		defaultVariants: { variant: 'default' },
	},
)

function TooltipContent({
	className,
	side = 'top',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	variant = 'default',
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> &
	VariantProps<typeof tooltipContentVariants>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-tooltip"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					data-variant={variant}
					className={cn(tooltipContentVariants({ variant }), className)}
					{...props}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	)
}

export {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	tooltipContentVariants,
	tooltipTriggerVariants,
}
