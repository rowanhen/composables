import type { Meta, StoryObj } from '@storybook/react-vite'
import { Meter } from '@leitware/composables'

const meta = { title: 'Components/Meter' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Meter',
	render: () => <Meter value={65} max={100} label="Storage used" className="max-w-sm" />,
}
