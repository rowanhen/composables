import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordInput } from './password-input'

const meta = {
	title: 'Components/Password input',
	component: PasswordInput,
	args: { label: 'Password', name: 'password', autoComplete: 'current-password' },
} satisfies Meta<typeof PasswordInput>
export default meta

export const Overview: StoryObj<typeof meta> = { name: 'Password input' }
