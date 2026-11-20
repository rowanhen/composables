import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, createMotionStyle, MotionStyle, MotionStyleSwitcher } from '@leitware/composables'

const meta = { title: 'Foundations/Motion Style' } satisfies Meta
export default meta

const scopedMotion = createMotionStyle({ global: false, storageKey: null })

export const Overview: StoryObj<typeof meta> = {
	name: 'Motion Style',
	render: () => (
		<MotionStyle preference={scopedMotion} className="flex max-w-sm flex-col items-start gap-4">
			<MotionStyleSwitcher preference={scopedMotion} />
			<Button>Preview press</Button>
		</MotionStyle>
	),
}
