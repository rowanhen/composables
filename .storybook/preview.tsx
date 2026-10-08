import type { Preview } from '@storybook/react-vite'
import { Toaster } from '../src/opinionated/sonner'
import { Container } from '../src/opinionated/container'
import { ThemeInjector } from '../showcase/src/components/theme-injector'
import '../showcase/src/styles/composable.css'

const preview: Preview = {
	parameters: {
		layout: 'fullscreen',
		controls: { disable: true },
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
				],
			},
		},
	},
	decorators: [
		(Story) => (
			<>
				<Toaster />
				<ThemeInjector />
				<Container maxWidth="2xl" className="py-10">
					<Story />
				</Container>
			</>
		),
	],
}

export default preview
