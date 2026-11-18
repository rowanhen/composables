import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE, HOVER_INDICATOR } from '../lib/utils'

// Every variant carries the same (usually transparent) border so hover/focus
// border repaints never shift layout, and the background paints UNDER the
// border (no bg-clip-padding) so filled and outlined buttons read as the same
// size regardless of --border-width-base.
const buttonVariants = cva(
	`${FOCUS_RING} ${HOVER_INDICATOR} rounded-button border text-control leading-relaxed font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-[opacity,transform] duration-interaction ease-standard active:[transform:scale(var(--active-scale,0.98))] disabled:pointer-events-none disabled:opacity-disabled [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none`,
	{
		variants: {
			variant: {
				default: 'button-primary hover:button-primary-hover active:bg-button-primary-active',
				outline:
					'hover:border-hover-ring border-stroke shadow-button-outline hover:shadow-[var(--button-outline-hover-shadow,var(--hover-shadow))] hover:bg-[var(--button-quiet-hover-bg,transparent)] hover:text-content-default aria-expanded:bg-muted aria-expanded:text-content-default',
				secondary:
					'hover:border-hover-ring button-secondary hover:button-secondary-hover active:bg-button-secondary-active aria-expanded:bg-fill-secondary aria-expanded:text-on-fill-secondary',
				// Neutral (white) and ghost fill on hover, like filled buttons, rather
				// than drawing the hover ring's border.
				neutral:
					'border-transparent bg-fill-secondary-inverse text-content-default hover:bg-surface-hover hover:border-(color:--bg-surface-hover) focus-visible:border-(color:--bg-fill-secondary-inverse) aria-expanded:bg-surface-hover',
				inverse:
					'border-transparent bg-inverse text-content-inverse hover:bg-inverse/85 hover:border-transparent focus-visible:border-(color:--bg-inverse)',
				ghost:
					'border-transparent hover:bg-[var(--button-quiet-hover-bg,var(--bg-surface-hover))] hover:border-[var(--button-quiet-hover-bg,var(--bg-surface-hover))] hover:text-content-default aria-expanded:bg-muted aria-expanded:text-content-default',
				destructive: `button-destructive hover:button-destructive-hover ${FOCUS_RING_DESTRUCTIVE}`,
				success: 'hover:border-hover-ring bg-surface-success text-success border-stroke-success',
				warning: 'hover:border-hover-ring bg-surface-warning text-warning border-stroke-warning',
				info: 'hover:border-hover-ring bg-surface-info text-info border-stroke-info',
				brand: 'font-(--button-brand-font-weight) button-brand hover:button-brand-hover',
				'brand-2': 'font-(--button-brand-font-weight) button-brand-2 hover:button-brand-2-hover',
				'brand-3': 'font-(--button-brand-font-weight) button-brand-3 hover:button-brand-3-hover',
				'brand-4': 'font-(--button-brand-font-weight) button-brand-4 hover:button-brand-4-hover',
				'brand-5': 'font-(--button-brand-font-weight) button-brand-5 hover:button-brand-5-hover',
				emphasis:
					'hover:border-hover-ring bg-surface-emphasis text-emphasis border-stroke-emphasis',
				link: 'border-transparent text-link underline underline-offset-4 hover:text-content-secondary hover:border-transparent hover:ring-0',
			},
			size: {
				default:
					"h-button min-w-[calc(var(--button-height)*var(--button-min-width-ratio))] gap-button-gap px-3 text-button/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				xs: "h-button-xs rounded-button-xs gap-1 px-2.5 text-button-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-2.5",
				sm: "h-button-sm min-w-[calc(var(--button-height-sm)*var(--button-min-width-ratio))] rounded-button-sm gap-1 px-2.5 text-button-sm/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				lg: "h-button-lg min-w-[calc(var(--button-height-lg)*var(--button-min-width-ratio))] gap-button-gap px-3.5 text-button/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-button [&_svg:not([class*='size-'])]:size-3.5",
				'icon-xs': "size-button-xs rounded-button-xs [&_svg:not([class*='size-'])]:size-2.5",
				'icon-sm': "size-button-sm rounded-button-sm [&_svg:not([class*='size-'])]:size-3",
				'icon-lg': "size-button-lg [&_svg:not([class*='size-'])]:size-4",
			},
			// Declared after `size` so the pill class wins any size-level radius
			// when tailwind-merge resolves conflicts.
			shape: {
				default: '',
				pill: 'rounded-full',
			},
		},
		// Links sit inline with text: no control height or side padding.
		compoundVariants: [{ variant: 'link', class: 'h-auto min-w-0 px-0' }],
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
