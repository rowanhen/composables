// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Button } from '@/components/_internal/button'
import { Input } from '@/components/_internal/input'
import { Label } from '@/components/_internal/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/_internal/sheet'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection } from './showcase-section'

export function SheetShowcase() {
  return (
    <ShowcaseSection title="Sheet" description="Slide-out panel from any edge of the screen.">
      <HStack gap={3} wrap>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Right (default)</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Edit settings</SheetTitle>
              <SheetDescription>Adjust your preferences here.</SheetDescription>
            </SheetHeader>
            <VStack gap={3} className="p-6">
              <VStack gap={1}>
                <Label>Display name</Label>
                <Input defaultValue="Jane Doe" />
              </VStack>
              <VStack gap={1}>
                <Label>Email</Label>
                <Input defaultValue="jane@example.com" />
              </VStack>
            </VStack>
            <SheetFooter>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Left</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Side panel from the left edge.</SheetDescription>
            </SheetHeader>
            <VStack gap={2} className="p-6">
              <Typography variant="body-100">Dashboard</Typography>
              <Typography variant="body-100">Settings</Typography>
              <Typography variant="body-100">Profile</Typography>
            </VStack>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Top</SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Announcement</SheetTitle>
              <SheetDescription>Top sheet for banners and announcements.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Bottom</SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Actions</SheetTitle>
              <SheetDescription>Bottom sheet for action menus.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </HStack>
    </ShowcaseSection>
  )
}
