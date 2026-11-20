import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Swatch } from './gallery'

const meta = {
	title: 'Foundations/Color tokens',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Color tokens',
	render: () => (
		<Gallery>
			<div className="flex flex-col gap-6">
				<h3 className="text-base font-medium">Background Fills</h3>
				<div className="flex gap-3 flex-wrap">
					<Swatch label="fill-primary" bg="--bg-fill-primary" />
					<Swatch label="fill-brand" bg="--bg-fill-brand" />
					<Swatch label="fill-info" bg="--bg-fill-info" />
					<Swatch label="fill-success" bg="--bg-fill-success" />
					<Swatch label="fill-warning" bg="--bg-fill-warning" />
					<Swatch label="fill-critical" bg="--bg-fill-critical" />
					<Swatch label="fill-emphasis" bg="--bg-fill-emphasis" />
				</div>

				<h3 className="text-base font-medium">Background Surfaces</h3>
				<div className="flex gap-3 flex-wrap">
					<Swatch label="default" bg="--bg-surface-default" />
					<Swatch label="info" bg="--bg-surface-info" />
					<Swatch label="success" bg="--bg-surface-success" />
					<Swatch label="warning" bg="--bg-surface-warning" />
					<Swatch label="critical" bg="--bg-surface-critical" />
					<Swatch label="emphasis" bg="--bg-surface-emphasis" />
					<Swatch label="brand" bg="--bg-surface-brand" />
					<Swatch label="inverse" bg="--bg-surface-inverse" />
				</div>

				<h3 className="text-base font-medium">Borders</h3>
				<div className="flex gap-3 flex-wrap">
					<Swatch label="default" borderColor="--border-default" />
					<Swatch label="focus" borderColor="--border-focus" />
					<Swatch label="brand" borderColor="--border-brand" />
					<Swatch label="info" borderColor="--border-info" />
					<Swatch label="success" borderColor="--border-success" />
					<Swatch label="warning" borderColor="--border-warning" />
					<Swatch label="critical" borderColor="--border-critical" />
				</div>

				<h3 className="text-base font-medium">Text Colors</h3>
				<div className="flex gap-6 flex-wrap">
					{[
						['Default', 'text-default'],
						['Secondary', 'text-content-secondary'],
						['Muted', 'text-content-muted'],
						['Disabled', 'text-disabled'],
						['Info', 'text-info'],
						['Success', 'text-success'],
						['Warning', 'text-warning'],
						['Critical', 'text-critical'],
						['Brand', 'text-brand'],
						['Link', 'text-link'],
					].map(([label, colorClass]) => (
						<p className={`text-base ${colorClass}`} key={label}>
							{label}
						</p>
					))}
				</div>
			</div>
		</Gallery>
	),
}
