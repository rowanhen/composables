import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Gallery, Group } from '../_storybook/gallery'

const meta = {
	title: 'Components/Button',
	component: Button,
	args: { children: 'Save changes', variant: 'primary' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	name: 'Button',
	render: (args) => (
		<Gallery>
			<Group label="Variants">
				<div className="flex flex-wrap items-center gap-3">
					<Button>Cancel</Button>
					<Button {...args} />
					<Button variant="ghost">Skip</Button>
					<Button variant="destructive">Delete</Button>
				</div>
			</Group>
			<Group label="States">
				<div className="flex flex-wrap items-center gap-3">
					<Button size="sm">Small</Button>
					<Button size="lg">Large</Button>
					<Button disabled>Disabled</Button>
					<Button
						variant="primary"
						onClick={() => new Promise<void>((resolve) => setTimeout(resolve, 1200))}
					>
						Save asynchronously
					</Button>
				</div>
			</Group>
		</Gallery>
	),
}
