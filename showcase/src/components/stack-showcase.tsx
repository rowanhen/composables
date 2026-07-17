// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Badge } from '@/components/_internal/badge'
import { Button } from '@/components/_internal/button'
import { Card } from '@/components/_internal/card'
import { Grid, GridItem } from '@/components/_internal/grid'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { DemoBox, ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function StackShowcase() {
	return (
		<ShowcaseSection
			title="Stack & HStack"
			description="Flex-based layout primitives for vertical and horizontal spacing."
		>
			<Grid columns={12} gap={6}>
				<GridItem colSpan={6}>
					<ShowcaseGroup label="VStack (vertical)">
						<Card className="p-4">
							<VStack gap={3}>
								<DemoBox>Item 1</DemoBox>
								<DemoBox>Item 2</DemoBox>
								<DemoBox>Item 3</DemoBox>
							</VStack>
						</Card>
					</ShowcaseGroup>
				</GridItem>
				<GridItem colSpan={6}>
					<ShowcaseGroup label="HStack (horizontal)">
						<Card className="p-4">
							<HStack gap={3}>
								<DemoBox className="flex-1">1</DemoBox>
								<DemoBox className="flex-1">2</DemoBox>
								<DemoBox className="flex-1">3</DemoBox>
							</HStack>
						</Card>
					</ShowcaseGroup>
				</GridItem>
				<GridItem colSpan={6}>
					<ShowcaseGroup label='justify="between"'>
						<Card className="p-4">
							<HStack justify="between" align="center">
								<Typography variant="body-100">Left</Typography>
								<Button>Action</Button>
							</HStack>
						</Card>
					</ShowcaseGroup>
				</GridItem>
				<GridItem colSpan={6}>
					<ShowcaseGroup label="Wrapping tags">
						<Card className="p-4">
							<HStack gap={2} wrap>
								{Array.from({ length: 8 }, (_, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: static demo list
									<Badge key={i} variant="outline">
										Tag {i + 1}
									</Badge>
								))}
							</HStack>
						</Card>
					</ShowcaseGroup>
				</GridItem>
			</Grid>
		</ShowcaseSection>
	)
}
