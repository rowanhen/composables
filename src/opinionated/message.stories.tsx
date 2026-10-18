import { UserIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Bubble, BubbleContent } from './bubble'
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from './message'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/Message',
	parameters: {
		docs: {
			description: { component: 'Generic conversational message layout primitives.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = {
	render: () => (
		<Gallery>
			<Group label="Conversation">
				<MessageGroup>
					<Message>
						<MessageAvatar>
							<UserIcon className="size-4" />
						</MessageAvatar>
						<MessageContent>
							<MessageHeader>Rowan · 10:24</MessageHeader>
							<Bubble variant="muted">
								<BubbleContent>Can we make this workflow feel a bit less manual?</BubbleContent>
							</Bubble>
							<MessageFooter>Edited</MessageFooter>
						</MessageContent>
					</Message>
					<Message align="end">
						<MessageContent>
							<MessageHeader>Composables</MessageHeader>
							<Bubble align="end">
								<BubbleContent>
									Yes. A grouped primitive plus a tighter preset path should get us there.
								</BubbleContent>
							</Bubble>
							<MessageFooter>Delivered</MessageFooter>
						</MessageContent>
					</Message>
				</MessageGroup>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4} className="max-w-2xl"></VStack>
		</Gallery>
	),
}
