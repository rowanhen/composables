import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VStack } from '@/components/ui/stack'
import { ShowcaseSection } from './showcase-section'

export function DialogShowcase() {
  return (
    <ShowcaseSection title="Dialog" description="Modal dialog for focused interactions.">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <VStack gap={3}>
            <VStack gap={1}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Marshmallow User" />
            </VStack>
            <VStack gap={1}>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="user@marshmallow.com" />
            </VStack>
          </VStack>
          <DialogFooter showCloseButton>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ShowcaseSection>
  )
}
