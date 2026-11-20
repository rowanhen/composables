import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkline } from '@leitware/composables'

const meta = { title: 'Components/Sparkline' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Sparkline',
	render: () => <Sparkline data={[4, 6, 3, 8]} label="Requests" trendColor />,
}
