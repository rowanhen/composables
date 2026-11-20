import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Separator } from './separator'

const meta = {
	title: 'Utilities/Separator',
	component: Separator,
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Separator',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-4">
				<p className="text-sm">Horizontal separator</p>
				<Separator />
				<div className="flex gap-4 items-center h-8">
					<p className="text-sm">Left</p>
					<Separator orientation="vertical" />
					<p className="text-sm">Middle</p>
					<Separator orientation="vertical" />
					<p className="text-sm">Right</p>
				</div>
			</div>
		</Gallery>
	),
}
