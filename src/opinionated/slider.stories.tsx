import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Label } from './label'
import { Slider } from './slider'

const meta = {
	title: 'Components/Slider',
	component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Slider',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-6 max-w-md">
				<div className="flex flex-col gap-2">
					<Label>Single value</Label>
					<Slider defaultValue={50} aria-label="Single value" showValue />
				</div>
				<div className="flex flex-col gap-2">
					<Label>Range</Label>
					<Slider defaultValue={[25, 75]} aria-label="Range" showValue />
				</div>
			</div>
		</Gallery>
	),
}
