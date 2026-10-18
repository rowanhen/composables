import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group, Placeholder } from '../_storybook/gallery'
import { Card } from '../_internal/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../_internal/carousel'
import { VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Data/Carousel',
	parameters: {
		docs: {
			description: { component: 'Scrollable item sequences and controls.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: () => (
		<Gallery>
			<Group label="Basic">
				<div className="mx-auto w-full max-w-xs px-12">
					<Carousel>
						<CarouselContent>
							{['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5'].map((id, i) => (
								<CarouselItem key={id}>
									<Card className="p-0">
										<Placeholder className="aspect-square">
											<Typography variant="heading-400" className="text-muted-foreground">
												{i + 1}
											</Typography>
										</Placeholder>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</Group>
		</Gallery>
	),
}

export const MultipleItems: Story = {
	name: 'Multiple Items',
	render: () => (
		<Gallery>
			<Group label="Multiple Items">
				<div className="mx-auto w-full max-w-sm px-12">
					<Carousel opts={{ align: 'start' }}>
						<CarouselContent>
							{['m-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-7', 'm-8'].map((id, i) => (
								<CarouselItem key={id} className="basis-1/2 sm:basis-1/3">
									<Card className="p-0">
										<Placeholder className="aspect-square">
											<Typography variant="heading-300" className="text-muted-foreground">
												{i + 1}
											</Typography>
										</Placeholder>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</Group>
		</Gallery>
	),
}

export const Vertical: Story = {
	render: () => (
		<Gallery>
			<Group label="Vertical">
				<div className="mx-auto max-w-xs">
					<Carousel orientation="vertical" className="max-h-52">
						<CarouselContent className="-mt-2 h-52">
							{['v-1', 'v-2', 'v-3', 'v-4', 'v-5'].map((id, i) => (
								<CarouselItem key={id} className="pt-2 basis-1/2">
									<Card className="p-0">
										<Placeholder className="p-4">
											<Typography variant="heading-300" className="text-muted-foreground">
												{i + 1}
											</Typography>
										</Placeholder>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}></VStack>
		</Gallery>
	),
}
