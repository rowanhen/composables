import { Separator } from '@/components/ui/separator'
import { VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function TypographyShowcase() {
  return (
    <ShowcaseSection
      title="Typography"
      description="Type scale spanning hero, heading, body, label, caption, and link variants."
    >
      <VStack gap={4}>
        <Typography variant="hero-400">Hero 400</Typography>
        <Typography variant="hero-300">Hero 300</Typography>
        <Typography variant="hero-200">Hero 200</Typography>
        <Typography variant="hero-100">Hero 100</Typography>
        <Separator />
        <Typography variant="heading-600" as="h2">
          Heading 600
        </Typography>
        <Typography variant="heading-500" as="h3">
          Heading 500
        </Typography>
        <Typography variant="heading-400" as="h4">
          Heading 400
        </Typography>
        <Typography variant="heading-300" as="h5">
          Heading 300
        </Typography>
        <Typography variant="heading-200" as="h6">
          Heading 200
        </Typography>
        <Typography variant="heading-100">Heading 100</Typography>
        <Separator />
        <Typography variant="brand-heading-600" as="h2">
          Brand Heading 600
        </Typography>
        <Typography variant="brand-heading-500" as="h3">
          Brand Heading 500
        </Typography>
        <Typography variant="brand-heading-400" as="h4">
          Brand Heading 400
        </Typography>
        <Typography variant="brand-heading-300" as="h5">
          Brand Heading 300
        </Typography>
        <Typography variant="brand-heading-200" as="h6">
          Brand Heading 200
        </Typography>
        <Typography variant="brand-heading-100">Brand Heading 100</Typography>
        <Separator />
        <Typography variant="body-300">
          Body 300 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="body-200">
          Body 200 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="body-100">
          Body 100 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Separator />
        <Typography variant="brand-body-300">
          Brand Body 300 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="brand-body-200">
          Brand Body 200 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="brand-body-100">
          Brand Body 100 — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Separator />
        <Typography variant="label-200">LABEL 200</Typography>
        <Typography variant="label-100">LABEL 100</Typography>
        <Typography variant="brand-label-200">BRAND LABEL 200</Typography>
        <Typography variant="brand-label-100">BRAND LABEL 100</Typography>
        <Typography variant="caption-100">Caption 100 — supporting text</Typography>
        <Typography variant="link-200" as="a">
          Link 200
        </Typography>
        <Typography variant="link-100" as="a">
          Link 100
        </Typography>
      </VStack>
    </ShowcaseSection>
  )
}
