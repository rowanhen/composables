import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from '@leitware/composables'

const meta = { title: 'Components/Timeline' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Timeline',
	render: () => (
		<Timeline
			aria-label="Deployment history"
			items={[
				{ value: 'build', title: 'Build finished', status: 'complete' },
				{ value: 'deploy', title: 'Deploying preview', status: 'current' },
			]}
		/>
	),
}
