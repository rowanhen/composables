import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { FormInput } from '../form-input/form-input'
import { Popover, PopoverDescription, PopoverTitle } from './popover'

const meta = { title: 'Components/Popover', component: Popover } satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Popover',
	args: {
		trigger: 'Dimensions',
		children: (
			<div className="space-y-3">
				<div>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>Set the width of the layer.</PopoverDescription>
				</div>
				<FormInput label="Width" defaultValue="100%" />
			</div>
		),
	},
	render: (args) => (
		<Gallery>
			<Popover {...args} />
		</Gallery>
	),
}
