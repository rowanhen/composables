import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Skeleton } from './skeleton'

const meta = {
	title: 'Utilities/Skeleton',
	component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Skeleton',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4 items-center">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="flex flex-col gap-2 flex-1">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<Skeleton className="h-32 w-full rounded-lg" />
				<div className="flex gap-4">
					<Skeleton className="h-24 flex-1 rounded-lg" />
					<Skeleton className="h-24 flex-1 rounded-lg" />
					<Skeleton className="h-24 flex-1 rounded-lg" />
				</div>
			</div>
		</Gallery>
	),
}
