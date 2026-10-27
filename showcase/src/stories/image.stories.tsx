import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from '../../../src/opinionated/image'
import { AspectRatio } from '../../../src/opinionated/aspect-ratio'

const meta = {
	title: 'Data Display/Image',
	component: Image,
	args: {
		src: 'images/landscape.svg',
		alt: 'Illustrated mountains beneath a peach sky and setting sun',
		width: 800,
		height: 450,
	},
	parameters: {
		docs: {
			description: {
				component:
					'Native images with required alt text and dimensions or fill mode. Lazy loading and async decoding by default. Fill needs a positioned parent with a defined size; AspectRatio provides both. No image optimization service is included.',
			},
		},
	},
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Intrinsic: Story = {}

export const Cropped: Story = {
	render: () => (
		<div className="w-64">
			<AspectRatio ratio={1}>
				<Image
					src="images/landscape.svg"
					alt="Sun setting behind mountains"
					fill
					position="70% center"
				/>
			</AspectRatio>
		</div>
	),
}

export const Contained: Story = {
	render: () => (
		<div className="w-64">
			<AspectRatio ratio={1}>
				<Image src="images/landscape.svg" alt="Sun setting behind mountains" fill fit="contain" />
			</AspectRatio>
		</div>
	),
}

export const Background: Story = {
	render: () => (
		<div className="relative isolate overflow-hidden rounded-lg p-12">
			<Image src="images/landscape.svg" alt="" fill loading="eager" className="-z-10" />
			<div className="rounded-lg bg-background p-6 text-foreground">
				<h2 className="text-xl font-semibold">Explore the mountains</h2>
				<p>The decorative image fills the space behind this content.</p>
			</div>
		</div>
	),
}
