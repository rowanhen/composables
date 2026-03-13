import React from 'react'
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '@/components/ui/progress'
import { HStack, VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function ProgressShowcase() {
  const [animated, setAnimated] = React.useState(25)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimated((prev) => (prev >= 100 ? 0 : prev + 5))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <ShowcaseSection
      title="Progress"
      description="Displays task completion status as a progress bar."
    >
      <VStack gap={6}>
        {/* Basic */}
        <VStack gap={2}>
          <Typography variant="heading-200">Basic</Typography>
          <VStack gap={3} className="max-w-md">
            <Progress value={0}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={25}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={50}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={75}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={100}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </VStack>
        </VStack>

        {/* With label and value */}
        <VStack gap={2}>
          <Typography variant="heading-200">With Label</Typography>
          <VStack gap={3} className="max-w-md">
            <Progress value={65}>
              <HStack justify="between" className="mb-1">
                <ProgressLabel>Uploading files...</ProgressLabel>
                <ProgressValue />
              </HStack>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Progress value={100}>
              <HStack justify="between" className="mb-1">
                <ProgressLabel>Complete</ProgressLabel>
                <ProgressValue />
              </HStack>
              <ProgressTrack>
                <ProgressIndicator className="bg-[var(--bg-fill-success)]" />
              </ProgressTrack>
            </Progress>
          </VStack>
        </VStack>

        {/* Animated */}
        <VStack gap={2}>
          <Typography variant="heading-200">Animated</Typography>
          <div className="max-w-md">
            <Progress value={animated}>
              <HStack justify="between" className="mb-1">
                <ProgressLabel>Processing...</ProgressLabel>
                <ProgressValue />
              </HStack>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </VStack>

        {/* Custom colors */}
        <VStack gap={2}>
          <Typography variant="heading-200">Custom Colors</Typography>
          <VStack gap={3} className="max-w-md">
            <Progress value={80}>
              <ProgressTrack>
                <ProgressIndicator className="bg-[var(--bg-fill-success)]" />
              </ProgressTrack>
            </Progress>
            <Progress value={45}>
              <ProgressTrack>
                <ProgressIndicator className="bg-[var(--bg-fill-warning)]" />
              </ProgressTrack>
            </Progress>
            <Progress value={20}>
              <ProgressTrack>
                <ProgressIndicator className="bg-[var(--bg-fill-critical)]" />
              </ProgressTrack>
            </Progress>
            <Progress value={60}>
              <ProgressTrack>
                <ProgressIndicator className="bg-[var(--bg-fill-info)]" />
              </ProgressTrack>
            </Progress>
          </VStack>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
