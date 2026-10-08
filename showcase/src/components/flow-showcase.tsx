import { useState } from 'react'
import { CheckIcon, ClockIcon, DatabaseIcon, GlobeIcon, ZapIcon } from 'lucide-react'
import { Flow, type FlowItem } from '@/components/ui-opinionated/flow'
import { Button } from '@/components/ui-opinionated/button'
import { ShowcaseSection, ShowcaseGroup } from './showcase-section'

const steps: FlowItem[] = [
	{ id: 'flow-request', label: 'Request', icon: <GlobeIcon /> },
	{
		id: 'flow-branches',
		branches: [
			[{ id: 'flow-cache', label: 'Cache lookup', icon: <DatabaseIcon /> }],
			[
				{ id: 'flow-worker', label: 'Worker', icon: <ZapIcon /> },
				{ id: 'flow-validate', label: 'Validate' },
			],
			[{ id: 'flow-analytics', label: 'Analytics', icon: <ClockIcon />, disabled: true }],
		],
	},
	{ id: 'flow-response', label: 'Response', icon: <CheckIcon /> },
]
export function FlowShowcase() {
	const [expanded, setExpanded] = useState(false)
	const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
	return (
		<ShowcaseSection
			title="Flow diagrams"
			description="Connected steps and parallel branches, with measured connectors that follow the content."
		>
			<div className="space-y-8">
				<ShowcaseGroup label="Parallel workflow">
					<div className="mb-3 flex gap-2">
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setOrientation((value) => (value === 'horizontal' ? 'vertical' : 'horizontal'))
							}
						>
							Switch orientation
						</Button>
					</div>
					<Flow
						steps={steps}
						orientation={orientation}
						align="center"
						aria-label="Request processing workflow"
					/>
				</ShowcaseGroup>
				<ShowcaseGroup label="Nodes resize with their content">
					<Flow align="center" className="max-w-sm" aria-label="Expandable workflow">
						<Flow.Node>Trigger</Flow.Node>
						<Flow.Node>
							<Flow.Anchor type="both">
								<Button
									size="sm"
									variant="secondary"
									onClick={() => setExpanded((value) => !value)}
									aria-expanded={expanded}
								>
									{expanded ? 'Hide details' : 'Show details'}
								</Button>
							</Flow.Anchor>
							{expanded && (
								<div className="mt-3 max-w-xs text-xs leading-relaxed text-content-secondary">
									Connectors follow the button anchor while the node grows to reveal this detail.
									Resize the window to keep the diagram aligned.
								</div>
							)}
						</Flow.Node>
						<Flow.Node>Complete</Flow.Node>
					</Flow>
				</ShowcaseGroup>
				<ShowcaseGroup label="Without a canvas">
					<Flow canvas={false} orientation="vertical">
						<Flow.Node>Build</Flow.Node>
						<Flow.Parallel>
							<Flow.Node>Unit tests</Flow.Node>
							<Flow.Node>CSS checks</Flow.Node>
						</Flow.Parallel>
						<Flow.Node>Deploy</Flow.Node>
					</Flow>
				</ShowcaseGroup>
			</div>
		</ShowcaseSection>
	)
}
