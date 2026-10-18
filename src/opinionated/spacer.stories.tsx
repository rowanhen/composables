import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Layout/Spacing',
	parameters: {
		docs: {
			description: { component: 'Spacing scale, spacer primitives, and layout rhythm.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const spacingScale = [
	{ label: '0.5', multiplier: 0.5 },
	{ label: '1', multiplier: 1 },
	{ label: '1.5', multiplier: 1.5 },
	{ label: '2', multiplier: 2 },
	{ label: '3', multiplier: 3 },
	{ label: '4', multiplier: 4 },
	{ label: '5', multiplier: 5 },
	{ label: '6', multiplier: 6 },
	{ label: '8', multiplier: 8 },
	{ label: '10', multiplier: 10 },
	{ label: '12', multiplier: 12 },
	{ label: '16', multiplier: 16 },
	{ label: '20', multiplier: 20 },
	{ label: '24', multiplier: 24 },
]

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={2}>
				{spacingScale.map(({ label, multiplier }) => (
					<HStack key={label} gap={4} align="center">
						<Typography variant="caption-100" className="w-12 text-right font-mono">
							{label}
						</Typography>
						<div
							className="h-4 rounded-sm bg-fill-brand"
							style={{ width: `calc(var(--spacing) * ${multiplier})` }}
						/>
						<Typography variant="caption-100" className="text-muted-foreground font-mono">
							{multiplier * 4}px
						</Typography>
					</HStack>
				))}
			</VStack>
		</Gallery>
	),
}
