import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Placeholder } from '../_storybook/gallery'
import { AspectRatio } from '../_internal/aspect-ratio'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Utilities/Aspect ratio',
	component: AspectRatio,
	parameters: {
		docs: {
			description: { component: 'Fixed-ratio media and layout boxes.' },
		},
	},
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}>
				{/* Common ratios */}
				<VStack gap={2}>
					<Typography variant="heading-200">Common Ratios</Typography>
					<HStack gap={4} wrap>
						<VStack gap={1} className="w-48">
							<AspectRatio ratio={16 / 9}>
								<Placeholder className="size-full">
									<Typography variant="caption-100" className="text-muted-foreground">
										16:9
									</Typography>
								</Placeholder>
							</AspectRatio>
							<Typography variant="caption-100" className="text-muted-foreground">
								Widescreen
							</Typography>
						</VStack>
						<VStack gap={1} className="w-48">
							<AspectRatio ratio={4 / 3}>
								<Placeholder className="size-full">
									<Typography variant="caption-100" className="text-muted-foreground">
										4:3
									</Typography>
								</Placeholder>
							</AspectRatio>
							<Typography variant="caption-100" className="text-muted-foreground">
								Standard
							</Typography>
						</VStack>
						<VStack gap={1} className="w-48">
							<AspectRatio ratio={1}>
								<Placeholder className="size-full">
									<Typography variant="caption-100" className="text-muted-foreground">
										1:1
									</Typography>
								</Placeholder>
							</AspectRatio>
							<Typography variant="caption-100" className="text-muted-foreground">
								Square
							</Typography>
						</VStack>
						<VStack gap={1} className="w-32">
							<AspectRatio ratio={3 / 4}>
								<Placeholder className="size-full">
									<Typography variant="caption-100" className="text-muted-foreground">
										3:4
									</Typography>
								</Placeholder>
							</AspectRatio>
							<Typography variant="caption-100" className="text-muted-foreground">
								Portrait
							</Typography>
						</VStack>
					</HStack>
				</VStack>

				{/* With image */}
				<VStack gap={2}>
					<Typography variant="heading-200">With Image</Typography>
					<div className="w-64">
						<AspectRatio ratio={16 / 9}>
							<img
								src="images/landscape.svg"
								alt="Placeholder"
								className="size-full rounded-lg object-cover"
							/>
						</AspectRatio>
					</div>
				</VStack>
			</VStack>
		</Gallery>
	),
}
