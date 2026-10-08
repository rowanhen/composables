import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropzoneShowcase } from '../components/dropzone-showcase'

const meta = {
	title: 'Forms/Dropzone',
	component: DropzoneShowcase,
} satisfies Meta<typeof DropzoneShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
