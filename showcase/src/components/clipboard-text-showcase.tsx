import { ClipboardText } from '@/components/ui-opinionated/clipboard-text'
import { ShowcaseSection, ShowcaseGroup } from './showcase-section'

export function ClipboardTextShowcase() {
	return (
		<ShowcaseSection
			title="Clipboard text"
			description="Read-only values with an always-visible copy control and accessible feedback."
		>
			<div className="max-w-xl space-y-6">
				<ShowcaseGroup label="Identifier">
					<ClipboardText
						text="0c239dd2"
						labels={{
							text: 'Deployment ID',
							copyAction: 'Copy deployment ID',
							copied: 'Deployment ID copied',
						}}
					/>
				</ShowcaseGroup>
				<ShowcaseGroup label="Sizes">
					<ClipboardText
						text="bun add @leitware/composables"
						size="sm"
						labels={{ copyAction: 'Copy install command' }}
					/>
					<ClipboardText
						text="https://composables.leitware.com/components/clipboard-text"
						size="lg"
						labels={{ copyAction: 'Copy showcase URL' }}
					/>
				</ShowcaseGroup>
				<ShowcaseGroup label="Copy an alternate value">
					<ClipboardText
						text="demo_key_••••••••"
						textToCopy="demo_key_composables_example"
						labels={{
							text: 'Example key preview',
							copyAction: 'Copy example key',
							copied: 'Example key copied',
						}}
						tooltip={{ text: 'Copy full example key', copiedText: 'Example key copied!' }}
					/>
					<p className="text-xs text-content-secondary">
						The masked display copies the full demo value. This is example data.
					</p>
				</ShowcaseGroup>
				<ShowcaseGroup label="Disabled">
					<ClipboardText
						text="Copying is unavailable"
						disabled
						labels={{ copyAction: 'Copy disabled value' }}
					/>
				</ShowcaseGroup>
			</div>
		</ShowcaseSection>
	)
}
