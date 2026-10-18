import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Card } from '../_internal/card'
import { Divider } from '../_internal/divider'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Utilities/Divider',
	component: Divider,
	parameters: {
		docs: {
			description: { component: 'Opinionated visual dividers for content grouping.' },
		},
	},
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const HORIZONTAL_VARIANTS = [
	{ variant: 'solid', label: 'Solid' },
	{ variant: 'dots', label: 'Dots' },
	{ variant: 'pills', label: 'Pills' },
] as const
const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

export const Horizontal: Story = {
	render: () => (
		<Gallery>
			<Group label="Horizontal">
				<VStack gap={4}>
					{HORIZONTAL_VARIANTS.map(({ variant, label }) => (
						<VStack key={variant} gap={2}>
							<Typography variant="caption-100" className="text-muted-foreground">
								{label}
							</Typography>
							<Divider variant={variant} orientation="horizontal" />
						</VStack>
					))}
				</VStack>
			</Group>
		</Gallery>
	),
}

export const Vertical: Story = {
	render: () => (
		<Gallery>
			<Group label="Vertical">
				<HStack gap={6} align="center" className="h-16">
					{(['solid', 'dots', 'pills'] as const).map((variant) => (
						<HStack key={variant} gap={4} align="center" className="h-full">
							<Typography variant="caption-100" className="text-muted-foreground w-12">
								{variant}
							</Typography>
							<Divider variant={variant} orientation="vertical" />
						</HStack>
					))}
				</HStack>
			</Group>
		</Gallery>
	),
}

export const Alignment: Story = {
	render: () => (
		<Gallery>
			<VStack gap={8}>
				{/* Align variants */}
				<VStack gap={4}>
					<Typography variant="heading-200">Alignment</Typography>
					<Typography variant="caption-100" className="text-muted-foreground">
						Position the divider at the start, center, or end of its containing line.
					</Typography>
					{(['dots', 'pills'] as const).map((variant) => (
						<VStack key={variant} gap={3}>
							<Typography variant="caption-100" className="text-muted-foreground capitalize">
								{variant}
							</Typography>
							<HStack gap={6} align="start">
								{ALIGN_OPTIONS.map((align) => (
									<VStack key={align} gap={1} className="flex-1">
										<Typography variant="caption-100" className="text-muted-foreground text-xs">
											{align}
										</Typography>
										<div className="flex items-center h-6 border border-stroke/40 rounded px-2">
											<Divider variant={variant} align={align} />
										</div>
									</VStack>
								))}
							</HStack>
						</VStack>
					))}
				</VStack>

				{/* Token reactivity callout */}
				<Card className="bg-muted/40 p-4">
					<Typography variant="caption-100" className="text-muted-foreground">
						Switch presets using the token panel - all variants morph with the tokens.{' '}
						<strong>Solid</strong> gains border-radius (becoming a long pill at max),{' '}
						<strong>dots</strong> shift from squares to circles, and <strong>pills</strong> go from
						rectangular dashes to capsules. <strong>Dots and pills</strong> size their elements from{' '}
						<code className="font-mono text-xs">--border-width-base</code> - increase it for
						chunkier dots/pills. Gaps between elements are controlled by{' '}
						<code className="font-mono text-xs">--spacing</code>, and corner rounding by{' '}
						<code className="font-mono text-xs">--radius</code>.
					</Typography>
				</Card>
			</VStack>
		</Gallery>
	),
}
