'use client'

export * from './primitives/alert-dialog'

/* Theming: set on a part or its ancestor; unset variables preserve the original theme.
   --alert-dialog-face: Sheet surface (default: --popover).
   --alert-dialog-ink: Sheet text (default: --popover-foreground).
   --alert-dialog-action: Primary or destructive action and icon (default: --primary / --destructive; destructive dark mixes with --background at 24%).
   --alert-dialog-radius: Sheet corners (default: --radius-3xl).
   --alert-dialog-width: Sheet maximum width (default: 400px).
   --alert-dialog-gap: Footer button gap (default: 0.5rem).
 */

/* Styled alert dialog: the animated primitive plus the Keyframery look. */

import {
	AlertDialog as AlertDialogRoot,
	AlertDialogBackdrop as AlertDialogBackdropPart,
	AlertDialogClose as AlertDialogClosePart,
	AlertDialogContent as AlertDialogContentPart,
	AlertDialogDescription as AlertDialogDescriptionPart,
	AlertDialogShortcut as AlertDialogShortcutPart,
	AlertDialogTitle as AlertDialogTitlePart,
	AlertDialogTrigger as AlertDialogTriggerPart,
} from './primitives/alert-dialog'
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

type AlertDialogCloseVariant = 'default' | 'primary' | 'destructive'

const swap =
	'transition-[opacity,scale,filter] duration-[calc(200ms*var(--kf-speed,1))] ease-house motion-reduce:transition-none!'

function AlertDialog({
	speed,
	...props
}: React.ComponentProps<typeof AlertDialogRoot> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<AlertDialogRoot {...props} />
		</Speed>
	)
}

/* A key by default, in red for `variant="destructive"`. Pass `render` to use your own button. */
function AlertDialogTrigger({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof AlertDialogTriggerPart> & {
	variant?: 'default' | 'destructive'
}) {
	return (
		<AlertDialogTriggerPart
			data-variant={variant}
			className={buttonClassName(className, { variant, render: Boolean(props.render) })}
			{...props}
		/>
	)
}

function AlertDialogBackdrop({
	className,
	style,
	...props
}: React.ComponentProps<typeof AlertDialogBackdropPart>) {
	return (
		<AlertDialogBackdropPart
			className={withClass('fixed inset-0 bg-black/25 dark:bg-black/55', className)}
			{...props}
			style={useSpeedStyle(style)}
		/>
	)
}

/* The same sheet as the dialog. The primitive unfolds it from below and cascades its sections in. */
function AlertDialogContent({
	className,
	style,
	...props
}: React.ComponentProps<typeof AlertDialogContentPart>) {
	return (
		<AlertDialogContentPart
			className={withClass(
				cn(
					'fixed inset-0 m-auto h-fit max-h-[calc(100dvh-32px)] w-[min(var(--alert-dialog-width,400px),calc(100vw-32px))] max-w-none overflow-y-auto overscroll-contain',
					'border-0 p-5 outline-none backdrop:bg-transparent',
					'rounded-[var(--alert-dialog-radius,var(--overlay-radius,var(--radius-3xl)))] bg-[var(--alert-dialog-face,var(--overlay-face,var(--popover)))] text-[color:var(--alert-dialog-ink,var(--overlay-ink,var(--popover-foreground)))]',
					'shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_6px_-2px_rgb(0_0_0/0.08),0_24px_56px_-12px_rgb(0_0_0/0.28)]',
					'dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_24px_56px_-12px_rgb(0_0_0/0.8)]',
				),
				className,
			)}
			{...props}
			style={useSpeedStyle(style)}
		/>
	)
}

/* A round tile for the icon that says what is at stake. It is the first section to cascade in,
   and it pops: it starts small and overshoots a little as it lands. */
function AlertDialogMedia({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<>
			<style href="kf-pop" precedence="default">
				{'@keyframes kf-pop{from{scale:0.4}}'}
			</style>
			<div
				data-slot="alert-dialog-media"
				aria-hidden
				className={cn(
					'mb-4 grid size-10 place-items-center rounded-full bg-[color-mix(in_oklab,var(--alert-dialog-action,var(--destructive))_10%,transparent)] text-[color:var(--alert-dialog-action,var(--destructive))] dark:bg-[color-mix(in_oklab,var(--alert-dialog-action,var(--destructive))_15%,transparent)] [&_svg]:size-5',
					'animate-[kf-cascade_calc(420ms*var(--kf-speed,1))_var(--ease-spring)_backwards,kf-pop_calc(560ms*var(--kf-speed,1))_var(--ease-pop)_backwards]!',
					'motion-reduce:animate-none!',
					className,
				)}
				{...props}
			/>
		</>
	)
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	)
}

