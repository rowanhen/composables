import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE, HOVER_RING } from '../lib/utils'

const BADGE_LINK_HOVER =
	'[a]:hover:ring-[length:var(--hover-ring-width)] [a]:hover:ring-[color:var(--hover-ring-color)]/30'

const badgeVariants = cva(
	`${FOCUS_RING} h-5 gap-1 rounded-full border border-transparent px-2 py-0.5 text-2xs font-medium transition-[opacity,box-shadow] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-2.5! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none overflow-hidden group/badge`,
	{
		variants: {
			variant: {
				default: `bg-primary text-primary-foreground ${BADGE_LINK_HOVER}`,
				secondary: `bg-secondary text-secondary-foreground ${BADGE_LINK_HOVER}`,
				destructive: `bg-surface-critical ${BADGE_LINK_HOVER} ${FOCUS_RING_DESTRUCTIVE} text-danger border-stroke-critical`,
				outline: `border-stroke text-foreground ${BADGE_LINK_HOVER} bg-field/20 dark:bg-field/30`,
				ghost: `${HOVER_RING} hover:text-muted-foreground`,
				success: 'bg-surface-success text-success border-stroke-success',
				warning: 'bg-surface-warning text-warning border-stroke-warning',
				info: 'bg-surface-info text-info border-stroke-info',
				brand: 'bg-surface-brand text-brand border-stroke-brand',
				'brand-2': 'bg-surface-brand-2 text-brand-2 border-stroke-brand-2',
				'brand-3': 'bg-surface-brand-3 text-brand-3 border-stroke-brand-3',
				'brand-4': 'bg-surface-brand-4 text-brand-4 border-stroke-brand-4',
				'brand-5': 'bg-surface-brand-5 text-brand-5 border-stroke-brand-5',
				emphasis: 'bg-surface-emphasis text-emphasis border-stroke-emphasis',
				link: 'text-primary underline-offset-4 hover:underline',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Badge({
	className,
	variant = 'default',
	render,
	...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeVariants({ className, variant })),
			},
			props,
		),
		render,
		state: {
			slot: 'badge',
			variant,
		},
	})
}

export { Badge, badgeVariants }
