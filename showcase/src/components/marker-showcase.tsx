import { CheckCircleIcon, ClockIcon, InfoIcon } from 'lucide-react'
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui-opinionated/marker'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function MarkerShowcase() {
	return (
		<ShowcaseSection title="Marker" description="Inline metadata rows with icon slots.">
			<VStack gap={4} className="max-w-xl">
				<ShowcaseGroup label="Variants">
					<VStack gap={3}>
						<Marker>
							<MarkerIcon>
								<InfoIcon />
							</MarkerIcon>
							<MarkerContent>Draft saved locally</MarkerContent>
						</Marker>
						<Marker variant="separator">
							<MarkerIcon>
								<ClockIcon />
							</MarkerIcon>
							<MarkerContent>Today</MarkerContent>
						</Marker>
						<Marker variant="border">
							<MarkerIcon>
								<CheckCircleIcon />
							</MarkerIcon>
							<MarkerContent>Ready to publish</MarkerContent>
						</Marker>
					</VStack>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
