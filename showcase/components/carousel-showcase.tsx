import { Card } from '../../src/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../src/components/ui/carousel'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function CarouselShowcase() {
  return (
    <ShowcaseSection
      title="Carousel"
      description="A slideshow component for cycling through elements."
    >
      <VStack gap={6}>
        {/* Basic */}
        <VStack gap={2}>
          <Typography variant="heading-200">Basic</Typography>
          <div className="mx-auto max-w-xs">
            <Carousel>
              <CarouselContent>
                {['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5'].map((id, i) => (
                  <CarouselItem key={id}>
                    <Card className="p-0">
                      <div className="flex aspect-square items-center justify-center bg-muted rounded-lg">
                        <Typography variant="heading-400" className="text-muted-foreground">
                          {i + 1}
                        </Typography>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </VStack>

        {/* Multiple items */}
        <VStack gap={2}>
          <Typography variant="heading-200">Multiple Items</Typography>
          <div className="mx-auto max-w-sm">
            <Carousel opts={{ align: 'start' }}>
              <CarouselContent>
                {['m-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-7', 'm-8'].map((id, i) => (
                  <CarouselItem key={id} className="basis-1/3">
                    <Card className="p-0">
                      <div className="flex aspect-square items-center justify-center bg-muted rounded-lg">
                        <Typography variant="heading-300" className="text-muted-foreground">
                          {i + 1}
                        </Typography>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </VStack>

        {/* Vertical */}
        <VStack gap={2}>
          <Typography variant="heading-200">Vertical</Typography>
          <div className="mx-auto max-w-xs">
            <Carousel orientation="vertical" className="max-h-[200px]">
              <CarouselContent className="-mt-2 h-[200px]">
                {['v-1', 'v-2', 'v-3', 'v-4', 'v-5'].map((id, i) => (
                  <CarouselItem key={id} className="pt-2 basis-1/2">
                    <Card className="p-0">
                      <div className="flex items-center justify-center bg-muted rounded-lg p-4">
                        <Typography variant="heading-300" className="text-muted-foreground">
                          {i + 1}
                        </Typography>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
