// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Divider } from '@/components/_internal/divider'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

const HORIZONTAL_VARIANTS = [
	{ variant: 'solid', label: 'Solid' },
	{ variant: 'dots', label: 'Dots' },
	{ variant: 'pills', label: 'Pills' },
] as const

const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

export function DividerShowcase() {
	return (
		<ShowcaseSection
			title="Divider"
			description="Semantic divider with 3 token-reactive variants. All variants respond to --radius: at zero radius you get sharp lines, squares, and rectangular dashes; at max radius the solid line becomes a long pill shape, dots become circles, and pills become capsules. Dots and pills derive their element dimensions from --border-width-base (dots are square at that size; pills use it as the thin dimension and double it for the long dimension). Gaps between elements use --spacing."
		>
			<VStack gap={8}>
				<ShowcaseGroup label="Horizontal">
					<VStack gap={4}>
						{HORIZONTAL_VARIANTS.map(({ variant, label }) => (
							<VStack key={variant} gap={2}>
								<Typography variant="caption-100" className="text-muted-foreground">
									{label}
								</Typography>
								<Divider variant={variant} orientation="horizontal" />
							</VStack>
						))}
					</VStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Vertical">
					<HStack gap={6} align="center" className="h-16">
						{(['solid', 'dots', 'pills'] as const).map((variant) => (
							<HStack key={variant} gap={4} align="center" className="h-full">
								<Typography variant="caption-100" className="text-muted-foreground w-12">
									{variant}
								</Typography>
								<Divider variant={variant} orientation="vertical" />
							</HStack>
						))}
					</HStack>
				</ShowcaseGroup>

				{/* Align variants */}
				<VStack gap={4}>
					<Typography variant="heading-200">Alignment</Typography>
					<Typography variant="caption-100" className="text-muted-foreground">
						Position the divider at the start, center, or end of its containing line.
					</Typography>
					{(['dots', 'pills'] as const).map((variant) => (
						<VStack key={variant} gap={3}>
							<Typography variant="caption-100" className="text-muted-foreground capitalize">
								{variant}
							</Typography>
							<HStack gap={6} align="start">
								{ALIGN_OPTIONS.map((align) => (
									<VStack key={align} gap={1} className="flex-1">
										<Typography variant="caption-100" className="text-muted-foreground text-xs">
											{align}
										</Typography>
										<div className="flex items-center h-6 border border-stroke/40 rounded px-2">
											<Divider variant={variant} align={align} />
										</div>
									</VStack>
								))}
							</HStack>
						</VStack>
					))}
				</VStack>

				{/* Token reactivity callout */}
				<div className="rounded-[var(--radius)] border border-stroke bg-muted/40 p-4">
					<Typography variant="caption-100" className="text-muted-foreground">
						Switch presets using the token panel — all variants morph with the tokens.{' '}
						<strong>Solid</strong> gains border-radius (becoming a long pill at max),{' '}
						<strong>dots</strong> shift from squares to circles, and <strong>pills</strong> go from
						rectangular dashes to capsules. <strong>Dots and pills</strong> size their elements from{' '}
						<code className="font-mono text-xs">--border-width-base</code> — increase it for
						chunkier dots/pills. Gaps between elements are controlled by{' '}
						<code className="font-mono text-xs">--spacing</code>, and corner rounding by{' '}
						<code className="font-mono text-xs">--radius</code>.
					</Typography>
				</div>
			</VStack>
		</ShowcaseSection>
	)
}
