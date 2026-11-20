import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../../_storybook/gallery'
import { Spinner } from './spinner'

const meta = {
	title: 'Utilities/Spinner',
	component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Spinner',
	render: () => (
		<Gallery>
			<Group label="Default">
				<Spinner />
			</Group>
			<Group label="Brand">
				<div className="flex gap-4 items-center">
					<Spinner variant="spokes" />
					<Spinner variant="spokes" className="h-8" />
					<Spinner variant="spokes" className="text-default h-8" />
				</div>
			</Group>
		</Gallery>
	),
}
