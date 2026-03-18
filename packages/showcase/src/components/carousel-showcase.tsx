import { Card } from '@/components/_internal/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/_internal/carousel'
import { VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function CarouselShowcase() {
  return (
    <ShowcaseSection
      title="Carousel"
      description="A slideshow component for cycling through elements."
    >
      <VStack gap={6}>
        <ShowcaseGroup label="Basic">
          <div className="mx-auto w-full max-w-xs px-12">
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
        </ShowcaseGroup>

        <ShowcaseGroup label="Multiple Items">
          <div className="mx-auto w-full max-w-sm px-12">
            <Carousel opts={{ align: 'start' }}>
              <CarouselContent>
                {['m-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-7', 'm-8'].map((id, i) => (
                  <CarouselItem key={id} className="basis-1/2 sm:basis-1/3">
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
        </ShowcaseGroup>

        <ShowcaseGroup label="Vertical">
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
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
