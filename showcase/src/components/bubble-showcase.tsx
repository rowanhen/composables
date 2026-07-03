import {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReactions,
} from '@/components/ui-opinionated/bubble'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function BubbleShowcase() {
	return (
		<ShowcaseSection title="Bubble" description="Message bubble primitives with semantic variants.">
			<VStack gap={4} className="max-w-2xl">
				<ShowcaseGroup label="Variants">
					<BubbleGroup>
						<Bubble variant="default">
							<BubbleContent>Primary bubble for high-emphasis messages.</BubbleContent>
						</Bubble>
						<Bubble variant="secondary">
							<BubbleContent>Secondary bubble for quieter responses.</BubbleContent>
						</Bubble>
						<Bubble variant="muted">
							<BubbleContent>Muted bubble for notes and system text.</BubbleContent>
						</Bubble>
						<Bubble variant="outline">
							<BubbleContent>Outlined bubble when the background should stay flat.</BubbleContent>
						</Bubble>
						<Bubble variant="critical">
							<BubbleContent>Critical bubble for error states.</BubbleContent>
						</Bubble>
					</BubbleGroup>
				</ShowcaseGroup>
				<ShowcaseGroup label="Alignment and reactions">
					<BubbleGroup>
						<Bubble align="end" variant="default">
							<BubbleContent>Aligned to the end.</BubbleContent>
							<BubbleReactions>+3</BubbleReactions>
						</Bubble>
						<Bubble variant="ghost">
							<BubbleContent>Ghost bubble keeps only the content rhythm.</BubbleContent>
						</Bubble>
					</BubbleGroup>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
