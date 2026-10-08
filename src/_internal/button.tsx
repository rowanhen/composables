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
				default:
					'bg-primary text-primary-foreground border-(--button-primary-border) bg-[image:var(--button-primary-background-image)] shadow-(--button-primary-shadow) hover:shadow-[var(--button-primary-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-primary-hover-background-image)] hover:border-[var(--button-primary-hover-border,var(--hover-ring-color))]',
				outline:
					'border-stroke shadow-(--button-outline-shadow) hover:shadow-[var(--button-outline-hover-shadow,var(--hover-shadow))] hover:bg-[var(--button-quiet-hover-bg,transparent)] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
				secondary:
					'bg-secondary text-secondary-foreground border-(--button-secondary-border) shadow-(--button-secondary-shadow) hover:shadow-[var(--button-secondary-hover-shadow,var(--hover-shadow))] hover:bg-[var(--button-secondary-hover-bg,var(--bg-fill-secondary))] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
				ghost:
					'hover:bg-[var(--button-quiet-hover-bg,transparent)] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
				destructive: `bg-[var(--button-destructive-bg,var(--bg-surface-critical))] ${FOCUS_RING_DESTRUCTIVE} text-[var(--button-destructive-text,var(--text-critical))] border-[var(--button-destructive-border,var(--border-critical))] bg-[image:var(--button-destructive-background-image)] shadow-(--button-destructive-shadow) hover:shadow-[var(--button-destructive-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-destructive-hover-background-image)] hover:border-[var(--button-destructive-hover-border,var(--hover-ring-color))]`,
				success: 'bg-surface-success text-success border-stroke-success',
				warning: 'bg-surface-warning text-warning border-stroke-warning',
				info: 'bg-surface-info text-info border-stroke-info',
				brand:
					'font-(--button-brand-font-weight) text-shadow-(--button-brand-text-shadow) bg-[var(--button-brand-bg,var(--bg-surface-brand))] text-[var(--button-brand-text,var(--text-brand))] border-[var(--button-brand-border,var(--border-brand))] bg-[image:var(--button-brand-background-image)] shadow-(--button-brand-shadow) hover:shadow-[var(--button-brand-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-brand-hover-background-image)] hover:border-[var(--button-brand-hover-border,var(--hover-ring-color))]',
				'brand-2':
					'font-(--button-brand-font-weight) text-shadow-(--button-brand-text-shadow) bg-[var(--button-brand-2-bg,var(--bg-surface-brand-2))] text-[var(--button-brand-2-text,var(--text-brand-2))] border-[var(--button-brand-2-border,var(--border-brand-2))] bg-[image:var(--button-brand-2-background-image)] shadow-(--button-brand-2-shadow) hover:shadow-[var(--button-brand-2-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-brand-2-hover-background-image)] hover:border-[var(--button-brand-2-hover-border,var(--hover-ring-color))]',
				'brand-3':
					'font-(--button-brand-font-weight) text-shadow-(--button-brand-text-shadow) bg-[var(--button-brand-3-bg,var(--bg-surface-brand-3))] text-[var(--button-brand-3-text,var(--text-brand-3))] border-[var(--button-brand-3-border,var(--border-brand-3))] bg-[image:var(--button-brand-3-background-image)] shadow-(--button-brand-3-shadow) hover:shadow-[var(--button-brand-3-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-brand-3-hover-background-image)] hover:border-[var(--button-brand-3-hover-border,var(--hover-ring-color))]',
				'brand-4':
					'font-(--button-brand-font-weight) text-shadow-(--button-brand-text-shadow) bg-[var(--button-brand-4-bg,var(--bg-surface-brand-4))] text-[var(--button-brand-4-text,var(--text-brand-4))] border-[var(--button-brand-4-border,var(--border-brand-4))] bg-[image:var(--button-brand-4-background-image)] shadow-(--button-brand-4-shadow) hover:shadow-[var(--button-brand-4-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-brand-4-hover-background-image)] hover:border-[var(--button-brand-4-hover-border,var(--hover-ring-color))]',
				'brand-5':
					'font-(--button-brand-font-weight) text-shadow-(--button-brand-text-shadow) bg-[var(--button-brand-5-bg,var(--bg-surface-brand-5))] text-[var(--button-brand-5-text,var(--text-brand-5))] border-[var(--button-brand-5-border,var(--border-brand-5))] bg-[image:var(--button-brand-5-background-image)] shadow-(--button-brand-5-shadow) hover:shadow-[var(--button-brand-5-hover-shadow,var(--hover-shadow))] hover:bg-[image:var(--button-brand-5-hover-background-image)] hover:border-[var(--button-brand-5-hover-border,var(--hover-ring-color))]',
				emphasis: 'bg-surface-emphasis text-emphasis border-stroke-emphasis',
				link: 'text-primary underline-offset-4 hover:underline hover:ring-0',
			},
			size: {
				default:
					"h-(--button-height) gap-(--button-gap) px-3 text-(length:--button-font-size)/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				xs: "h-(--button-height-xs) rounded-(--button-radius-xs) gap-1 px-2.5 text-(length:--button-font-size-xs) has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-2.5",
				sm: "h-(--button-height-sm) rounded-(--button-radius-sm) gap-1 px-2.5 text-(length:--button-font-size-sm)/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				lg: "h-(--button-height-lg) gap-(--button-gap) px-3.5 text-(length:--button-font-size)/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-(--button-height) [&_svg:not([class*='size-'])]:size-3.5",
				'icon-xs':
					"size-(--button-height-xs) rounded-(--button-radius-xs) [&_svg:not([class*='size-'])]:size-2.5",
				'icon-sm':
					"size-(--button-height-sm) rounded-(--button-radius-sm) [&_svg:not([class*='size-'])]:size-3",
				'icon-lg': "size-(--button-height-lg) [&_svg:not([class*='size-'])]:size-4",
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
