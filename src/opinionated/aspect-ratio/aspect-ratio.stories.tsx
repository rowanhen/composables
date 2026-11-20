import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Placeholder } from '../../_storybook/gallery'
import { AspectRatio } from './aspect-ratio'

const meta = {
	title: 'Utilities/Aspect ratio',
	component: AspectRatio,
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Aspect ratio',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-6">
				{/* Common ratios */}
				<div className="flex flex-col gap-2">
					<h3 className="text-base font-medium">Common Ratios</h3>
					<div className="flex gap-4 flex-wrap">
						<div className="flex flex-col gap-1 w-48">
							<AspectRatio ratio={16 / 9}>
								<Placeholder className="size-full">
									<span className="text-xs text-content-muted">16:9</span>
								</Placeholder>
							</AspectRatio>
							<span className="text-xs text-content-muted">Widescreen</span>
						</div>
						<div className="flex flex-col gap-1 w-48">
							<AspectRatio ratio={4 / 3}>
								<Placeholder className="size-full">
									<span className="text-xs text-content-muted">4:3</span>
								</Placeholder>
							</AspectRatio>
							<span className="text-xs text-content-muted">Standard</span>
						</div>
						<div className="flex flex-col gap-1 w-48">
							<AspectRatio ratio={1}>
								<Placeholder className="size-full">
									<span className="text-xs text-content-muted">1:1</span>
								</Placeholder>
							</AspectRatio>
							<span className="text-xs text-content-muted">Square</span>
						</div>
						<div className="flex flex-col gap-1 w-32">
							<AspectRatio ratio={3 / 4}>
								<Placeholder className="size-full">
									<span className="text-xs text-content-muted">3:4</span>
								</Placeholder>
							</AspectRatio>
							<span className="text-xs text-content-muted">Portrait</span>
						</div>
					</div>
				</div>

				{/* With image */}
				<div className="flex flex-col gap-2">
					<h3 className="text-base font-medium">With Image</h3>
					<div className="w-64">
						<AspectRatio ratio={16 / 9}>
							<img
								src="images/landscape.svg"
								alt="Placeholder"
								className="size-full rounded-lg object-cover"
							/>
						</AspectRatio>
					</div>
				</div>
			</div>
		</Gallery>
	),
}
