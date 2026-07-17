import { UserIcon } from 'lucide-react'
import { Bubble, BubbleContent } from '@/components/ui-opinionated/bubble'
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from '@/components/ui-opinionated/message'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function MessageShowcase() {
	return (
		<ShowcaseSection title="Message" description="Composable message rows for chat-like UIs.">
			<VStack gap={4} className="max-w-2xl">
				<ShowcaseGroup label="Conversation">
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
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
