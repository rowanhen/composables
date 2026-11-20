import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
	FormInput,
	Sheet,
	SheetClose,
} from '@leitware/composables'

const meta = { title: 'Components/Drawer' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Drawer',
	render: () => (
		<div className="flex flex-wrap gap-3">
			<Drawer side="bottom">
				<DrawerTrigger>Open workspace</DrawerTrigger>
				<DrawerContent>
					<DrawerTitle>Workspace</DrawerTitle>
					<p>Three projects are active.</p>
					<DrawerClose variant="primary">Done</DrawerClose>
				</DrawerContent>
			</Drawer>
			<Sheet
				trigger="Edit profile"
				title="Edit profile"
				description="Update your display name."
				footer={<SheetClose variant="primary">Save changes</SheetClose>}
			>
				<FormInput label="Display name" defaultValue="Alex" />
			</Sheet>
		</div>
	),
}
