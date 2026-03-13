import {
  AlertCircleIcon,
  HeartIcon,
  LoaderIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { HStack, VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function IconShowcase() {
  return (
    <ShowcaseSection
      title="Icon"
      description="Wrapper component for consistent icon sizing, colour inheritance, and spin animation."
    >
      <VStack gap={4}>
        {/* Sizes */}
        <VStack gap={2}>
          <Typography variant="heading-200">Sizes</Typography>
          <HStack gap={4} align="center">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <VStack key={size} gap={1} align="center">
                <Icon size={size}>
                  <StarIcon />
                </Icon>
                <Typography variant="caption-100">{size}</Typography>
              </VStack>
            ))}
          </HStack>
        </VStack>

        {/* Spin */}
        <VStack gap={2}>
          <Typography variant="heading-200">Spin animation</Typography>
          <HStack gap={4} align="center">
            <Icon spin>
              <LoaderIcon />
            </Icon>
            <Icon size="lg" spin>
              <SettingsIcon />
            </Icon>
            <Icon size="xl" spin>
              <LoaderIcon />
            </Icon>
          </HStack>
        </VStack>

        {/* Colour inheritance */}
        <VStack gap={2}>
          <Typography variant="heading-200">Colour inheritance</Typography>
          <HStack gap={4} align="center">
            <span className="text-foreground">
              <Icon size="lg">
                <HeartIcon />
              </Icon>
            </span>
            <span className="text-destructive">
              <Icon size="lg">
                <AlertCircleIcon />
              </Icon>
            </span>
            <span className="text-muted-foreground">
              <Icon size="lg">
                <SearchIcon />
              </Icon>
            </span>
            <span className="text-primary">
              <Icon size="lg">
                <MailIcon />
              </Icon>
            </span>
          </HStack>
        </VStack>

        {/* Inside Button */}
        <VStack gap={2}>
          <Typography variant="heading-200">Inside Button</Typography>
          <HStack gap={3} align="center">
            <Button size="sm">
              <Icon size="sm">
                <MailIcon />
              </Icon>
              Send
            </Button>
            <Button variant="outline">
              <Icon>
                <SearchIcon />
              </Icon>
              Search
            </Button>
            <Button size="lg" variant="secondary">
              <Icon size="lg">
                <SettingsIcon />
              </Icon>
              Settings
            </Button>
          </HStack>
        </VStack>

        {/* Inside Badge */}
        <VStack gap={2}>
          <Typography variant="heading-200">Inside Badge</Typography>
          <HStack gap={3} align="center">
            <Badge variant="default">
              <Icon size="xs">
                <StarIcon />
              </Icon>
              Featured
            </Badge>
            <Badge variant="destructive">
              <Icon size="xs">
                <AlertCircleIcon />
              </Icon>
              Error
            </Badge>
            <Badge variant="success">
              <Icon size="xs">
                <HeartIcon />
              </Icon>
              Healthy
            </Badge>
          </HStack>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
