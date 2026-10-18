import { useEffect, useState } from 'react'
import { CalendarIcon, FileTextIcon, SettingsIcon, SmileIcon, UserIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '../_internal/command'

const meta = {
	title: 'Overlays/Command',
	parameters: {
		docs: {
			description: { component: 'Command menu and Cmd+K palette for search and quick navigation.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function CommandItems() {
	return (
		<>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<CalendarIcon />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<SmileIcon />
						<span>Search emoji</span>
					</CommandItem>
					<CommandItem>
						<FileTextIcon />
						<span>New document</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>
						<UserIcon />
						<span>Profile</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<SettingsIcon />
						<span>Settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</>
	)
}

function CommandDemo() {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen((value) => !value)
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [])

	return (
		<Gallery
			title="Command"
			description="Fast, composable command menu built on cmdk. Use the inline Command surface, or a CommandDialog for a Cmd+K palette."
		>
			<div className="flex flex-col gap-6">
				<Command className="max-w-md rounded-lg border">
					<CommandItems />
				</Command>

				<div className="flex flex-col gap-2">
					<Button variant="outline" onClick={() => setOpen(true)}>
						Open command palette
					</Button>
					<p className="text-muted-foreground text-xs">
						Or press <kbd>⌘</kbd>
						<kbd>K</kbd>
					</p>
				</div>

				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandItems />
				</CommandDialog>
			</div>
		</Gallery>
	)
}

export const Overview: Story = {
	render: () => <CommandDemo />,
}
