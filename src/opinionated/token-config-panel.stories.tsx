import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useGlobals } from 'storybook/preview-api'
import { GridOverlay } from './grid-overlay'
import { TokenConfigPanel } from './token-config-panel'

const meta = {
	title: 'Foundations/Token config panel',
	component: TokenConfigPanel,
	parameters: {
		docs: {
			description: {
				component:
					'Floating panel for live-editing tokens, with dark mode and grid overlay toggles.',
			},
		},
	},
} satisfies Meta<typeof TokenConfigPanel>

export default meta
type Story = StoryObj<typeof meta>

function TokenConfigPanelDemo({
	dark,
	onDarkChange,
}: {
	dark: boolean
	onDarkChange: (dark: boolean) => void
}) {
	const [grid, setGrid] = React.useState(true)

	return (
		<>
			{grid && <GridOverlay color={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />}
			<div className="flex min-h-96 justify-end">
				<TokenConfigPanel
					dark={dark}
					onDarkChange={onDarkChange}
					grid={grid}
					onGridChange={setGrid}
				/>
			</div>
		</>
	)
}

export const Default: Story = {
	// Storybook hooks only work directly in `render`.
	render: function Render() {
		const [{ theme }, updateGlobals] = useGlobals()
		return (
			<TokenConfigPanelDemo
				dark={theme === 'dark'}
				onDarkChange={(next) => updateGlobals({ theme: next ? 'dark' : 'light' })}
			/>
		)
	},
}
