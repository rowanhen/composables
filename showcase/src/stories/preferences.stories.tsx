import type { Meta, StoryObj } from '@storybook/react-vite'
import { Preferences, PreferenceSwitcher, usePreference } from '@leitware/composables'
import { createPreference } from '@ui-sdk/core'

const meta = { title: 'Foundations/Preferences' } satisfies Meta
export default meta

const density = createPreference({
	values: ['comfortable', 'compact'],
	defaultValue: 'comfortable',
	attribute: 'data-directory-density',
	global: false,
})

function Directory() {
	const { value } = usePreference(density)

	return (
		<ul className="rounded-lg border border-stroke-default">
			{['Design', 'Engineering', 'Support'].map((team) => (
				<li key={team} className={value === 'compact' ? 'px-3 py-1' : 'px-3 py-3'}>
					{team}
				</li>
			))}
		</ul>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'Preferences',
	render: () => (
		<Preferences preferences={[density]} className="flex max-w-sm flex-col items-start gap-4">
			<PreferenceSwitcher preference={density} aria-label="Directory density" />
			<Directory />
		</Preferences>
	),
}
