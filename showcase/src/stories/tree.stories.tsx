import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tree } from '@leitware/composables'

const meta = { title: 'Components/Tree' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Tree',
	render: () => (
		<Tree
			aria-label="Workspace"
			items={[
				{
					value: 'projects',
					label: 'Projects',
					children: [{ value: 'design', label: 'Design system' }],
				},
				{ value: 'settings', label: 'Settings' },
			]}
			defaultExpanded={['projects']}
		/>
	),
}
