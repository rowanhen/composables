import { ArrowRightIcon, BookOpenIcon, SettingsIcon } from 'lucide-react'
import { LayerCard } from '@/components/ui-opinionated/layer-card'
import { Button } from '@/components/_internal/button'
import { ClipboardText } from '@/components/ui-opinionated/clipboard-text'
import { ShowcaseSection, ShowcaseGroup } from './showcase-section'

export function LayerCardShowcase() {
	return (
		<ShowcaseSection
			title="Layer cards"
			description="Recessed headers and footers around a raised content surface."
		>
			<div className="space-y-8">
				<ShowcaseGroup label="Getting started">
					<LayerCard
						title="Next steps"
						action={
							<Button
								variant="ghost"
								size="icon-sm"
								aria-label="Open getting started"
								nativeButton={false}
								render={<a href="#layer-card-composition" />}
							>
								<ArrowRightIcon />
							</Button>
						}
					>
						<div className="flex items-start gap-3">
							<BookOpenIcon aria-hidden="true" className="mt-1 size-5 text-icon-emphasis" />
							<div>
								<h3 className="text-base font-semibold">Build with Composables</h3>
								<p className="mt-1 text-sm text-content-secondary">
									Familiar primitives. Thoughtful defaults. One component entrypoint.
								</p>
							</div>
						</div>
					</LayerCard>
				</ShowcaseGroup>
				<div className="grid gap-6 sm:grid-cols-2">
					<LayerCard
						title="Project settings"
						footer={<span className="text-xs">Changes apply to the production environment.</span>}
					>
						<div className="flex items-center gap-2">
							<SettingsIcon aria-hidden="true" className="size-4" />
							<span className="text-sm font-medium">Production API</span>
						</div>
						<ClipboardText text="api.leitware.com" labels={{ copyAction: 'Copy API hostname' }} />
					</LayerCard>
					<LayerCard>
						<h3 className="text-sm font-semibold">A simple surface</h3>
						<p className="mt-2 text-sm text-content-secondary">
							Omit the header and footer for a single raised card.
						</p>
					</LayerCard>
				</div>
				<ShowcaseGroup label="Compound composition">
					<LayerCard.Root id="layer-card-composition">
						<LayerCard.Secondary>Resource details</LayerCard.Secondary>
						<LayerCard.Primary>
							<h3 className="text-sm font-semibold">worker-production</h3>
							<p className="text-sm text-content-secondary">
								Use the sections directly for custom headers, toolbars, and content.
							</p>
						</LayerCard.Primary>
						<LayerCard.Secondary>Last deployed just now</LayerCard.Secondary>
					</LayerCard.Root>
				</ShowcaseGroup>
			</div>
		</ShowcaseSection>
	)
}
