import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Pagination } from './pagination'

const meta = { title: 'Components/Pagination', component: Pagination } satisfies Meta<
	typeof Pagination
>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Pagination',
	args: { pageCount: 24, defaultPage: 5, 'aria-label': 'Search results pages' },
	render: (args) => (
		<Gallery>
			<Pagination {...args} />
		</Gallery>
	),
}
