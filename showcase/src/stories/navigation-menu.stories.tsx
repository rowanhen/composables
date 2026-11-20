import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationMenu, NavigationMenuLink } from '@leitware/composables'

const meta = { title: 'Components/Navigation Menu' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Navigation Menu',
	render: () => (
		<div className="space-y-12">
			<NavigationMenu
				aria-label="Workspace navigation"
				items={[
					{ label: 'Overview', href: '#workspace-overview', current: true },
					{
						value: 'reports',
						label: 'Reports',
						content: (
							<NavigationMenuLink href="#workspace-reports">
								<span>
									<span className="block font-medium">Browse reports</span>
									<span className="block text-content-muted">Search the reporting archive</span>
								</span>
							</NavigationMenuLink>
						),
					},
				]}
			/>
			<div id="workspace-overview">Workspace overview</div>
			<div id="workspace-reports">Reporting archive</div>
		</div>
	),
}
