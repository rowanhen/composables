import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const config: StorybookConfig = {
	// Library stories live beside their components; the showcase keeps stories
	// for the composables-only components that still use showcase demos.
	stories: ['../src/**/*.stories.tsx', '../showcase/src/stories/**/*.stories.tsx'],
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-links'],
	staticDirs: ['./public'],
	framework: '@storybook/react-vite',
	core: { disableTelemetry: true },
	async viteFinal(config) {
		return mergeConfig(config, {
			base: './',
			plugins: [tailwindcss()],
			resolve: {
				alias: {
					'@/components/_internal': resolvePath('../src/_internal'),
					'@/components/ui-opinionated': resolvePath('../src/opinionated'),
					'@/lib': resolvePath('../src/lib'),
					'@/hooks': resolvePath('../src/hooks'),
					'@': resolvePath('../showcase/src'),
				},
			},
		})
	},
}

export default config
