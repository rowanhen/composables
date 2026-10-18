import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Container } from '../_internal/container'
import { VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Layout/Container',
	component: Container,
	parameters: {
		docs: {
			description: { component: 'Responsive content widths for page and section layouts.' },
		},
	},
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}>
				{(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((mw) => (
					<Container
						key={mw}
						maxWidth={mw}
						className="bg-surface-emphasis rounded-lg py-3 text-center"
					>
						<Typography variant="body-100" className="text-emphasis">
							maxWidth="{mw}"
						</Typography>
					</Container>
				))}
			</VStack>
		</Gallery>
	),
}
