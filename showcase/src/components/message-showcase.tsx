import { UserIcon } from 'lucide-react'
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
								<div className="rounded-xl border border-stroke bg-muted px-3 py-2">
									Can we make this workflow feel a bit less manual?
								</div>
								<MessageFooter>Edited</MessageFooter>
							</MessageContent>
						</Message>
						<Message align="end">
							<MessageContent>
								<MessageHeader>Composables</MessageHeader>
								<div className="rounded-xl border border-stroke bg-surface-brand px-3 py-2 text-brand">
									Yes. A grouped primitive plus a tighter preset path should get us there.
								</div>
								<MessageFooter>Delivered</MessageFooter>
							</MessageContent>
						</Message>
					</MessageGroup>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
