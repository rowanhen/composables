import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { List, ListArrowItem, ListBulletItem } from './list'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/List',
	parameters: {
		docs: {
			description: { component: 'Structured lists with consistent spacing and dividers.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const STEPS = [
	{ content: 'Install the CLI from npm' },
	{ content: 'Run composables add in your project' },
	{ content: 'Import and use components directly' },
]
const BASICS = [
	{ content: 'Zero runtime overhead' },
	{ content: 'Tree-shakable exports' },
	{ content: 'Copy-paste friendly' },
]

export const ArrowVariant: Story = {
	name: 'Arrow variant',
	render: () => (
		<Gallery>
			<Group label="Arrow variant">
				<div className="max-w-sm">
					<List variant="arrow" items={STEPS} />
				</div>
			</Group>
		</Gallery>
	),
}

export const BulletVariant: Story = {
	name: 'Bullet variant',
	render: () => (
		<Gallery>
			<Group label="Bullet variant">
				<div className="max-w-sm">
					<List variant="bullet" items={BASICS} />
				</div>
			</Group>
		</Gallery>
	),
}

export const CompositionalChildrenAPI: Story = {
	name: 'Compositional (children API)',
	render: () => (
		<Gallery>
			<Group label="Compositional (children API)">
				<VStack gap={4}>
					<div className="max-w-sm">
						<List variant="arrow">
							<ListArrowItem content="Hand-rolled item A" />
							<ListArrowItem content="Hand-rolled item B with longer description text" />
							<ListArrowItem
								content={<span className="font-semibold text-primary">Highlighted item C</span>}
							/>
						</List>
					</div>
					<div className="max-w-sm">
						<List variant="bullet">
							<ListBulletItem content="Bullet point A" />
							<ListBulletItem content="Bullet point B with extra detail" />
						</List>
					</div>
				</VStack>
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
