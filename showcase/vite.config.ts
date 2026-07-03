import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/',
	plugins: [
		tanstackRouter({
			generatedRouteTree: './src/routeTree.gen.ts',
			quoteStyle: 'single',
			routesDirectory: './src/routes',
			target: 'react',
		}),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@/components/_internal': path.resolve(__dirname, '../src/_internal'),
			'@/components/ui-opinionated': path.resolve(__dirname, '../src/opinionated'),
			'@/lib': path.resolve(__dirname, '../src/lib'),
			'@/hooks': path.resolve(__dirname, '../src/hooks'),
			'@': path.resolve(__dirname, './src'),
		},
	},
})
