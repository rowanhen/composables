import type { Meta, StoryObj } from '@storybook/react-vite'
import { Filter } from '@leitware/composables'

const meta = { title: 'Components/Filter' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Filter',
	render: () => (
		<Filter
			label="Status"
			options={[
				{ value: 'open', label: 'Open', count: 12 },
				{ value: 'closed', label: 'Closed', count: 6 },
			]}
		/>
	),
}
