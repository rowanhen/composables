import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'
import { DescriptionList } from './description-list'

const meta = { title: 'Components/Description list', component: DescriptionList } satisfies Meta<
	typeof DescriptionList
>
export default meta
type Story = StoryObj<typeof meta>

export const Workspace: Story = {
	name: 'Description list',
	args: {
		className: 'mx-auto max-w-xl',
		items: [
			{ id: 'workspace', term: 'Workspace', value: 'North Studio' },
			{ id: 'status', term: 'Status', value: <Badge variant="success">Active</Badge> },
			{ id: 'email', term: 'Email', value: 'billing@example.com', copy: true },
			{ id: 'plan', term: 'Plan', value: 'Professional' },
		],
	},
}
