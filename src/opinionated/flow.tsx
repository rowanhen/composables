import { forwardRef, type ReactNode } from 'react'
import {
	FlowRoot,
	FlowNode,
	FlowParallel,
	FlowList,
	FlowAnchor,
	type FlowRootProps,
} from '../_internal/flow'

export interface FlowStep {
	id: string
	label: ReactNode
	description?: ReactNode
	icon?: ReactNode
	disabled?: boolean
}
export interface FlowBranch {
	id: string
	/** Each branch is a sequence; branches run in parallel. */
	branches: FlowItem[][]
}
export type FlowItem = FlowStep | FlowBranch
export interface FlowProps extends FlowRootProps {
	/** Supply steps/branches for the easy API, or use the compound components. */
	steps?: FlowItem[]
}
function renderSteps(steps: FlowItem[]): ReactNode {
	return steps.map((step) =>
		'branches' in step ? (
			<FlowParallel key={step.id}>
				{step.branches.map((branch, index) => (
					<FlowList key={index}>{renderSteps(branch)}</FlowList>
				))}
			</FlowParallel>
		) : (
			<FlowNode key={step.id} id={step.id} disabled={step.disabled}>
				<div className="flex items-center gap-2">
					{step.icon && (
						<span aria-hidden="true" className="text-icon-secondary [&_svg]:size-4">
							{step.icon}
						</span>
					)}
					<div>
						<div className="font-medium">{step.label}</div>
						{step.description != null && (
							<div className="mt-1 text-xs text-content-secondary">{step.description}</div>
						)}
					</div>
				</div>
			</FlowNode>
		),
	)
}
const FlowComponent = forwardRef<HTMLDivElement, FlowProps>(function Flow(
	{ steps, children, ...props },
	ref,
) {
	return (
		<FlowRoot ref={ref} {...props}>
			{steps ? renderSteps(steps) : children}
		</FlowRoot>
	)
})
export const Flow = Object.assign(FlowComponent, {
	Root: FlowRoot,
	Node: FlowNode,
	Parallel: FlowParallel,
	List: FlowList,
	Anchor: FlowAnchor,
})
export { FlowRoot, FlowNode, FlowParallel, FlowList, FlowAnchor }
export type { FlowRootProps, FlowNodeProps, FlowAnchorProps, FlowAlign } from '../_internal/flow'
export type { FlowOrientation } from '../lib/flow'
