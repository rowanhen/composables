import { CommandIcon, CornerDownLeftIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Kbd, KbdGroup } from './kbd'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Actions/Kbd',
	component: Kbd,
	args: { children: 'Esc' },
	parameters: {
		docs: {
			description: { component: 'Keyboard shortcut and command-key display.' },
		},
	},
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const SingleKeys: Story = {
	name: 'Single keys',
	render: () => (
		<Gallery>
			<Group label="Single keys">
				<HStack gap={2} wrap>
					<Kbd>Esc</Kbd>
					<Kbd>Tab</Kbd>
					<Kbd>⌘</Kbd>
					<Kbd>/</Kbd>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Groups: Story = {
	render: () => (
		<Gallery>
			<Group label="Groups">
				<HStack gap={3} wrap>
					<KbdGroup>
						<Kbd>
							<CommandIcon />
						</Kbd>
						<Kbd>K</Kbd>
					</KbdGroup>
					<KbdGroup>
						<Kbd>Shift</Kbd>
						<Kbd>
							<CornerDownLeftIcon />
						</Kbd>
					</KbdGroup>
				</HStack>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}></VStack>
		</Gallery>
	),
}
