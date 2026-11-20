'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	Dialog as Root,
	DialogBackdrop,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/keyframery/dialog'

export type DialogProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	title: string
	trigger?: string | ReactElement
	description?: string
	children?: ReactNode
	footer?: ReactNode
	showCloseButton?: boolean
}

export function Dialog({
	title,
	trigger,
	description,
	children,
	footer,
	showCloseButton = true,
	...props
}: DialogProps) {
	return (
		<Root {...props}>
			{typeof trigger === 'string' ? (
				<DialogTrigger>{trigger}</DialogTrigger>
			) : (
				trigger && <DialogTrigger render={trigger} />
			)}
			<DialogBackdrop />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
				{footer && <DialogFooter>{footer}</DialogFooter>}
				{showCloseButton && <DialogClose variant="icon" />}
			</DialogContent>
		</Root>
	)
}

export { DialogClose }
