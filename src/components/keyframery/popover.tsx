'use client'

export * from './primitives/popover'

/* Theming (inherited; each default preserves the original light/dark appearance):
   --popover-surface: Sheet and arrow (default: --popover)
   --popover-ink: Sheet text (default: --popover-foreground)
   --popover-muted: Description and shortcut text (default: --muted-foreground)
   --popover-width: Sheet width (default: 18rem)
   --popover-radius: Sheet corners (default: --radius-2xl)
   --popover-padding: Sheet padding (default: 1rem)
*/

/* Styled popover: the animated primitive plus the Keyframery look. */

import {
	Popover as PopoverRoot,
	PopoverArrow as PopoverArrowPart,
	PopoverClose as PopoverClosePart,
	PopoverContent as PopoverContentPart,
	PopoverDescription as PopoverDescriptionPart,
	PopoverShortcut as PopoverShortcutPart,
	PopoverTitle as PopoverTitlePart,
	PopoverTrigger as PopoverTriggerPart,
} from './primitives/popover'
import * as React from 'react'

import { Speed, type SpeedProps, useSpeedStyle } from './motion'
import { cn } from '../../lib/utils'
import { buttonClassName } from './button'

/* UI SDK accepts a class name or a function of state; keep both working. */
function withClass<S>(
	base: string,
	className: string | ((state: S) => string | undefined) | undefined,
) {
	return typeof className === 'function'
		? (state: S) => cn(base, className(state))
		: cn(base, className)
}

/* The sheet. The primitive unfolds it out of its trigger and cascades its rows in. */
const sheet = cn(
	'm-0 max-h-(--available-height) w-[var(--popover-width,18rem)] max-w-[calc(100vw-16px)] overflow-visible border-0 p-[var(--popover-padding,1rem)] outline-none',
	'rounded-[var(--popover-radius,var(--overlay-radius,var(--radius-2xl)))] bg-[var(--popover-surface,var(--overlay-face,var(--popover)))] text-[color:var(--popover-ink,var(--overlay-ink,var(--popover-foreground)))]',
	'shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_6px_-2px_rgb(0_0_0/0.08),0_12px_32px_-8px_rgb(0_0_0/0.18)]',
	'dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_12px_32px_-8px_rgb(0_0_0/0.7)]',
)

function Popover({ speed, ...props }: React.ComponentProps<typeof PopoverRoot> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<PopoverRoot {...props} />
		</Speed>
	)
}

/* A key by default; it stays lit while its popover is open. Pass `render` for your own button.
   An svg marked `data-slot="popover-chevron"` inside it turns while open. */
function PopoverTrigger({ className, ...props }: React.ComponentProps<typeof PopoverTriggerPart>) {
	return (
		<PopoverTriggerPart
			className={buttonClassName(className, {
				render: Boolean(props.render),
				extra: cn(
					'group/popover-trigger [&_[data-slot=popover-chevron]]:text-[color:var(--popover-muted,var(--muted-foreground))] [&_[data-slot=popover-chevron]]:transition-transform [&_[data-slot=popover-chevron]]:duration-[calc(380ms*var(--kf-speed,1))] [&_[data-slot=popover-chevron]]:ease-spring',
					'data-open:[&_[data-slot=popover-chevron]]:rotate-180 motion-reduce:[&_[data-slot=popover-chevron]]:transition-none',
				),
			})}
			{...props}
		/>
	)
}

function PopoverContent<Payload = unknown>({
	className,
	sideOffset = 8,
	style,
	...props
}: React.ComponentProps<typeof PopoverContentPart<Payload>>) {
	return (
		<PopoverContentPart<Payload>
			sideOffset={sideOffset}
			className={withClass(sheet, className)}
			{...props}
			style={useSpeedStyle(style)}
		/>
	)
}

/* A small point toward the trigger, drawn with the sheet's own fill and hairline. */
function PopoverArrow({ className, ...props }: React.ComponentProps<typeof PopoverArrowPart>) {
	return (
		<PopoverArrowPart
			className={withClass(
				cn(
					'pointer-events-none h-[7px] w-3.5 text-[color:var(--popover-surface,var(--overlay-face,var(--popover)))]',
					'data-[side=bottom]:bottom-full data-[side=top]:top-full',
					'data-[side=left]:left-full data-[side=left]:h-3.5 data-[side=left]:w-[7px] data-[side=right]:right-full data-[side=right]:h-3.5 data-[side=right]:w-[7px]',
					'[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:h-[7px] [&>svg]:w-3.5 [&>svg]:-translate-1/2',
					'data-[side=top]:[&>svg]:rotate-180 data-[side=left]:[&>svg]:rotate-90 data-[side=right]:[&>svg]:-rotate-90',
				),
				className,
			)}
			{...props}
		>
			<svg viewBox="0 0 14 7" aria-hidden className="overflow-visible">
				<path
					d="M0 7.5 L5.6 1.2 Q7 -0.3 8.4 1.2 L14 7.5"
					fill="currentColor"
					className="stroke-black/[0.06] dark:stroke-white/[0.08]"
					strokeWidth="1"
				/>
			</svg>
		</PopoverArrowPart>
	)
}

function PopoverTitle({ className, ...props }: React.ComponentProps<typeof PopoverTitlePart>) {
	return (
		<PopoverTitlePart
			className={withClass(
				'text-[length:var(--title-font-size)] leading-[var(--title-line-height)] font-heading font-semibold tracking-tight',
				className,
			)}
			{...props}
		/>
	)
}

function PopoverDescription({
	className,
	...props
}: React.ComponentProps<typeof PopoverDescriptionPart>) {
	return (
		<PopoverDescriptionPart
			className={withClass(
				'text-xs leading-[var(--body-line-height)] text-[color:var(--popover-muted,var(--muted-foreground))]',
				className,
			)}
			{...props}
		/>
	)
}

/* A key. Pass `render` for a button of your own. */
function PopoverClose({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof PopoverClosePart> & { variant?: 'default' | 'primary' }) {
	return (
		<PopoverClosePart
			data-variant={variant}
			className={buttonClassName(className, { variant, render: Boolean(props.render) })}
			{...props}
		/>
	)
}

function PopoverShortcut({
	className,
	...props
}: React.ComponentProps<typeof PopoverShortcutPart>) {
	return (
		<PopoverShortcutPart
			className={withClass(
				'ms-1 text-xs leading-[var(--text-2xs--line-height)] tracking-[0.04em] text-[color:var(--popover-muted,var(--muted-foreground))] tabular-nums',
				className,
			)}
			{...props}
		/>
	)
}

export {
	Popover,
	PopoverArrow,
	PopoverClose,
	PopoverContent,
	PopoverDescription,
	PopoverShortcut,
	PopoverTitle,
	PopoverTrigger,
}

/* UI SDK's helpers for this component, passed through. */
export { createPopoverController } from './primitives/popover'
