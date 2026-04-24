import type { Dialog as DialogPrimitiveBase } from '@base-ui/react/dialog'
import type * as React from 'react'

import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	Dialog as DialogPrimitive,
	DialogTitle,
	DialogTrigger,
} from '../_internal/dialog'

/**
 * Props for the opinionated Dialog component.
 *
 * Provides a high-level API for common modal patterns. When `trigger`, `title`,
 * `description`, or `footer` are provided, the component assembles the full dialog
 * structure automatically. Pass only `children` for full manual control.
 *
 * @example
 * ```tsx
 * // Opinionated API
 * <Dialog
 *   trigger={<Button>Open</Button>}
 *   title="Confirm deletion"
 *   description="This action cannot be undone."
 *   footer={<Button variant="destructive">Delete</Button>}
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </Dialog>
 *
 * // Controlled
 * <Dialog open={open} onOpenChange={setOpen} title="Settings">
 *   <FormInput label="Name" />
 * </Dialog>
 * ```
 */
export interface DialogProps extends Omit<DialogPrimitiveBase.Root.Props, 'children'> {
	/** Element that opens the dialog when clicked (rendered as a `DialogTrigger`). */
	trigger?: React.ReactNode
	/** Dialog heading rendered in the header. */
	title?: React.ReactNode
	/** Subtitle text rendered below the title. */
	description?: React.ReactNode
	/** Dialog body content. */
	children?: React.ReactNode
	/** Content rendered in the dialog footer. */
	footer?: React.ReactNode
	/** Whether to show the built-in close (×) button. @default true */
	showCloseButton?: boolean
	className?: string
}

function Dialog({
	trigger,
	title,
	description,
	children,
	footer,
	showCloseButton = true,
	className,
	open,
	onOpenChange,
	...dialogProps
}: DialogProps) {
	// If opinionated props are provided, use opinionated API
	if (
		trigger !== undefined ||
		title !== undefined ||
		description !== undefined ||
		footer !== undefined
	) {
		return (
			<DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
				{trigger && <DialogTrigger>{trigger}</DialogTrigger>}
				<DialogContent className={className} showCloseButton={showCloseButton}>
					{(title || description) && (
						<DialogHeader>
							{title && <DialogTitle>{title}</DialogTitle>}
							{description && <DialogDescription>{description}</DialogDescription>}
						</DialogHeader>
					)}
					{children}
					{footer && <DialogFooter>{footer}</DialogFooter>}
				</DialogContent>
			</DialogPrimitive>
		)
	}

	// Fallback to children-based API for advanced use cases
	if (children) {
		return (
			<DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
				{children}
			</DialogPrimitive>
		)
	}

	// If neither opinionated props nor children provided, return empty dialog
	return (
		<DialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
			{null}
		</DialogPrimitive>
	)
}

// Re-export all dialog sub-components for convenience
export {
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

export { Dialog }
