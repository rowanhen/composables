'use client'

import * as React from 'react'
import { SearchIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import {
	Command,
	CommandInput as CommandInputPart,
	CommandSearch,
} from '../../components/keyframery/command'
import {
	Dialog,
	DialogBackdrop,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../../components/keyframery/dialog'

function CommandInput(props: React.ComponentProps<typeof CommandInputPart>) {
	return (
		<CommandSearch>
			<SearchIcon aria-hidden />
			<CommandInputPart {...props} />
		</CommandSearch>
	)
}

function CommandDialog({
	title = 'Command Palette',
	description = 'Search for a command to run...',
	children,
	className,
	showCloseButton = true,
	onAction,
	...props
}: React.ComponentProps<typeof Dialog> & {
	title?: string
	description?: string
	className?: string
	showCloseButton?: boolean
	onAction?: React.ComponentProps<typeof Command>['onAction']
}) {
	return (
		<Dialog {...props}>
			<DialogBackdrop />
			<DialogContent className={cn('overflow-hidden p-0', className)}>
				<DialogHeader className="sr-only">
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<Command
					onAction={onAction}
					className={cn(
						'w-full',
						showCloseButton &&
							'[&_[data-slot=command-search]]:pe-[calc(2*var(--command-search-inset,1rem)+var(--button-height,1.75rem))]',
					)}
				>
					{children}
				</Command>
				{showCloseButton && (
					<DialogClose
						variant="icon"
						className="top-[calc(var(--command-search-height,3rem)/2)] right-auto -translate-y-1/2"
						style={{ insetInlineEnd: 'var(--command-search-inset, 1rem)' }}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}

export { CommandDialog, CommandInput }

export {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandGroupLabel,
	CommandItem,
	CommandItemIcon,
	CommandItemText,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '../../components/keyframery/command'
