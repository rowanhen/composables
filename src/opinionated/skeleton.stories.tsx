import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Skeleton } from '../_internal/skeleton'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Utilities/Skeleton',
	component: Skeleton,
	parameters: {
		docs: {
			description: { component: 'Loading placeholders and pending content states.' },
		},
	},
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}>
				<HStack gap={4} align="center">
					<Skeleton className="h-12 w-12 rounded-full" />
					<VStack gap={2} className="flex-1">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-4 w-32" />
					</VStack>
				</HStack>
				<Skeleton className="h-32 w-full rounded-lg" />
				<HStack gap={4}>
					<Skeleton className="h-24 flex-1 rounded-lg" />
					<Skeleton className="h-24 flex-1 rounded-lg" />
					<Skeleton className="h-24 flex-1 rounded-lg" />
				</HStack>
			</VStack>
		</Gallery>
	),
}
