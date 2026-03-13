import { Badge } from '@/components/ui/badge'
import { HStack, VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function BadgesShowcase() {
  return (
    <ShowcaseSection title="Badges" description="Badge variants for status labels and tags.">
      <VStack gap={4}>
        <VStack gap={2}>
          <Typography variant="heading-200">Variants</Typography>
          <HStack gap={3} wrap align="center">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="link">Link</Badge>
          </HStack>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Status usage</Typography>
          <HStack gap={3} wrap align="center">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Failed</Badge>
            <Badge variant="info">In Review</Badge>
            <Badge variant="outline">Draft</Badge>
            <Badge variant="secondary">Archived</Badge>
          </HStack>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
