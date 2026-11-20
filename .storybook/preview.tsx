import React from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import { applyPresetStyles, presetOptions } from '../showcase/src/presets'
import '../showcase/src/styles/composable.css'

const PRESET_STYLE_ID = 'composables-storybook-preset'

const withTheme: Decorator = (Story, context) => {
	const { theme, preset } = context.globals

	React.useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	React.useLayoutEffect(() => {
		applyPresetStyles(preset, PRESET_STYLE_ID)
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
				items: presetOptions,
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
				method: 'alphabetical',
				order: ['Components', 'Utilities', 'Foundations'],
			},
		},
		a11y: {
			test: 'todo',
		},
	},
}

export default preview
