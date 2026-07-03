import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
} from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui-opinionated/toggle-group'
import { HStack, VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function ToggleGroupShowcase() {
	return (
		<ShowcaseSection
			title="Toggle Group"
			description="Grouped toggle buttons for single or multiple selection."
		>
			<VStack gap={4}>
				<ShowcaseGroup label="Single value">
					<ToggleGroup
						defaultValue="left"
						variant="outline"
						options={[
							{ value: 'left', label: 'Left', icon: <AlignLeftIcon /> },
							{ value: 'center', label: 'Center', icon: <AlignCenterIcon /> },
							{ value: 'right', label: 'Right', icon: <AlignRightIcon /> },
						]}
					/>
				</ShowcaseGroup>
				<ShowcaseGroup label="Multiple values">
					<ToggleGroup defaultValue={['bold']} multiple variant="outline">
						<ToggleGroupItem value="bold" aria-label="Bold">
							<BoldIcon />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Italic">
							<ItalicIcon />
						</ToggleGroupItem>
						<ToggleGroupItem value="underline" aria-label="Underline">
							<UnderlineIcon />
						</ToggleGroupItem>
					</ToggleGroup>
				</ShowcaseGroup>
				<ShowcaseGroup label="Spacing">
					<HStack gap={4} wrap>
						<ToggleGroup defaultValue="left" variant="outline" spacing="sm">
							<ToggleGroupItem value="left">Left</ToggleGroupItem>
							<ToggleGroupItem value="center">Center</ToggleGroupItem>
							<ToggleGroupItem value="right">Right</ToggleGroupItem>
						</ToggleGroup>
						<ToggleGroup defaultValue="top" orientation="vertical" variant="outline">
							<ToggleGroupItem value="top">Top</ToggleGroupItem>
							<ToggleGroupItem value="middle">Middle</ToggleGroupItem>
							<ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
						</ToggleGroup>
					</HStack>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
