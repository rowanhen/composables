// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Badge } from '@/components/_internal/badge'
import { HStack, VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function BadgesShowcase() {
	return (
		<ShowcaseSection title="Badges" description="Badge variants for status labels and tags.">
			<VStack gap={4}>
				<ShowcaseGroup label="Variants">
					<HStack gap={3} wrap align="center">
						<Badge variant="default">Default</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
						<Badge variant="destructive">Destructive</Badge>
						<Badge variant="ghost">Ghost</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="info">Info</Badge>
						<Badge variant="brand">Brand</Badge>
						<Badge variant="emphasis">Emphasis</Badge>
						<Badge variant="link">Link</Badge>
					</HStack>
				</ShowcaseGroup>
				<ShowcaseGroup label="Status usage">
					<HStack gap={3} wrap align="center">
						<Badge variant="success">Active</Badge>
						<Badge variant="warning">Pending</Badge>
						<Badge variant="destructive">Failed</Badge>
						<Badge variant="info">In Review</Badge>
						<Badge variant="outline">Draft</Badge>
						<Badge variant="secondary">Archived</Badge>
					</HStack>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
