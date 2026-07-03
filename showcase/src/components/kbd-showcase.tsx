import { CommandIcon, CornerDownLeftIcon } from 'lucide-react'
import { Kbd, KbdGroup } from '@/components/ui-opinionated/kbd'
import { HStack, VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function KbdShowcase() {
	return (
		<ShowcaseSection title="Kbd" description="Keyboard shortcut display.">
			<VStack gap={4}>
				<ShowcaseGroup label="Single keys">
					<HStack gap={2} wrap>
						<Kbd>Esc</Kbd>
						<Kbd>Tab</Kbd>
						<Kbd>⌘</Kbd>
						<Kbd>/</Kbd>
					</HStack>
				</ShowcaseGroup>
				<ShowcaseGroup label="Groups">
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
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
