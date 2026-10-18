import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import type * as React from 'react'
import { Button } from './button'
import { cn } from '../lib/utils'

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={cn(
				'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-overlay duration-fast supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-overlay',
				className,
			)}
			{...props}
		/>
	)
}

const dialogContentVariants = cva(
	'bg-page data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] max-h-[calc(100dvh-var(--spacing)*8)] overflow-y-auto gap-4 rounded-(--dialog-radius) p-4 text-(length:--body-font-size) leading-relaxed ring-(length:--dialog-border-width) duration-fast sm:w-auto sm:max-w-(--dialog-max-width) fixed top-1/2 left-1/2 z-modal w-full -translate-x-1/2 -translate-y-1/2 outline-none',
	{
		variants: {
			placement: {
				center: '',
				// Docks to the bottom of the viewport below `sm`, like a drawer.
				responsive:
					'max-sm:top-auto max-sm:bottom-0 max-sm:max-w-full max-sm:max-h-[90dvh] max-sm:translate-y-0 max-sm:rounded-b-none max-sm:data-open:slide-in-from-bottom max-sm:data-closed:slide-out-to-bottom max-sm:data-open:zoom-in-100 max-sm:data-closed:zoom-out-100',
			},
		},
		defaultVariants: { placement: 'center' },
	},
)

function DialogContent({
	className,
	children,
	showCloseButton = true,
	placement,
	...props
}: DialogPrimitive.Popup.Props &
	VariantProps<typeof dialogContentVariants> & {
		showCloseButton?: boolean
	}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				data-placement={placement ?? 'center'}
				className={cn(dialogContentVariants({ placement }), className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={<Button variant="ghost" className="absolute top-2 right-2" size="icon-sm" />}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	)
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div data-slot="dialog-header" className={cn('gap-1 flex flex-col', className)} {...props} />
	)
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<'div'> & {
	showCloseButton?: boolean
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn('gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>
			)}
		</div>
	)
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				'text-(length:--heading-font-size) leading-(--heading-line-height) font-medium',
				className,
			)}
			{...props}
		/>
	)
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				'text-muted-foreground *:[a]:hover:text-foreground text-(length:--body-font-size) leading-relaxed *:[a]:underline *:[a]:underline-offset-3',
				className,
			)}
			{...props}
		/>
	)
}

export {
	dialogContentVariants,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
