import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type FormEvent } from 'react'
import {
	Attachment,
	AttachmentActions,
	AttachmentContent,
	AttachmentRemove,
	AttachmentTitle,
	Bubble,
	BubbleContent,
	Button,
	Message,
	MessageContent,
	MessageHeader,
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerViewport,
	Textarea,
	Trace,
	TraceLine,
	TraceTitle,
} from '@leitware/composables'

const meta = { title: 'Components/Conversation' } satisfies Meta
export default meta

function Conversation() {
	const [messages, setMessages] = useState<string[]>([])
	const [attachment, setAttachment] = useState(true)

	function send(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const form = event.currentTarget
		const message = String(new FormData(form).get('message') ?? '').trim()
		if (!message) return
		setMessages((previous) => [...previous, message])
		form.reset()
	}

	return (
		<div className="mx-auto flex max-w-xl flex-col gap-4">
			<MessageScroller className="h-80 rounded-xl border border-stroke-default">
				<MessageScrollerViewport aria-label="Conversation">
					<MessageScrollerContent>
						<MessageScrollerItem value="summary">
							<Message>
								<MessageContent>
									<MessageHeader>Workspace assistant</MessageHeader>
									<Trace>
										<TraceLine>
											<TraceTitle>Read workspace activity</TraceTitle>
										</TraceLine>
									</Trace>
									<Bubble variant="muted">
										<BubbleContent>Your workspace summary is ready.</BubbleContent>
									</Bubble>
									{attachment && (
										<Attachment onRemove={() => setAttachment(false)}>
											<AttachmentContent>
												<AttachmentTitle>workspace-summary.txt</AttachmentTitle>
											</AttachmentContent>
											<AttachmentActions>
												<AttachmentRemove aria-label="Remove workspace summary" />
											</AttachmentActions>
										</Attachment>
									)}
								</MessageContent>
							</Message>
						</MessageScrollerItem>
						{messages.map((message, index) => (
							<MessageScrollerItem key={index} value={`message-${index}`}>
								<Message align="end">
									<MessageContent>
										<Bubble align="end">
											<BubbleContent>{message}</BubbleContent>
										</Bubble>
									</MessageContent>
								</Message>
							</MessageScrollerItem>
						))}
					</MessageScrollerContent>
				</MessageScrollerViewport>
				<MessageScrollerButton />
			</MessageScroller>
			<form className="flex items-end gap-2" onSubmit={send}>
				<label className="grid flex-1 gap-1">
					Message
					<Textarea name="message" rows={1} />
				</label>
				<Button type="submit" variant="primary">
					Send
				</Button>
			</form>
		</div>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'Conversation',
	render: () => <Conversation />,
}
