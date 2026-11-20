'use client'

export * from './primitives/stat'

/* Styled stats: the animated primitive plus the Keyframery look. A stat is a quiet card: a muted
   label with an optional icon in a small well, one big number, the delta as a tinted pill with an
   arrow, the comparison beside it, and room for a sparkline under them. In a StatGroup the stats
   share one surface, split by hairlines: four across on a wide container, two, then one, by
   container queries.

   The delta's colour means status: green for good news, the destructive colour for bad, muted for
   flat. `downIsGood` turns it round. Its arrow turns to the new direction on a spring.

   Theming: set these CSS variables on a stat, a group or anything around them. Each falls back to
   the theme's own token, so it looks the same until you set one.
     --stat-surface      the card                       (default: --background, --card in dark)
     --stat-divider      the hairlines in a group       (default: --border)
     --stat-label        the label                      (default: --muted-foreground)
     --stat-positive     positive delta and chart ink   (default: --text-success)
     --stat-negative     negative delta and chart ink   (default: --text-critical)
     --stat-value-size   the number's size              (default: --text-3xl)
     --stat-radius       the corners                    (default: --radius-3xl)
     --stat-padding      the inset                      (default: 1.25rem) */

import { ArrowUpRight } from 'lucide-react'
import * as React from 'react'

import { Badge } from './badge'
import {
	Roll,
	Stat as StatPrimitive,
	StatChart as StatChartPrimitive,
	StatComparison as StatComparisonPrimitive,
	StatDelta as StatDeltaPrimitive,
	StatGroup as StatGroupPrimitive,
	StatIcon as StatIconPrimitive,
	StatLabel as StatLabelPrimitive,
	StatValue as StatValuePrimitive,
} from './primitives/stat'
import { Speed, type SpeedProps } from './motion'
import { cn } from '../../lib/utils'

/* UI SDK parts take a class name or a function of the part's state. Keep both working. */
function withClass<S>(
	base: string,
	className: string | ((state: S) => string | undefined) | undefined,
) {
	return typeof className === 'function'
		? (state: S) => cn(base, className(state))
		: cn(base, className)
}

/* A placeholder at the part's own size while loading: the ink goes, a soft block stays. */
const placeholder =
	'data-loading:rounded-md data-loading:text-transparent! data-loading:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]! data-loading:shadow-none! dark:data-loading:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)]!'

const surface = cn(
	'rounded-[var(--stat-radius,var(--radius-3xl))] bg-[var(--stat-surface,var(--background))]',
	'shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-14px_rgb(0_0_0/0.14)]',
	'dark:bg-[var(--stat-surface,var(--card))] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]',
)

/* Tone colours, as variables the delta and the chart both read. */
const tones = cn(
	'[--stat-tone:var(--text-muted)]',
	'data-[tone=positive]:[--stat-tone:var(--stat-positive,var(--text-success))]',
	'data-[tone=negative]:[--stat-tone:var(--stat-negative,var(--text-critical))]',
)

const deltaVariants = {
	positive: 'success',
	negative: 'destructive',
	neutral: 'secondary',
} as const

function Stat({
	speed,
	className,
	...props
}: React.ComponentProps<typeof StatPrimitive> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<StatPrimitive
				className={withClass(
					cn(
						'flex flex-wrap content-start items-start gap-x-3 p-[var(--stat-padding,1.25rem)] text-foreground',
						'[&_[data-slot=stat-icon]>svg]:size-3.5 [&_[data-slot=stat-icon]>svg]:shrink-0 [&_[data-slot=stat-icon]>svg]:stroke-[1.75]',
						surface,
						tones,
					),
					className,
				)}
				{...props}
			/>
		</Speed>
	)
}

