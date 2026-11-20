import type { Meta, StoryObj } from '@storybook/react-vite'
import { useGlobals } from 'storybook/preview-api'
import { TokenConfigPanel } from '../tools/token-config-panel'

const meta = {
	title: 'Foundations/Token config panel',
	component: TokenConfigPanel,
} satisfies Meta<typeof TokenConfigPanel>

export default meta

export const Default: StoryObj<typeof meta> = {
	name: 'Token config panel',
	render: function Render() {
		const [{ theme }, updateGlobals] = useGlobals()
		return (
			<div className="flex min-h-96 justify-end">
				<TokenConfigPanel
					dark={theme === 'dark'}
					onDarkChange={(dark) => updateGlobals({ theme: dark ? 'dark' : 'light' })}
				/>
			</div>
		)
	},
}
