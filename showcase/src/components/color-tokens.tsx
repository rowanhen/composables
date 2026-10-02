// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { semanticColorTokens } from '../../../src/styles/tokens/registry'
import { ShowcaseSection, Swatch } from './showcase-section'

const tokenGroups = [
	{
		title: 'Backgrounds',
		tokens: semanticColorTokens.filter(
			(token) =>
				token.category === 'bg' &&
				!token.cssVar.startsWith('--bg-fill-') &&
				!token.cssVar.startsWith('--bg-surface-'),
		),
	},
	{
		title: 'Background Surfaces',
		tokens: semanticColorTokens.filter((token) => token.cssVar.startsWith('--bg-surface-')),
	},
	{
		title: 'Background Fills',
		tokens: semanticColorTokens.filter((token) => token.cssVar.startsWith('--bg-fill-')),
	},
	...(['text', 'icon', 'border', 'chart'] as const).map((category) => ({
		title: { text: 'Text Colors', icon: 'Icon Colors', border: 'Borders', chart: 'Chart Colors' }[
			category
		],
		tokens: semanticColorTokens.filter((token) => token.category === category),
	})),
]

export function ColorTokensShowcase() {
	return (
		<ShowcaseSection
			title="Color Tokens"
			description="Every semantic color token from the registry, including all five brand roles. Colors adapt automatically in dark mode."
		>
			<VStack gap={6}>
				{tokenGroups.map(({ title, tokens }) => (
					<VStack key={title} gap={3}>
						<Typography variant="heading-200">{title}</Typography>
						<HStack gap={3} wrap>
							{tokens.map((token) => (
								<Swatch
									key={token.cssVar}
									label={token.label}
									bg={token.category === 'border' ? undefined : token.cssVar}
									borderColor={token.category === 'border' ? token.cssVar : undefined}
								/>
							))}
						</HStack>
					</VStack>
				))}
			</VStack>
		</ShowcaseSection>
	)
}
