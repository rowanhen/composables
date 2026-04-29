// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Button } from '@/components/_internal/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/_internal/dialog'
import { Input } from '@/components/_internal/input'
import { Label } from '@/components/_internal/label'
import { VStack } from '@/components/_internal/stack'
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
							<Input id="name" defaultValue="Jane Doe" />
						</VStack>
						<VStack gap={1}>
							<Label htmlFor="email">Email</Label>
							<Input id="email" defaultValue="jane@example.com" />
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
