import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rating } from '@leitware/composables'

const meta = { title: 'Components/Rating' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Rating',
	render: () => <Rating defaultValue={3} aria-label="Rate this session" />,
}
