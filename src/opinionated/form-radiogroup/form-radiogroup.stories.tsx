import { CarIcon, HomeIcon, PlaneIcon } from 'lucide-react'
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormRadioGroup } from './form-radiogroup'
import { Radio } from '../radio/radio'
import { RadioGroup } from '../radio-group/radio-group'
import { Gallery, Group } from '../../_storybook/gallery'

const options = [
	{ value: 'monthly', label: 'Pay monthly', description: '12 instalments, no deposit' },
	{ value: 'annually', label: 'Pay annually', description: 'One payment, save 8%' },
	{ value: 'later', label: 'Decide later', disabled: true },
]

const meta = {
	title: 'Components/Radio group',
	component: FormRadioGroup,
	args: { label: 'Payment frequency', options },
	render: function Render(args) {
		const [value, setValue] = React.useState<string | null>('monthly')
		return <FormRadioGroup {...args} value={value} onValueChange={setValue} />
	},
} satisfies Meta<typeof FormRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => (
		<Gallery>
			<FormRadioGroup {...args} defaultValue="monthly" />
			<Group label="Delivery method">
				<RadioGroup aria-label="Delivery method" defaultValue="email">
					<label className="flex items-center gap-2">
						<Radio value="email" /> Email
					</label>
					<label className="flex items-center gap-2">
						<Radio value="sms" /> SMS
					</label>
				</RadioGroup>
			</Group>
		</Gallery>
	),
}

export const Card: Story = {
	args: { variant: 'card' },
}

export const CardWithIcons: Story = {
	args: {
		variant: 'card',
		label: 'What are you insuring?',
		className: 'max-w-md',
		options: [
			{ value: 'car', label: 'Car', icon: <CarIcon className="size-6" /> },
			{ value: 'home', label: 'Home', icon: <HomeIcon className="size-6" /> },
			{ value: 'travel', label: 'Travel', icon: <PlaneIcon className="size-6" /> },
		],
	},
}
