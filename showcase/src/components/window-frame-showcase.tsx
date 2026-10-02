import { Button } from '@/components/ui-opinionated/button'
import { WindowFrame } from '@/components/ui-opinionated/window-frame'
import { ShowcaseSection } from './showcase-section'

export function WindowFrameShowcase() {
	return (
		<ShowcaseSection
			title="Window frame"
			description="A desktop window shell for dashboard previews, editor mockups, and embedded UI."
		>
			<WindowFrame
				title="Project overview"
				toolbar={<span className="text-xs text-[var(--text-muted)]">Workspace</span>}
				className="max-w-3xl"
			>
				<div className="grid gap-3 sm:grid-cols-3">
					{[
						{ label: 'Active projects', value: '12' },
						{ label: 'Tasks complete', value: '84%' },
						{ label: 'Team members', value: '8' },
					].map((item) => (
						<div
							key={item.label}
							className="rounded-lg border border-stroke-default bg-default p-4"
						>
							<p className="text-xs text-[var(--text-muted)]">{item.label}</p>
							<p className="mt-2 text-2xl font-semibold">{item.value}</p>
						</div>
					))}
				</div>
				<div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-surface-accent p-4">
					<p className="text-sm">The content area accepts any React UI.</p>
					<Button size="sm" variant="outline">
						View work
					</Button>
				</div>
			</WindowFrame>
		</ShowcaseSection>
	)
}
