import { CarIcon, HomeIcon, PlaneIcon } from 'lucide-react'
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormRadioGroup } from './form-radiogroup'

const options = [
	{ value: 'monthly', label: 'Pay monthly', description: '12 instalments, no deposit' },
	{ value: 'annually', label: 'Pay annually', description: 'One payment, save 8%' },
	{ value: 'later', label: 'Decide later', disabled: true },
]

const meta = {
	title: 'Forms/Radio group',
	component: FormRadioGroup,
	args: { label: 'Payment frequency', options },
	parameters: {
		docs: {
			description: {
				component: 'Single choice from a list, as plain radios or selectable cards.',
			},
		},
	},
	render: function Render(args) {
		const [value, setValue] = React.useState<string | null>('monthly')
		return <FormRadioGroup {...args} value={value} onValueChange={setValue} />
	},
} satisfies Meta<typeof FormRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

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

export const Error: Story = {
	args: { error: 'Choose how you would like to pay' },
}
