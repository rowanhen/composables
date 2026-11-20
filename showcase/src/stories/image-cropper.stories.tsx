import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	ImageCropper,
	ImageCropperGrid,
	ImageCropperHandle,
	ImageCropperImage,
	ImageCropperSelection,
	ImageCropperViewport,
} from '@leitware/composables'

const meta = { title: 'Components/Image Cropper' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Image Cropper',
	render: () => (
		<ImageCropper
			src="./images/landscape.svg"
			aria-label="Cover photo"
			aspectRatio={1}
			className="max-w-sm"
		>
			<ImageCropperViewport>
				<ImageCropperImage alt="Mountain landscape" />
				<ImageCropperSelection>
					<ImageCropperGrid />
					{(['nw', 'ne', 'se', 'sw'] as const).map((position) => (
						<ImageCropperHandle key={position} position={position} />
					))}
				</ImageCropperSelection>
			</ImageCropperViewport>
		</ImageCropper>
	),
}
