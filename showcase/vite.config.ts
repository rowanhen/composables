import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// Existing build/deploy workflows invoke `vite build showcase`. Keep that
// command as a bridge to Storybook without maintaining a second showcase app.
const entry = 'virtual:storybook-build'

export default defineConfig({
	build: {
		write: false,
		emptyOutDir: false,
		rollupOptions: { input: entry },
	},
	plugins: [
		{
			name: 'storybook-build',
			apply: 'build',
			resolveId: (id) => (id === entry ? entry : undefined),
			load: (id) => (id === entry ? 'export {}' : undefined),
			buildStart() {
				const result = spawnSync('bun', ['run', 'build:storybook'], {
					cwd: fileURLToPath(new URL('..', import.meta.url)),
					stdio: 'inherit',
				})
				if (result.error) throw result.error
				if (result.status !== 0) this.error('Storybook build failed')
			},
		},
	],
})
