'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	AlertDialog as Root,
	AlertDialogBackdrop,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../components/keyframery/alert-dialog'

export type AlertDialogProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	trigger?: string | ReactElement
	title: string
	description?: string
	children?: ReactNode
	cancelText?: string
	actionText?: string
	onAction?: ComponentProps<typeof AlertDialogClose>['action']
	onCancel?: ComponentProps<typeof AlertDialogClose>['action']
	media?: ReactNode
	className?: string
}

export function AlertDialog({
	trigger,
	title,
	description,
	children,
	cancelText = 'Cancel',
	actionText = 'Continue',
	onAction,
	onCancel,
	media,
	className,
	...props
}: AlertDialogProps) {
	return (
		<Root {...props}>
			{typeof trigger === 'string' ? (
				<AlertDialogTrigger>{trigger}</AlertDialogTrigger>
			) : (
				trigger && <AlertDialogTrigger render={trigger} />
			)}
			<AlertDialogBackdrop />
			<AlertDialogContent className={className}>
				{media && <AlertDialogMedia>{media}</AlertDialogMedia>}
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description && <AlertDialogDescription>{description}</AlertDialogDescription>}
				</AlertDialogHeader>
				{children}
				<AlertDialogFooter>
					<AlertDialogClose value="cancel" action={onCancel}>
						{cancelText}
					</AlertDialogClose>
					<AlertDialogClose value="confirm" action={onAction} variant="destructive">
						{actionText}
					</AlertDialogClose>
				</AlertDialogFooter>
			</AlertDialogContent>
		</Root>
	)
}

export {
	AlertDialogBackdrop,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
}
