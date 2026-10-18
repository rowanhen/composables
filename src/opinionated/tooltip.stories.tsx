import { MailIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { Button } from '../_internal/button'
import { HStack } from '../_internal/stack'
import { Tooltip, TooltipContent, TooltipTrigger } from '../_internal/tooltip'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Overlays/Tooltip',
	parameters: {
		docs: {
			description: { component: 'Short contextual help for controls and dense UI.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<HStack gap={4}>
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
					<TooltipContent>
						<Typography variant="body-100">This is a tooltip</Typography>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger render={<Button variant="outline" size="sm" />}>
						<MailIcon className="size-3" />
					</TooltipTrigger>
					<TooltipContent side="bottom">Send email</TooltipContent>
				</Tooltip>
			</HStack>
		</Gallery>
	),
}

export const Variants: Story = {
	render: () => (
		<Gallery>
			<div className="grid max-w-2xl grid-cols-3 justify-items-center gap-6 pt-16 pb-4">
				{(['default', 'inverse', 'brand'] as const).map((variant) => (
					<Tooltip key={variant} defaultOpen>
						<TooltipTrigger render={<Button variant="outline" />}>{variant}</TooltipTrigger>
						<TooltipContent variant={variant}>A {variant} tooltip</TooltipContent>
					</Tooltip>
				))}
			</div>
		</Gallery>
	),
}

export const UnderlinedTrigger: Story = {
	render: () => (
		<Gallery>
			<Typography variant="body-200" className="pt-16">
				Your{' '}
				<Tooltip defaultOpen>
					<TooltipTrigger variant="underline" render={<span />}>
						excess
					</TooltipTrigger>
					<TooltipContent>The amount you pay towards a claim.</TooltipContent>
				</Tooltip>{' '}
				is £250.
			</Typography>
		</Gallery>
	),
}
