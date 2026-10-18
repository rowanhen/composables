import type { Meta, StoryObj } from '@storybook/react-vite'
import { DemoBox, Gallery, Group } from '../_storybook/gallery'
import { Badge } from '../_internal/badge'
import { Button } from '../_internal/button'
import { Card } from '../_internal/card'
import { Grid, GridItem } from '../_internal/grid'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Layout/Stack',
	parameters: {
		docs: {
			description: { component: 'Vertical and horizontal composition helpers.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const VStackVertical: Story = {
	name: 'VStack (vertical)',
	render: () => (
		<Gallery>
			<Group label="VStack (vertical)">
				<Card className="p-4">
					<VStack gap={3}>
						<DemoBox>Item 1</DemoBox>
						<DemoBox>Item 2</DemoBox>
						<DemoBox>Item 3</DemoBox>
					</VStack>
				</Card>
			</Group>
		</Gallery>
	),
}

export const HStackHorizontal: Story = {
	name: 'HStack (horizontal)',
	render: () => (
		<Gallery>
			<Group label="HStack (horizontal)">
				<Card className="p-4">
					<HStack gap={3}>
						<DemoBox className="flex-1">1</DemoBox>
						<DemoBox className="flex-1">2</DemoBox>
						<DemoBox className="flex-1">3</DemoBox>
					</HStack>
				</Card>
			</Group>
		</Gallery>
	),
}

export const Example: Story = {
	render: () => (
		<Gallery>
			<Group label='justify="between"'>
				<Card className="p-4">
					<HStack justify="between" align="center">
						<Typography variant="body-100">Left</Typography>
						<Button>Action</Button>
					</HStack>
				</Card>
			</Group>
		</Gallery>
	),
}

export const WrappingTags: Story = {
	name: 'Wrapping tags',
	render: () => (
		<Gallery>
			<Group label="Wrapping tags">
				<Card className="p-4">
					<HStack gap={2} wrap>
						{Array.from({ length: 8 }, (_, i) => (
							<Badge key={i} variant="outline">
								Tag {i + 1}
							</Badge>
						))}
					</HStack>
				</Card>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<Grid columns={12} gap={6}>
				<GridItem colSpan={6}></GridItem>
				<GridItem colSpan={6}></GridItem>
				<GridItem colSpan={6}></GridItem>
				<GridItem colSpan={6}></GridItem>
			</Grid>
		</Gallery>
	),
}
