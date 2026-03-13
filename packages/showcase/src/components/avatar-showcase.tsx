import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HStack, VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function AvatarShowcase() {
  return (
    <ShowcaseSection title="Avatar" description="User profile images with fallback initials.">
      <VStack gap={6}>
        {/* Sizes */}
        <VStack gap={2}>
          <Typography variant="heading-200">Sizes</Typography>
          <HStack gap={3} align="center">
            <Avatar size="xs">
              <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/80?img=2" alt="User" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarImage src="https://i.pravatar.cc/80?img=3" alt="User" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/80?img=4" alt="User" />
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="User" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
          </HStack>
          <Typography variant="caption-100" className="text-muted-foreground">
            xs · sm · md · lg · xl
          </Typography>
        </VStack>

        {/* Fallbacks */}
        <VStack gap={2}>
          <Typography variant="heading-200">Fallbacks</Typography>
          <HStack gap={3} align="center">
            <Avatar size="lg">
              <AvatarImage src="/broken-image.jpg" alt="Broken" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="/broken-image.jpg" alt="Broken" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="/broken-image.jpg" alt="Broken" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </HStack>
          <Typography variant="caption-100" className="text-muted-foreground">
            Shows initials when image fails to load
          </Typography>
        </VStack>

        {/* Group */}
        <VStack gap={2}>
          <Typography variant="heading-200">Avatar Group</Typography>
          <div className="flex -space-x-2">
            <Avatar size="md" className="ring-2 ring-background">
              <AvatarImage src="https://i.pravatar.cc/80?img=10" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar size="md" className="ring-2 ring-background">
              <AvatarImage src="https://i.pravatar.cc/80?img=11" alt="User" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar size="md" className="ring-2 ring-background">
              <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="User" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <Avatar size="md" className="ring-2 ring-background">
              <AvatarFallback className="text-2xs">+3</AvatarFallback>
            </Avatar>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
