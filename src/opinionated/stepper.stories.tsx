import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from './stepper'

const meta = { title: 'Components/Stepper', component: Stepper } satisfies Meta<typeof Stepper>
export default meta
type Story = StoryObj<typeof meta>

export const Checkout: Story = {
	name: 'Stepper',
	args: {
		'aria-label': 'Checkout progress',
		linear: false,
		className: 'mx-auto max-w-2xl gap-5',
		steps: [
			{ value: 'contact', label: 'Contact', content: <p>Enter your contact details.</p> },
			{ value: 'payment', label: 'Payment', content: <p>Choose a payment method.</p> },
			{ value: 'review', label: 'Review', content: <p>Check your order details.</p> },
		],
	},
}
