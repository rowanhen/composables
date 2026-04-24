// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
/**
 * Glyph Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Demonstrates all Glyph variants and sizes.
 */

import { Glyph } from '@/components/_internal/glyph'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection } from './showcase-section'

export function GlyphShowcase() {
	return (
		<ShowcaseSection
			title="Glyph"
			description="Fixed-size square containing a centred character or symbol. Four variants: default, filled, circle, circle-inverted."
		>
			<VStack gap={6}>
				{/* Variants at size 48 */}
				<VStack gap={2}>
					<Typography variant="label-100">Variants (size 48)</Typography>
					<HStack gap={4} wrap>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="default">
								A
							</Glyph>
							<Typography variant="caption-100">default</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="filled">
								B
							</Glyph>
							<Typography variant="caption-100">filled</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="circle">
								C
							</Glyph>
							<Typography variant="caption-100">circle</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="circle-inverted">
								D
							</Glyph>
							<Typography variant="caption-100">circle-inverted</Typography>
						</VStack>
					</HStack>
				</VStack>

				{/* Sizes */}
				<VStack gap={2}>
					<Typography variant="label-100">Sizes (default variant)</Typography>
					<HStack gap={4} align="end" wrap>
						<VStack gap={1} align="center">
							<Glyph size={16} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">16</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={24} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">24</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={32} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">32</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={48} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">48</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={64} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">64</Typography>
						</VStack>
						<VStack gap={1} align="center">
							<Glyph size={96} variant="default">
								Z
							</Glyph>
							<Typography variant="caption-100">96</Typography>
						</VStack>
					</HStack>
				</VStack>

				{/* Emoji / Unicode */}
				<VStack gap={2}>
					<Typography variant="label-100">Emoji &amp; Unicode</Typography>
					<HStack gap={4} wrap>
						<Glyph size={48} variant="default">
							★
						</Glyph>
						<Glyph size={48} variant="filled">
							⚡
						</Glyph>
						<Glyph size={48} variant="circle">
							🔥
						</Glyph>
						<Glyph size={48} variant="circle-inverted">
							∞
						</Glyph>
					</HStack>
				</VStack>
			</VStack>
		</ShowcaseSection>
	)
}
