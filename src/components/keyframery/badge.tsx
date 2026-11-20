'use client'

export * from './primitives/badge'

/* Theming: set on a part or its ancestor; unset variables preserve the original theme.
   --badge-face: Variant surface, including the semantic critical and success surfaces.
   --badge-ink: Variant label, including the semantic critical and success text roles.
   --badge-border: Outline hairline (default: --input).
   --badge-height: Badge height (default: 1.25rem).
   --badge-gap: Icon and label gap (default: 0.375rem).
   --badge-radius: Corners (fallback: full pill).
   --badge-padding: Horizontal padding (default: 0.5rem).
   --badge-font: Label size (default: --text-2xs).
 */

/* Styled badge: the animated primitive plus the Keyframery look. Same variants as shadcn/ui's badge,
   plus `success`. */

import * as React from 'react'

import { Badge as BadgePrimitive } from './primitives/badge'
import { Speed, type SpeedProps } from './motion'
import { cn } from '../../lib/utils'

const variants = {
	default:
		'bg-[var(--badge-face,var(--primary))] text-[color:var(--badge-ink,var(--primary-foreground))] shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18)]',
	secondary:
		'bg-[var(--badge-face,var(--secondary))] text-[color:var(--badge-ink,var(--secondary-foreground))] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]',
	outline:
		'bg-[var(--badge-face,transparent)] text-[color:var(--badge-ink,var(--foreground))] shadow-[inset_0_0_0_1px_var(--badge-border,var(--input))]',
	destructive:
		'bg-[var(--badge-face,var(--bg-surface-critical))] text-[color:var(--badge-ink,var(--text-critical))]',
	success:
		'bg-[var(--badge-face,var(--bg-surface-success))] text-[color:var(--badge-ink,var(--text-success))]',
} as const

type BadgeProps = React.ComponentProps<typeof BadgePrimitive>
type BadgeVariant = keyof typeof variants
type BadgeAppearance = { variant?: BadgeVariant; extra?: string }

// Compound parts can keep their state and motion while taking the same badge appearance.
function badgeClassName(className: string | undefined, appearance?: BadgeAppearance): string
function badgeClassName<State>(
	className: string | ((state: State) => string | undefined) | undefined,
	appearance?: BadgeAppearance,
): string | ((state: State) => string)
function badgeClassName<State>(
	className: string | ((state: State) => string | undefined) | undefined,
	{ variant = 'default', extra }: BadgeAppearance = {},
) {
	const look = cn(
		'inline-flex h-[var(--badge-height,1.25rem)] w-fit shrink-0 items-center justify-center gap-[var(--badge-gap,0.375rem)] rounded-[var(--badge-radius,calc(infinity*1px))] px-[var(--badge-padding,0.5rem)] text-[length:var(--badge-font,var(--text-2xs))] leading-[var(--text-2xs--line-height)] font-medium whitespace-nowrap tabular-nums',
		'[&>svg]:size-3 [&>svg]:shrink-0 [&_[data-slot=roll]]:leading-[var(--body-line-height)] has-data-[slot=roll]:min-w-5',
		variants[variant],
		extra,
	)
	return typeof className === 'function'
		? (state: State) => cn(look, className(state))
		: cn(look, className)
}

function Badge({
	speed,
	className,
	variant = 'default',
	...props
}: BadgeProps & { variant?: BadgeVariant } & SpeedProps) {
	return (
		<Speed speed={speed}>
			<BadgePrimitive
				data-variant={variant}
				className={badgeClassName(className, {
					variant,
					extra:
						'transition-[background-color,color,box-shadow] duration-[calc(200ms*var(--kf-speed,1))] ease-house motion-reduce:transition-none!',
				})}
				{...props}
			/>
		</Speed>
	)
}

export { Badge, badgeClassName }
