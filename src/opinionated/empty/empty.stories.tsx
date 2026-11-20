import { SearchIcon } from 'lucide-react'
import { Button } from '../button/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Empty } from './empty'

const meta = {
	title: 'Utilities/Empty',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Empty',
	render: () => (
		<Gallery>
			<Empty
				title="No results found"
				description="Try changing your search terms."
				icon={<SearchIcon />}
			>
				<Button>Clear filters</Button>
			</Empty>
		</Gallery>
	),
}
