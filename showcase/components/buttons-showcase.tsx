import {
  AlertTriangleIcon,
  CheckCircleIcon,
  DownloadIcon,
  InfoIcon,
  MailIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'
import { Button } from '../../src/components/ui/button'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function ButtonsShowcase() {
  return (
    <ShowcaseSection title="Buttons" description="Button variants and sizes with icon support.">
      <VStack gap={6}>
        <VStack gap={2}>
          <Typography variant="heading-200">Variants</Typography>
          <HStack gap={3} wrap align="center">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
            <Button variant="link">Link</Button>
          </HStack>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Sizes</Typography>
          <HStack gap={3} wrap align="center">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </HStack>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Icon sizes</Typography>
          <HStack gap={3} wrap align="center">
            <Button size="icon-xs">
              <PlusIcon />
            </Button>
            <Button size="icon-sm">
              <PlusIcon />
            </Button>
            <Button size="icon">
              <PlusIcon />
            </Button>
            <Button size="icon-lg">
              <PlusIcon />
            </Button>
          </HStack>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">With icons</Typography>
          <HStack gap={3} wrap align="center">
            <Button>
              <MailIcon data-icon="inline-start" />
              Send Email
            </Button>
            <Button variant="outline">
              <DownloadIcon data-icon="inline-start" />
              Download
            </Button>
            <Button variant="destructive">
              <TrashIcon data-icon="inline-start" />
              Delete
            </Button>
            <Button variant="success">
              <CheckCircleIcon data-icon="inline-start" />
              Approve
            </Button>
            <Button variant="warning">
              <AlertTriangleIcon data-icon="inline-start" />
              Caution
            </Button>
            <Button variant="info">
              <InfoIcon data-icon="inline-start" />
              Details
            </Button>
          </HStack>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Disabled</Typography>
          <HStack gap={3} wrap align="center">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button variant="destructive" disabled>
              Disabled Destructive
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
