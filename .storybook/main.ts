import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const config: StorybookConfig = {
	stories: ['../showcase/src/stories/**/*.stories.tsx'],
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
