import { useEffect, useState } from 'react'
import { CalendarIcon, FileTextIcon, SettingsIcon, SmileIcon, UserIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from './button'
import { KbdCombo } from './kbd'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from './command'

const meta = {
	title: 'Components/Command',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function CommandItems() {
	return (
		<>
			<CommandInput aria-label="Search commands" placeholder="Type a command or search..." />
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandList>
				<CommandGroup>
					<CommandGroupLabel>Suggestions</CommandGroupLabel>
					<CommandItem value="calendar" label="Calendar">
						<CalendarIcon />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem value="emoji" label="Search emoji">
						<SmileIcon />
						<span>Search emoji</span>
					</CommandItem>
					<CommandItem value="document" label="New document">
						<FileTextIcon />
						<span>New document</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup>
					<CommandGroupLabel>Settings</CommandGroupLabel>
					<CommandItem value="profile" label="Profile">
						<UserIcon />
						<span>Profile</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem value="settings" label="Settings">
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
	const [activity, setActivity] = useState('')

	function run(value: string) {
		const feedback = {
			calendar: 'Opened Calendar',
			emoji: 'Opened emoji search',
			document: 'Started a new document',
			profile: 'Opened your profile',
			settings: 'Opened workspace settings',
		}
		setActivity(feedback[value as keyof typeof feedback] ?? '')
	}

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
			description="Search commands inline or press Cmd+K to open the command palette."
		>
			<div className="flex flex-col gap-6">
				<Command className="max-w-md" onAction={run}>
					<CommandItems />
				</Command>

				<div className="flex flex-col gap-2">
					<Button onClick={() => setOpen(true)}>Open command palette</Button>
					<p className="text-muted-foreground text-xs">
						Or press <KbdCombo keys={['mod', 'k']} />
					</p>
					{activity && <output className="text-sm text-content-muted">{activity}</output>}
				</div>

				<CommandDialog
					open={open}
					onOpenChange={setOpen}
					onAction={(value) => {
						run(value)
						setOpen(false)
					}}
				>
					<CommandItems />
				</CommandDialog>
			</div>
		</Gallery>
	)
}

export const Overview: Story = {
	name: 'Command',
	render: () => <CommandDemo />,
}
