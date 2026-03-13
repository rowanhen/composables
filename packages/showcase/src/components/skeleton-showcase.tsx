import { Skeleton } from '@/components/ui/skeleton'
import { HStack, VStack } from '@/components/ui/stack'
import { ShowcaseSection } from './showcase-section'

export function SkeletonShowcase() {
  return (
    <ShowcaseSection title="Skeletons" description="Loading placeholder components.">
      <VStack gap={4}>
        <HStack gap={4} align="center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <VStack gap={2} className="flex-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </VStack>
        </HStack>
        <Skeleton className="h-32 w-full rounded-lg" />
        <HStack gap={4}>
          <Skeleton className="h-24 flex-1 rounded-lg" />
          <Skeleton className="h-24 flex-1 rounded-lg" />
          <Skeleton className="h-24 flex-1 rounded-lg" />
        </HStack>
      </VStack>
    </ShowcaseSection>
  )
}
