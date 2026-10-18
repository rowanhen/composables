import type { Meta, StoryObj } from '@storybook/react-vite'
import { DemoBox, Gallery, Group } from '../_storybook/gallery'
import { Grid, GridItem } from '../_internal/grid'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Layout/Grid',
	parameters: {
		docs: {
			description: { component: 'Grid primitives for aligned responsive surfaces.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const EqualColumnsSpan4Each: Story = {
	name: 'Equal columns (span 4 each)',
	render: () => (
		<Gallery>
			<Group label="Equal columns (span 4 each)">
				<Grid columns={12} gap={4}>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
				</Grid>
			</Group>
		</Gallery>
	),
}

export const SidebarContent39: Story = {
	name: 'Sidebar + Content (3 / 9)',
	render: () => (
		<Gallery>
			<Group label="Sidebar + Content (3 / 9)">
				<Grid columns={12} gap={6}>
					<GridItem colSpan={3}>
						<DemoBox className="min-h-24">3</DemoBox>
					</GridItem>
					<GridItem colSpan={9}>
						<DemoBox className="min-h-24">9</DemoBox>
					</GridItem>
				</Grid>
			</Group>
		</Gallery>
	),
}

export const MixedSpans: Story = {
	name: 'Mixed spans',
	render: () => (
		<Gallery>
			<Group label="Mixed spans">
				<Grid columns={12} gap={4}>
					<GridItem colSpan={12}>
						<DemoBox>12</DemoBox>
					</GridItem>
					<GridItem colSpan={6}>
						<DemoBox>6</DemoBox>
					</GridItem>
					<GridItem colSpan={6}>
						<DemoBox>6</DemoBox>
					</GridItem>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
					<GridItem colSpan={4}>
						<DemoBox>4</DemoBox>
					</GridItem>
					<GridItem colSpan={3}>
						<DemoBox>3</DemoBox>
					</GridItem>
					<GridItem colSpan={3}>
						<DemoBox>3</DemoBox>
					</GridItem>
					<GridItem colSpan={3}>
						<DemoBox>3</DemoBox>
					</GridItem>
					<GridItem colSpan={3}>
						<DemoBox>3</DemoBox>
					</GridItem>
				</Grid>
			</Group>
		</Gallery>
	),
}

export const ColumnOffsetColStart: Story = {
	name: 'Column offset (colStart)',
	render: () => (
		<Gallery>
			<Group label="Column offset (colStart)">
				<Grid columns={12} gap={4}>
					<GridItem colSpan={4} colStart={1}>
						<DemoBox>start 1</DemoBox>
					</GridItem>
					<GridItem colSpan={4} colStart={5}>
						<DemoBox>start 5</DemoBox>
					</GridItem>
					<GridItem colSpan={6} colStart={4}>
						<DemoBox>start 4, span 6</DemoBox>
					</GridItem>
				</Grid>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={8}></VStack>
		</Gallery>
	),
}
