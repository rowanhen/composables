'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
	Drawer as Root,
	DrawerBackdrop,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../components/keyframery/drawer'

export type SheetProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	trigger?: string | ReactElement
	title: string
	description?: string
	children?: ReactNode
	footer?: ReactNode
	showCloseButton?: boolean
	className?: string
}

export function Sheet({
	trigger,
	title,
	description,
	children,
	footer,
	showCloseButton = true,
	className,
	side = 'right',
	...props
}: SheetProps) {
	return (
		<Root side={side} {...props}>
			{typeof trigger === 'string' ? (
				<DrawerTrigger>{trigger}</DrawerTrigger>
			) : (
				trigger && <DrawerTrigger render={trigger} />
			)}
			<DrawerBackdrop />
			<DrawerContent className={className}>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
				</DrawerHeader>
				{children && <div className="min-h-0 overflow-auto px-5 py-3">{children}</div>}
				{(footer || showCloseButton) && (
					<DrawerFooter>
						{footer}
						{showCloseButton && <DrawerClose>Close</DrawerClose>}
					</DrawerFooter>
				)}
			</DrawerContent>
		</Root>
	)
}

export {
	DrawerClose as SheetClose,
	DrawerContent as SheetContent,
	DrawerDescription as SheetDescription,
	DrawerFooter as SheetFooter,
	DrawerHeader as SheetHeader,
	DrawerTitle as SheetTitle,
	DrawerTrigger as SheetTrigger,
}
