import { CalendarDaysIcon, MapPinIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/_internal/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/_internal/hover-card'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function HoverCardShowcase() {
  return (
    <ShowcaseSection
      title="Hover Card"
      description="A card that appears on hover, typically used for user profile previews."
    >
      <VStack gap={6}>
        <ShowcaseGroup label="Basic">
          <HoverCard>
            <HoverCardTrigger
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-fit cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
            >
              @composables
            </HoverCardTrigger>
            <HoverCardContent>
              <HStack gap={3}>
                <Avatar size="lg">
                  <AvatarImage src="https://i.pravatar.cc/80?img=20" alt="Composables" />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <VStack gap={1}>
                  <Typography variant="label-200" className="font-semibold">
                    Composables
                  </Typography>
                  <Typography variant="caption-100" className="text-muted-foreground">
                    A composable design system for modern React applications.
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
        </ShowcaseGroup>

        <ShowcaseGroup label="Inline Usage">
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
                  <VStack gap={1}>
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
                  <VStack gap={1}>
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
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
