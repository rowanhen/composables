import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE, HOVER_RING } from '../lib/utils'

// Every variant carries the same (usually transparent) border so hover/focus
// border repaints never shift layout, and the background paints UNDER the
// border (no bg-clip-padding) so filled and outlined buttons read as the same
// size regardless of --border-width-base.
const buttonVariants = cva(
	`${FOCUS_RING} ${HOVER_RING} rounded-(--button-radius) border border-transparent text-xs/relaxed font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-[opacity,box-shadow,transform] active:scale-[var(--active-scale)] disabled:pointer-events-none disabled:opacity-disabled [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none`,
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground',
				outline:
					'border-stroke hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
				secondary:
					'bg-secondary text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
				ghost: 'hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
				destructive: `bg-surface-critical ${FOCUS_RING_DESTRUCTIVE} text-danger border-stroke-critical`,
				success: 'bg-surface-success text-success border-stroke-success',
				warning: 'bg-surface-warning text-warning border-stroke-warning',
				info: 'bg-surface-info text-info border-stroke-info',
				brand: 'bg-surface-brand text-brand border-stroke-brand',
				'brand-2': 'bg-surface-brand-2 text-brand-2 border-stroke-brand-2',
				'brand-3': 'bg-surface-brand-3 text-brand-3 border-stroke-brand-3',
				'brand-4': 'bg-surface-brand-4 text-brand-4 border-stroke-brand-4',
				'brand-5': 'bg-surface-brand-5 text-brand-5 border-stroke-brand-5',
				emphasis: 'bg-surface-emphasis text-emphasis border-stroke-emphasis',
				link: 'text-primary underline-offset-4 hover:underline hover:ring-0',
			},
			size: {
				default:
					"h-7 gap-1 px-3 text-xs/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				xs: "h-5 gap-1 px-2.5 text-2xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-2.5",
				sm: "h-6 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				lg: "h-8 gap-1 px-3.5 text-xs/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
				'icon-xs': "size-5 [&_svg:not([class*='size-'])]:size-2.5",
				'icon-sm': "size-6 [&_svg:not([class*='size-'])]:size-3",
				'icon-lg': "size-8 [&_svg:not([class*='size-'])]:size-4",
			},
			// Declared after `size` so the pill class wins any size-level radius
			// when tailwind-merge resolves conflicts.
			shape: {
				default: '',
				pill: 'rounded-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			shape: 'default',
		},
	},
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	shape = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, shape, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
