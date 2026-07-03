import { NativeSelect } from '@/components/ui-opinionated/native-select'
import { HStack, VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

const accountOptions = [
	{ label: 'Personal workspace', value: 'personal' },
	{ label: 'Client portal', value: 'client' },
	{ label: 'Archived team', value: 'archived', disabled: true },
]

export function NativeSelectShowcase() {
	return (
		<ShowcaseSection title="Native Select" description="Native select styled with field tokens.">
			<VStack gap={4} className="max-w-xl">
				<ShowcaseGroup label="Sizes">
					<HStack gap={4} align="center" wrap>
						<NativeSelect
							defaultValue="personal"
							options={accountOptions}
							aria-label="Workspace"
							className="min-w-56"
						/>
						<NativeSelect
							size="sm"
							defaultValue="client"
							options={accountOptions}
							aria-label="Compact workspace"
							className="min-w-48"
						/>
					</HStack>
				</ShowcaseGroup>
				<ShowcaseGroup label="Placeholder">
					<NativeSelect
						defaultValue=""
						placeholder="Choose workspace"
						options={accountOptions}
						aria-label="Choose workspace"
						className="min-w-56"
					/>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
