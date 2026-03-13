import { CalendarDaysIcon, MapPinIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../src/components/ui/hover-card'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function HoverCardShowcase() {
  return (
    <ShowcaseSection
      title="Hover Card"
      description="A card that appears on hover, typically used for user profile previews."
    >
      <VStack gap={6}>
        {/* Basic */}
        <VStack gap={2}>
          <Typography variant="heading-200">Basic</Typography>
          <HoverCard>
            <HoverCardTrigger
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-fit cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
            >
              @marshmallow
            </HoverCardTrigger>
            <HoverCardContent>
              <HStack gap={3}>
                <Avatar size="lg">
                  <AvatarImage src="https://i.pravatar.cc/80?img=20" alt="Marshmallow" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
                <VStack gap={1}>
                  <Typography variant="label-200" className="font-semibold">
                    Marshmallow
                  </Typography>
                  <Typography variant="caption-100" className="text-muted-foreground">
                    Building the future of insurance. Simple, fair, and transparent.
                  </Typography>
                  <HStack gap={3} className="pt-1">
                    <HStack gap={1} align="center">
                      <MapPinIcon className="size-3 text-muted-foreground" />
                      <Typography variant="caption-100" className="text-muted-foreground">
                        London, UK
                      </Typography>
                    </HStack>
                    <HStack gap={1} align="center">
                      <CalendarDaysIcon className="size-3 text-muted-foreground" />
                      <Typography variant="caption-100" className="text-muted-foreground">
                        Joined 2017
                      </Typography>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
            </HoverCardContent>
          </HoverCard>
        </VStack>

        {/* Multiple triggers */}
        <VStack gap={2}>
          <Typography variant="heading-200">Inline Usage</Typography>
          <Typography variant="body-200" className="max-w-lg">
            The project was started by{' '}
            <HoverCard>
              <HoverCardTrigger
                href="#"
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
              >
                @alice
              </HoverCardTrigger>
              <HoverCardContent>
                <HStack gap={3}>
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/80?img=25" alt="Alice" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <VStack gap={0.5}>
                    <Typography variant="label-200" className="font-semibold">
                      Alice Johnson
                    </Typography>
                    <Typography variant="caption-100" className="text-muted-foreground">
                      Senior Engineer · Platform Team
                    </Typography>
                  </VStack>
                </HStack>
              </HoverCardContent>
            </HoverCard>{' '}
            and later reviewed by{' '}
            <HoverCard>
              <HoverCardTrigger
                href="#"
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
              >
                @bob
              </HoverCardTrigger>
              <HoverCardContent>
                <HStack gap={3}>
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/80?img=30" alt="Bob" />
                    <AvatarFallback>BM</AvatarFallback>
                  </Avatar>
                  <VStack gap={0.5}>
                    <Typography variant="label-200" className="font-semibold">
                      Bob Martinez
                    </Typography>
                    <Typography variant="caption-100" className="text-muted-foreground">
                      Tech Lead · Design Systems
                    </Typography>
                  </VStack>
                </HStack>
              </HoverCardContent>
            </HoverCard>
            .
          </Typography>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
