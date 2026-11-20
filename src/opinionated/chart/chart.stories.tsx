import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chart } from '@leitware/composables'

const meta = { title: 'Components/Chart' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Chart',
	render: () => (
		<Chart
			aria-label="Requests per day"
			type="bar"
			categoryKey="day"
			data={[
				{ day: 'Mon', requests: 8 },
				{ day: 'Tue', requests: 12 },
				{ day: 'Wed', requests: 10 },
			]}
			config={{ requests: { label: 'Requests', color: 'var(--chart-1)' } }}
		/>
	),
}
