import type { Meta, StoryObj } from '@storybook/react-vite'
import { OTPInput } from './otp-input'

const meta = {
	title: 'Components/OTP Input',
	component: OTPInput,
	args: { name: 'code', maxLength: 6 },
} satisfies Meta<typeof OTPInput>

export default meta
type Story = StoryObj<typeof meta>

export const VerificationCode: Story = {}
export const FourDigits: Story = { args: { maxLength: 4, 'aria-label': 'Four-digit PIN' } }
