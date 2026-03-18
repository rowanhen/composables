// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection, Swatch } from './showcase-section'

export function ColorTokensShowcase() {
  return (
    <ShowcaseSection
      title="Color Tokens"
      description="Semantic color tokens mapped to primitive palette values. Colors adapt automatically in dark mode."
    >
      <VStack gap={6}>
        <Typography variant="heading-200">Background Fills</Typography>
        <HStack gap={3} wrap>
          <Swatch label="fill-primary" bg="--bg-fill-primary" />
          <Swatch label="fill-brand" bg="--bg-fill-brand" />
          <Swatch label="fill-info" bg="--bg-fill-info" />
          <Swatch label="fill-success" bg="--bg-fill-success" />
          <Swatch label="fill-warning" bg="--bg-fill-warning" />
          <Swatch label="fill-critical" bg="--bg-fill-critical" />
          <Swatch label="fill-emphasis" bg="--bg-fill-emphasis" />
        </HStack>

        <Typography variant="heading-200">Background Surfaces</Typography>
        <HStack gap={3} wrap>
          <Swatch label="default" bg="--bg-surface-default" />
          <Swatch label="info" bg="--bg-surface-info" />
          <Swatch label="success" bg="--bg-surface-success" />
          <Swatch label="warning" bg="--bg-surface-warning" />
          <Swatch label="critical" bg="--bg-surface-critical" />
          <Swatch label="emphasis" bg="--bg-surface-emphasis" />
          <Swatch label="brand" bg="--bg-surface-brand" />
          <Swatch label="inverse" bg="--bg-surface-inverse" />
        </HStack>

        <Typography variant="heading-200">Borders</Typography>
        <HStack gap={3} wrap>
          <Swatch label="default" borderColor="--border-default" />
          <Swatch label="focus" borderColor="--border-focus" />
          <Swatch label="brand" borderColor="--border-brand" />
          <Swatch label="info" borderColor="--border-info" />
          <Swatch label="success" borderColor="--border-success" />
          <Swatch label="warning" borderColor="--border-warning" />
          <Swatch label="critical" borderColor="--border-critical" />
        </HStack>

        <Typography variant="heading-200">Text Colors</Typography>
        <HStack gap={6} wrap>
          {[
            ['Default', '--text-default'],
            ['Secondary', '--text-secondary'],
            ['Muted', '--text-muted'],
            ['Disabled', '--text-disabled'],
            ['Info', '--text-info'],
            ['Success', '--text-success'],
            ['Warning', '--text-warning'],
            ['Critical', '--text-critical'],
            ['Brand', '--text-brand'],
            ['Link', '--text-link'],
          ].map(([label, cssVar]) => (
            <Typography key={label} variant="body-200" style={{ color: `var(${cssVar})` }}>
              {label}
            </Typography>
          ))}
        </HStack>
      </VStack>
    </ShowcaseSection>
  )
}
