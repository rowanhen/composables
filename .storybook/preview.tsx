import React from 'react'
import { MotionGlobalConfig } from 'motion/react'
import type { Decorator, Preview } from '@storybook/react-vite'
import { presetDefinitions } from '../src/styles/presets-data'
import '../showcase/src/styles/composable.css'

// Freeze JS-driven animations for visual tests.
MotionGlobalConfig.skipAnimations = navigator.webdriver

const PRESET_STYLE_ID = 'composables-storybook-preset'

// Presets are `:root` stylesheets, so inject only the active one.
function applyPreset(presetName: string) {
	document.getElementById(PRESET_STYLE_ID)?.remove()

	const preset = presetDefinitions.find((candidate) => candidate.name === presetName)
	if (!preset || preset.name === 'default') return

	const toBlock = (selector: string, vars: Record<string, string>) =>
		`${selector}{${Object.entries(vars)
			.map(([cssVar, value]) => `${cssVar}:${value};`)
			.join('')}}`

	const style = document.createElement('style')
	style.id = PRESET_STYLE_ID
	style.textContent = `${toBlock(':root', preset.light)}\n${toBlock('.dark', preset.dark)}`
	document.head.appendChild(style)
}

const withTheme: Decorator = (Story, context) => {
	const { theme, preset } = context.globals

	React.useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	React.useLayoutEffect(() => {
		applyPreset(preset)
	}, [preset])

	return (
		<div className="bg-page text-foreground p-6">
			<Story />
		</div>
	)
}

const preview: Preview = {
	decorators: [withTheme],

	initialGlobals: {
		theme: 'light',
		preset: 'default',
	},

	globalTypes: {
		theme: {
			description: 'Light or dark colour scheme',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
		preset: {
			description: 'Token preset applied to the canvas',
			toolbar: {
				title: 'Preset',
				icon: 'paintbrush',
				items: presetDefinitions.map((item) => ({ value: item.name, title: item.label })),
				dynamicTitle: true,
			},
		},
	},

	parameters: {
		layout: 'fullscreen',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
			sort: 'requiredFirst',
		},
		options: {
			storySort: {
				order: [
					'Foundations',
					'Layout',
					'Actions',
					'Content',
					'Overlays',
					'Navigation',
					'Data',
					'Forms',
					'AI',
					'Utilities',
					'*',
				],
			},
		},
		a11y: {
			test: 'todo',
		},
	},

	tags: ['autodocs'],
}

export default preview
