import type { AlertDialog as AlertDialogPrimitiveBase } from '@base-ui/react/alert-dialog'
import type * as React from 'react'

import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialog as AlertDialogPrimitive,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../_internal/alert-dialog'

export interface AlertDialogProps extends Omit<AlertDialogPrimitiveBase.Root.Props, 'children'> {
	/** Element that triggers the dialog */
	trigger?: React.ReactNode
	/** Dialog title */
	title?: React.ReactNode
	/** Dialog description */
	description?: React.ReactNode
	/** Dialog body content */
	children?: React.ReactNode
	/** Text for the cancel button */
	cancelText?: string
	/** Text for the action button */
	actionText?: string
	/** Callback when action button is clicked */
	onAction?: () => void
	/** Callback when cancel button is clicked */
	onCancel?: () => void
	/** Icon or media to display in the header */
	media?: React.ReactNode
	/** Size variant for the dialog */
	size?: 'default' | 'sm'
	/** Additional class names for the content */
	className?: string
}

/**
 * Opinionated AlertDialog component for important confirmations.
 * Follows the same pattern as dialog.tsx for consistency.
 *
 * @example
 * ```tsx
 * <AlertDialog
 *   trigger={<Button variant="destructive">Delete Account</Button>}
 *   title="Are you sure?"
 *   description="This action cannot be undone. Your account will be permanently deleted."
 *   cancelText="Cancel"
 *   actionText="Delete"
 *   onAction={() => deleteAccount()}
 * />
 *
 * // With media/icon
 * <AlertDialog
 *   trigger={<Button>Confirm</Button>}
 *   media={<AlertCircleIcon />}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   actionText="Continue"
 *   cancelText="Go Back"
 * />
 * ```
 */
function AlertDialog({
	trigger,
	title,
	description,
	children,
	cancelText = 'Cancel',
	actionText = 'Continue',
	onAction,
	onCancel,
	media,
	size = 'default',
	className,
	open,
	onOpenChange,
	...dialogProps
}: AlertDialogProps) {
	// If opinionated props are provided, use opinionated API
	if (
		trigger !== undefined ||
		title !== undefined ||
		description !== undefined ||
		media !== undefined
	) {
		return (
			<AlertDialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
				{trigger && <AlertDialogTrigger render={<>{trigger}</>} />}
				<AlertDialogContent size={size} className={className}>
					<AlertDialogHeader>
						{media && <AlertDialogMedia>{media}</AlertDialogMedia>}
						{title && <AlertDialogTitle>{title}</AlertDialogTitle>}
						{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
					</AlertDialogHeader>
					{children}
					<AlertDialogFooter>
						<AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
						<AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogPrimitive>
		)
	}

	// Fallback to children-based API for advanced use cases
	if (children) {
		return (
			<AlertDialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
				{children}
			</AlertDialogPrimitive>
		)
	}

	// If neither opinionated props nor children provided, return empty dialog
	return (
		<AlertDialogPrimitive open={open} onOpenChange={onOpenChange} {...dialogProps}>
			{null}
		</AlertDialogPrimitive>
	)
}

// Re-export all sub-components for advanced usage
export {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
}
export { AlertDialog }
