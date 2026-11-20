'use client'

export * from './primitives/dialog'

/* Theming: set on a part or its ancestor; unset variables preserve the original theme.
   --dialog-face: Dialog sheet (default: --popover).
   --dialog-ink: Dialog body text (default: --popover-foreground).
   --dialog-radius: Sheet corners (default: --radius-3xl).
   --dialog-width: Sheet width limit (default: 440px).
   --dialog-padding: Sheet padding (default: 1.25rem).
   --dialog-gap: Footer key spacing (default: 0.5rem).
 */

/* Styled dialog: the animated primitive plus the Keyframery look. */

import {
	Dialog as DialogRoot,
	DialogBackdrop as DialogBackdropPart,
	DialogClose as DialogClosePart,
	DialogContent as DialogContentPart,
	DialogDescription as DialogDescriptionPart,
	DialogShortcut as DialogShortcutPart,
	DialogTitle as DialogTitlePart,
	DialogTrigger as DialogTriggerPart,
} from './primitives/dialog'
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

type DialogCloseVariant = 'default' | 'primary' | 'destructive' | 'icon'

function XIcon() {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
		</svg>
	)
}

function Dialog({ speed, ...props }: React.ComponentProps<typeof DialogRoot> & SpeedProps) {
	return (
		<Speed speed={speed}>
			<DialogRoot {...props} />
		</Speed>
	)
}

/* A key by default. Pass `render` to use a button of your own instead. */
function DialogTrigger({ className, ...props }: React.ComponentProps<typeof DialogTriggerPart>) {
	return (
		<DialogTriggerPart
			className={buttonClassName(className, { render: Boolean(props.render) })}
			{...props}
		/>
	)
}

/* The page dims behind the dialog. The primitive blurs it in and out. */
function DialogBackdrop({
	className,
	style,
	...props
}: React.ComponentProps<typeof DialogBackdropPart>) {
	return (
		<DialogBackdropPart
			className={withClass('fixed inset-0 bg-black/25 dark:bg-black/55', className)}
			{...props}
			style={useSpeedStyle(style)}
		/>
	)
}

/* The sheet. The primitive unfolds it from below and cascades its sections in. */
function DialogContent({
	className,
	style,
	...props
}: React.ComponentProps<typeof DialogContentPart>) {
	return (
		<DialogContentPart
			className={withClass(
				cn(
					'fixed inset-0 m-auto h-fit max-h-[calc(100dvh-32px)] w-[min(var(--dialog-width,440px),calc(100vw-32px))] max-w-none overflow-y-auto overscroll-contain',
					'border-0 p-[var(--dialog-padding,1.25rem)] outline-none backdrop:bg-transparent',
					'rounded-[var(--overlay-radius,var(--dialog-radius,var(--radius-3xl)))] bg-[var(--dialog-face,var(--overlay-face,var(--popover)))] text-[color:var(--dialog-ink,var(--overlay-ink,var(--popover-foreground)))]',
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

/* Title and description stacked, with room for the corner close key. */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn('flex flex-col gap-1 pr-9', className)}
			{...props}
		/>
	)
}

/* The answers, right-aligned at the foot of the sheet. */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn('mt-5 flex items-center justify-end gap-[var(--dialog-gap,0.5rem)]', className)}
			{...props}
		/>
	)
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogTitlePart>) {
	return (
		<DialogTitlePart
			className={withClass(
				'text-[length:var(--heading-font-size)] leading-[var(--heading-line-height)] font-heading font-semibold tracking-tight',
				className,
			)}
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogDescriptionPart>) {
	return (
		<DialogDescriptionPart
			className={withClass(
				'text-[length:var(--body-font-size)] leading-[var(--body-line-height)] text-muted-foreground',
				className,
			)}
			{...props}
		/>
	)
}

/* A key. `variant="icon"` is the small corner key with an X, and needs no children. */
function DialogClose({
	className,
	variant = 'default',
	children,
	...props
}: React.ComponentProps<typeof DialogClosePart> & { variant?: DialogCloseVariant }) {
	return (
		<DialogClosePart
			data-variant={variant}
			aria-label={variant === 'icon' && !children ? 'Close' : undefined}
			className={buttonClassName(className, {
				variant: variant === 'icon' ? 'ghost' : variant,
				size: variant === 'icon' ? 'icon-sm' : 'md',
				render: Boolean(props.render),
				extra: variant === 'icon' ? 'absolute top-3.5 right-3.5' : undefined,
			})}
			{...props}
		>
			{variant === 'icon' && !children ? <XIcon /> : children}
		</DialogClosePart>
	)
}

function DialogShortcut({ className, ...props }: React.ComponentProps<typeof DialogShortcutPart>) {
	return (
		<DialogShortcutPart
			className={withClass(
				'ms-1 text-xs leading-[var(--text-2xs--line-height)] tracking-[0.04em] text-muted-foreground tabular-nums',
				className,
			)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogBackdrop,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogShortcut,
	DialogTitle,
	DialogTrigger,
}

/* UI SDK's helpers for this component, passed through. */
export { createDialogController } from './primitives/dialog'
