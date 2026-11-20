import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const config: StorybookConfig = {
	stories: ['../src/opinionated/**/*.stories.tsx', '../src/_storybook/**/*.stories.tsx'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-links'],
	staticDirs: ['./public'],
	framework: '@storybook/react-vite',
	core: { disableTelemetry: true },
	async viteFinal(config) {
		return mergeConfig(config, {
			base: './',
			plugins: [tailwindcss()],
			resolve: {
				alias: {
					'@/lib': resolvePath('../src/lib'),
					'@/hooks': resolvePath('../src/hooks'),
					'@': resolvePath('../showcase/src'),
				},
			},
		})
	},
}

export default config
