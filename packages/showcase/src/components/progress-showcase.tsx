import React from 'react'
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '@/components/_internal/progress'
import { HStack, VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

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
        <ShowcaseGroup label="Basic">
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
        </ShowcaseGroup>

        <ShowcaseGroup label="With Label">
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
        </ShowcaseGroup>

        <ShowcaseGroup label="Animated">
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
        </ShowcaseGroup>

        <ShowcaseGroup label="Custom Colors">
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
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
