import { AspectRatio } from '../../src/components/ui/aspect-ratio'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function AspectRatioShowcase() {
  return (
    <ShowcaseSection
      title="Aspect Ratio"
      description="Maintains a consistent width-to-height ratio for responsive content."
    >
      <VStack gap={6}>
        {/* Common ratios */}
        <VStack gap={2}>
          <Typography variant="heading-200">Common Ratios</Typography>
          <HStack gap={4} wrap>
            <VStack gap={1} className="w-48">
              <AspectRatio ratio={16 / 9}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                  <Typography variant="caption-100" className="text-muted-foreground">
                    16:9
                  </Typography>
                </div>
              </AspectRatio>
              <Typography variant="caption-100" className="text-muted-foreground">
                Widescreen
              </Typography>
            </VStack>
            <VStack gap={1} className="w-48">
              <AspectRatio ratio={4 / 3}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                  <Typography variant="caption-100" className="text-muted-foreground">
                    4:3
                  </Typography>
                </div>
              </AspectRatio>
              <Typography variant="caption-100" className="text-muted-foreground">
                Standard
              </Typography>
            </VStack>
            <VStack gap={1} className="w-48">
              <AspectRatio ratio={1}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                  <Typography variant="caption-100" className="text-muted-foreground">
                    1:1
                  </Typography>
                </div>
              </AspectRatio>
              <Typography variant="caption-100" className="text-muted-foreground">
                Square
              </Typography>
            </VStack>
            <VStack gap={1} className="w-32">
              <AspectRatio ratio={3 / 4}>
                <div className="flex size-full items-center justify-center rounded-lg bg-muted">
                  <Typography variant="caption-100" className="text-muted-foreground">
                    3:4
                  </Typography>
                </div>
              </AspectRatio>
              <Typography variant="caption-100" className="text-muted-foreground">
                Portrait
              </Typography>
            </VStack>
          </HStack>
        </VStack>

        {/* With image */}
        <VStack gap={2}>
          <Typography variant="heading-200">With Image</Typography>
          <div className="w-64">
            <AspectRatio ratio={16 / 9}>
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Placeholder"
                className="size-full rounded-lg object-cover"
              />
            </AspectRatio>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