function StatLabel({ className, ...props }: React.ComponentProps<typeof StatLabelPrimitive>) {
	return (
		<StatLabelPrimitive
			className={withClass(
				cn(
					'min-w-0 flex-1 truncate py-px text-[length:var(--body-font-size)] leading-[var(--leading-base)] font-medium text-[color:var(--stat-label,var(--muted-foreground))]',
					placeholder,
					'data-loading:flex-none',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* A small well beside the label. Put a lucide icon in it. */
function StatIcon({ className, ...props }: React.ComponentProps<typeof StatIconPrimitive>) {
	return (
		<StatIconPrimitive
			className={withClass(
				cn(
					'ml-auto -mt-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground',
					'shadow-[inset_0_1px_2px_rgb(0_0_0/0.06),inset_0_0_0_1px_rgb(0_0_0/0.03)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(255_255_255/0.04)]',
					'data-loading:text-transparent',
				),
				className,
			)}
			{...props}
		/>
	)
}

function StatValue({ className, ...props }: React.ComponentProps<typeof StatValuePrimitive>) {
	return (
		<StatValuePrimitive
			className={withClass(
				cn(
					'mt-2.5 w-full text-[length:var(--stat-value-size,var(--text-3xl))] leading-[var(--text-2xs--line-height)] font-semibold tracking-tight tabular-nums',
					'data-loading:text-transparent data-loading:[&_[data-roll]]:rounded-md data-loading:[&_[data-roll]]:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)] dark:data-loading:[&_[data-roll]]:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)]',
					'[&_[data-roll]]:transition-[background-color] [&_[data-roll]]:duration-[calc(420ms*var(--kf-speed,1))] [&_[data-roll]]:ease-house',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* Stat owns loading and trend, while Badge owns the appearance of the delta. */
function StatDelta({
	className,
	children,
	...props
}: React.ComponentProps<typeof StatDeltaPrimitive>) {
	return (
		<StatDeltaPrimitive
			className={withClass('group/stat-delta mt-2.5 flex shrink-0', className)}
			{...props}
		>
			{(state) => (
				<Badge
					variant={deltaVariants[state.tone]}
					className={cn(
						'animate-none transition-none text-[color:var(--badge-ink,var(--stat-tone))]',
						'group-data-loading/stat-delta:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]! dark:group-data-loading/stat-delta:bg-[color-mix(in_oklab,var(--foreground)_9%,transparent)]! group-data-loading/stat-delta:text-transparent! group-data-loading/stat-delta:shadow-none!',
						'[&>svg]:transition-[rotate] [&>svg]:duration-[calc(560ms*var(--kf-speed,1))] [&>svg]:ease-spring motion-reduce:[&>svg]:transition-none',
						'group-data-[trend=down]/stat-delta:[&>svg]:rotate-90 group-data-[trend=flat]/stat-delta:[&>svg]:rotate-45',
					)}
				>
					{typeof children === 'function'
						? children(state)
						: (children ?? (
								<>
									<ArrowUpRight aria-hidden />
									<span className="sr-only">{state.words}</span>
									<span aria-hidden>
										<Roll text={state.text} />
									</span>
								</>
							))}
				</Badge>
			)}
		</StatDeltaPrimitive>
	)
}

function StatComparison({
	className,
	...props
}: React.ComponentProps<typeof StatComparisonPrimitive>) {
	return (
		<StatComparisonPrimitive
			className={withClass(
				cn(
					'mt-2.5 min-w-0 flex-1 truncate text-xs leading-[var(--body-line-height)] text-muted-foreground',
					placeholder,
					'data-loading:flex-none',
				),
				className,
			)}
			{...props}
		/>
	)
}

/* Room for a sparkline under the numbers. A Sparkline inside takes the delta's colour. */
function StatChart({ className, ...props }: React.ComponentProps<typeof StatChartPrimitive>) {
	return (
		<StatChartPrimitive
			className={withClass(
				cn(
					'mt-4 w-full',
					'[&_[data-slot=sparkline]]:[--sparkline-tone:var(--sparkline-color,var(--stat-tone))] [&_[data-slot=sparkline]]:[--sparkline-height:var(--stat-chart-height,2.75rem)]',
					'data-[tone=neutral]:[&_[data-slot=sparkline]]:[--sparkline-tone:var(--sparkline-color,var(--chart-1))]',
					'data-loading:[&>*]:opacity-0',
					placeholder,
				),
				className,
			)}
			{...props}
		/>
	)
}

/* One surface; the stats inside drop their own and are split by hairlines, which each stat draws on
   its left and top edge and the grid clips at its own edges, so any column count works. */
function StatGroup({
	className,
	gridClassName,
	...props
}: React.ComponentProps<typeof StatGroupPrimitive>) {
	return (
		<StatGroupPrimitive
			className={withClass(cn('@container/stats w-full', surface), className)}
			gridClassName={cn(
				'overflow-hidden rounded-[inherit] grid-cols-1 @[26rem]/stats:grid-cols-2 @[48rem]/stats:grid-cols-[repeat(var(--stat-group-columns,4),minmax(0,1fr))]',
				'[&>[data-slot=stat]]:rounded-none [&>[data-slot=stat]]:bg-transparent',
				'[&>[data-slot=stat]]:shadow-[-1px_0_0_var(--stat-divider,var(--border)),0_-1px_0_var(--stat-divider,var(--border))]',
				gridClassName,
			)}
			{...props}
		/>
	)
}

export { Stat, StatChart, StatComparison, StatDelta, StatGroup, StatIcon, StatLabel, StatValue }
