import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from './bubble'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/Bubble',
	component: Bubble,
	parameters: {
		docs: {
			description: { component: 'Chat and comment bubble surfaces.' },
		},
	},
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
	render: () => (
		<Gallery>
			<Group label="Variants">
				<BubbleGroup>
					<Bubble variant="default">
						<BubbleContent>Primary bubble for high-emphasis messages.</BubbleContent>
					</Bubble>
					<Bubble variant="secondary">
						<BubbleContent>Secondary bubble for quieter responses.</BubbleContent>
					</Bubble>
					<Bubble variant="muted">
						<BubbleContent>Muted bubble for notes and system text.</BubbleContent>
					</Bubble>
					<Bubble variant="outline">
						<BubbleContent>Outlined bubble when the background should stay flat.</BubbleContent>
					</Bubble>
					<Bubble variant="critical">
						<BubbleContent>Critical bubble for error states.</BubbleContent>
					</Bubble>
				</BubbleGroup>
			</Group>
		</Gallery>
	),
}

export const AlignmentAndReactions: Story = {
	name: 'Alignment and reactions',
	render: () => (
		<Gallery>
			<Group label="Alignment and reactions">
				<BubbleGroup>
					<Bubble align="end" variant="default">
						<BubbleContent>Aligned to the end.</BubbleContent>
						<BubbleReactions>+3</BubbleReactions>
					</Bubble>
					<Bubble variant="ghost">
						<BubbleContent>Ghost bubble keeps only the content rhythm.</BubbleContent>
					</Bubble>
				</BubbleGroup>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4} className="max-w-2xl"></VStack>
		</Gallery>
	),
}
