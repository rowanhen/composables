import type { Meta, StoryObj } from '@storybook/react-vite'
import { TriggerMenu, TriggerMenuContent, TriggerMenuInput } from '@leitware/composables'

const meta = { title: 'Components/Trigger Menu' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Trigger Menu',
	render: () => (
		<TriggerMenu
			triggers={[
				{
					char: '@',
					items: [
						{ value: 'alex', label: 'Alex' },
						{ value: 'mo', label: 'Mo' },
					],
				},
			]}
		>
			<TriggerMenuInput aria-label="Message" placeholder="Type @ to mention someone" />
			<TriggerMenuContent />
		</TriggerMenu>
	),
}