/* The answers: Cancel first, the action last, each half the width. */
function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				'mt-5 grid auto-cols-fr grid-flow-col gap-[var(--alert-dialog-gap,0.5rem)] *:w-full',
				className,
			)}
			{...props}
		/>
	)
}

function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogTitlePart>) {
	return (
		<AlertDialogTitlePart
			className={withClass(
				'text-[length:var(--heading-font-size)] leading-[var(--heading-line-height)] font-heading font-semibold tracking-tight',
				className,
			)}
			{...props}
		/>
	)
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogDescriptionPart>) {
	return (
		<AlertDialogDescriptionPart
			className={withClass(
				'text-[length:var(--body-font-size)] leading-[var(--body-line-height)] text-muted-foreground',
				className,
			)}
			{...props}
		/>
	)
}

/* A key for each answer. While its action runs, the label gives its place to a spinner,
   so the key keeps its width. */
function AlertDialogClose({
	className,
	variant = 'default',
	children,
	...props
}: React.ComponentProps<typeof AlertDialogClosePart> & { variant?: AlertDialogCloseVariant }) {
	return (
		<AlertDialogClosePart
			data-variant={variant}
			className={buttonClassName(className, {
				variant,
				render: Boolean(props.render),
				extra: 'group/key',
			})}
			{...props}
		>
			{props.render || typeof children === 'function' ? (
				children
			) : (
				<span className="inline-grid place-items-center *:[grid-area:1/1]">
					<span
						className={cn(
							'inline-flex items-center gap-1.5',
							swap,
							'group-data-pending/key:scale-95 group-data-pending/key:opacity-0 group-data-pending/key:blur-[2px]',
						)}
					>
						{children}
					</span>
					<span
						aria-hidden
						className={cn(
							'grid scale-50 place-items-center opacity-0 blur-[2px]',
							swap,
							'group-data-pending/key:scale-100 group-data-pending/key:opacity-100 group-data-pending/key:blur-none',
						)}
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							className="size-4 animate-spin [animation-duration:calc(700ms*var(--kf-speed,1))] [animation-play-state:paused] group-data-pending/key:[animation-play-state:running] motion-reduce:[animation-duration:calc(1600ms*var(--kf-speed,1))]"
						>
							<circle cx="8" cy="8" r="5.75" opacity="0.28" />
							<path d="M8 2.25A5.75 5.75 0 0 1 13.75 8" />
						</svg>
					</span>
				</span>
			)}
		</AlertDialogClosePart>
	)
}

function AlertDialogShortcut({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogShortcutPart>) {
	return (
		<AlertDialogShortcutPart
			className={withClass(
				'ms-1 text-xs leading-[var(--text-2xs--line-height)] tracking-[0.04em] text-muted-foreground tabular-nums',
				className,
			)}
			{...props}
		/>
	)
}

export {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogShortcut,
	AlertDialogTitle,
	AlertDialogTrigger,
}

/* UI SDK's helpers for this component, passed through. */
export { confirm, createAlertDialogController, createConfirm } from './primitives/alert-dialog'
