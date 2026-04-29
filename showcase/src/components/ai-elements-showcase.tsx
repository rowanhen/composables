// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { useState, useCallback } from 'react'
import { Grid } from '@/components/_internal/grid'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'

import {
	Message,
	MessageContent,
	MessageActions,
	MessageAction,
	MessageResponse,
	MessageToolbar,
} from '@/components/_internal/ai-elements/message'
import {
	Conversation,
	ConversationContent,
	ConversationEmptyState,
	ConversationScrollButton,
} from '@/components/_internal/ai-elements/conversation'
import {
	PromptInput,
	PromptInputTextarea,
	PromptInputFooter,
	PromptInputTools,
	PromptInputButton,
	PromptInputSubmit,
} from '@/components/_internal/ai-elements/prompt-input'
import {
	Reasoning,
	ReasoningTrigger,
	ReasoningContent,
} from '@/components/_internal/ai-elements/reasoning'
import { Suggestions, Suggestion } from '@/components/_internal/ai-elements/suggestion'
import {
	Tool,
	ToolHeader,
	ToolContent,
	ToolInput,
	ToolOutput,
} from '@/components/_internal/ai-elements/tool'
import {
	Plan,
	PlanHeader,
	PlanTitle,
	PlanDescription,
	PlanAction,
	PlanContent,
	PlanTrigger,
} from '@/components/_internal/ai-elements/plan'
import {
	Task,
	TaskTrigger,
	TaskContent,
	TaskItem,
	TaskItemFile,
} from '@/components/_internal/ai-elements/task'
import {
	ChainOfThought,
	ChainOfThoughtHeader,
	ChainOfThoughtStep,
	ChainOfThoughtContent,
	ChainOfThoughtSearchResults,
	ChainOfThoughtSearchResult,
} from '@/components/_internal/ai-elements/chain-of-thought'
import {
	Sources,
	SourcesTrigger,
	SourcesContent,
	Source,
} from '@/components/_internal/ai-elements/sources'
import {
	Confirmation,
	ConfirmationTitle,
	ConfirmationRequest,
	ConfirmationAccepted,
	ConfirmationRejected,
	ConfirmationActions,
	ConfirmationAction,
} from '@/components/_internal/ai-elements/confirmation'
import { Shimmer } from '@/components/_internal/ai-elements/shimmer'

import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, RefreshCwIcon, PaperclipIcon } from 'lucide-react'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

// ── Message Showcase ──────────────────────────────────────────────────────

function MessageShowcase() {
	return (
		<ShowcaseGroup label="Message">
			<div className="max-w-2xl rounded-lg border border-stroke/40 p-4">
				<VStack gap={6}>
					<Message from="user">
						<MessageContent>
							<p>Can you explain how React Server Components work?</p>
						</MessageContent>
					</Message>

					<Message from="assistant">
						<MessageContent>
							<MessageResponse>
								{`React Server Components (RSC) let you render components **on the server** without sending their JavaScript to the client.\n\nKey benefits:\n- **Smaller bundles** — server-only code never reaches the browser\n- **Direct data access** — query databases without API routes\n- **Streaming** — progressively send UI as data resolves`}
							</MessageResponse>
						</MessageContent>
						<MessageToolbar>
							<MessageActions>
								<MessageAction tooltip="Copy">
									<CopyIcon className="size-3.5" />
								</MessageAction>
								<MessageAction tooltip="Like">
									<ThumbsUpIcon className="size-3.5" />
								</MessageAction>
								<MessageAction tooltip="Dislike">
									<ThumbsDownIcon className="size-3.5" />
								</MessageAction>
								<MessageAction tooltip="Regenerate">
									<RefreshCwIcon className="size-3.5" />
								</MessageAction>
							</MessageActions>
						</MessageToolbar>
					</Message>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Conversation Showcase ─────────────────────────────────────────────────

function ConversationShowcase() {
	return (
		<ShowcaseGroup label="Conversation">
			<div
				className="max-w-2xl rounded-lg border border-stroke/40 overflow-hidden"
				style={{ height: 280 }}
			>
				<Conversation>
					<ConversationContent>
						<ConversationEmptyState
							title="How can I help?"
							description="Ask me anything about your codebase"
						/>
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
			</div>
		</ShowcaseGroup>
	)
}

// ── Prompt Input Showcase ─────────────────────────────────────────────────

function PromptInputShowcase() {
	const handleSubmit = useCallback(() => {
		// no-op for demo
	}, [])

	return (
		<ShowcaseGroup label="Prompt Input">
			<div className="max-w-2xl">
				<PromptInput onSubmit={handleSubmit}>
					<PromptInputTextarea placeholder="Ask anything..." />
					<PromptInputFooter>
						<PromptInputTools>
							<PromptInputButton tooltip="Attach file">
								<PaperclipIcon className="size-4" />
							</PromptInputButton>
						</PromptInputTools>
						<PromptInputSubmit />
					</PromptInputFooter>
				</PromptInput>
			</div>
		</ShowcaseGroup>
	)
}

// ── Suggestion Showcase ───────────────────────────────────────────────────

function SuggestionShowcase() {
	return (
		<ShowcaseGroup label="Suggestions">
			<div className="max-w-2xl">
				<Suggestions>
					<Suggestion suggestion="What is React?" />
					<Suggestion suggestion="Explain TypeScript generics" />
					<Suggestion suggestion="How do design tokens work?" />
					<Suggestion suggestion="Write a unit test" />
				</Suggestions>
			</div>
		</ShowcaseGroup>
	)
}

// ── Reasoning Showcase ────────────────────────────────────────────────────

function ReasoningShowcase() {
	return (
		<ShowcaseGroup label="Reasoning">
			<div className="max-w-2xl">
				<VStack gap={4}>
					<Typography variant="caption-100" className="text-muted-foreground">
						Completed (auto-collapsed)
					</Typography>
					<Reasoning isStreaming={false} defaultOpen={false} duration={12}>
						<ReasoningTrigger />
						<ReasoningContent>
							{`The user is asking about server components. I need to explain the concept clearly, covering the key benefits and how they differ from client components. Let me structure this as a brief overview with bullet points.`}
						</ReasoningContent>
					</Reasoning>

					<Typography variant="caption-100" className="text-muted-foreground">
						Expanded
					</Typography>
					<Reasoning isStreaming={false} defaultOpen={true} duration={8}>
						<ReasoningTrigger />
						<ReasoningContent>
							{`Let me think about the best way to explain design tokens. I should cover the three-tier model: primitives, semantic tokens, and component tokens. I'll use examples from the existing system.`}
						</ReasoningContent>
					</Reasoning>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Tool Showcase ─────────────────────────────────────────────────────────

function ToolShowcase() {
	return (
		<ShowcaseGroup label="Tool Invocation">
			<div className="max-w-2xl">
				<VStack gap={4}>
					<Tool defaultOpen>
						<ToolHeader type="tool-invocation-searchDocs" state="output-available" />
						<ToolContent>
							<ToolInput input={{ query: 'React Server Components', limit: 5 }} />
							<ToolOutput
								output={{ results: [{ title: 'RSC Overview', score: 0.95 }] }}
								errorText={undefined}
							/>
						</ToolContent>
					</Tool>

					<Tool>
						<ToolHeader type="tool-invocation-runTests" state="output-error" />
						<ToolContent>
							<ToolInput input={{ suite: 'unit', filter: '*.test.ts' }} />
							<ToolOutput output={undefined} errorText="Process exited with code 1" />
						</ToolContent>
					</Tool>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Plan Showcase ─────────────────────────────────────────────────────────

function PlanShowcase() {
	return (
		<ShowcaseGroup label="Plan">
			<div className="max-w-2xl">
				<Plan defaultOpen>
					<PlanHeader>
						<div>
							<PlanTitle>Refactor authentication module</PlanTitle>
							<PlanDescription>3 steps to complete the migration</PlanDescription>
						</div>
						<PlanAction>
							<PlanTrigger />
						</PlanAction>
					</PlanHeader>
					<PlanContent>
						<VStack gap={2} className="text-sm text-muted-foreground">
							<p>1. Extract session logic into a shared utility</p>
							<p>2. Replace legacy middleware with new auth handler</p>
							<p>3. Update integration tests</p>
						</VStack>
					</PlanContent>
				</Plan>
			</div>
		</ShowcaseGroup>
	)
}

// ── Task Showcase ─────────────────────────────────────────────────────────

function TaskShowcase() {
	return (
		<ShowcaseGroup label="Task">
			<div className="max-w-2xl">
				<VStack gap={4}>
					<Task defaultOpen>
						<TaskTrigger title="Searching for authentication utilities" />
						<TaskContent>
							<TaskItem>Found 3 files matching the query</TaskItem>
							<HStack gap={2} className="flex-wrap">
								<TaskItemFile>src/lib/auth.ts</TaskItemFile>
								<TaskItemFile>src/middleware/session.ts</TaskItemFile>
								<TaskItemFile>src/hooks/use-auth.ts</TaskItemFile>
							</HStack>
						</TaskContent>
					</Task>

					<Task>
						<TaskTrigger title="Running test suite" />
						<TaskContent>
							<TaskItem>12 tests passed, 0 failed</TaskItem>
						</TaskContent>
					</Task>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Chain of Thought Showcase ─────────────────────────────────────────────

function ChainOfThoughtShowcase() {
	return (
		<ShowcaseGroup label="Chain of Thought">
			<div className="max-w-2xl">
				<ChainOfThought defaultOpen>
					<ChainOfThoughtHeader>Analyzing the question...</ChainOfThoughtHeader>
					<ChainOfThoughtContent>
						<ChainOfThoughtStep label="Searching documentation" status="complete" />
						<ChainOfThoughtStep label="Found relevant results" status="complete">
							<ChainOfThoughtSearchResults>
								<ChainOfThoughtSearchResult>React docs</ChainOfThoughtSearchResult>
								<ChainOfThoughtSearchResult>Next.js guide</ChainOfThoughtSearchResult>
								<ChainOfThoughtSearchResult>MDN Web APIs</ChainOfThoughtSearchResult>
							</ChainOfThoughtSearchResults>
						</ChainOfThoughtStep>
						<ChainOfThoughtStep label="Composing response" status="active" />
					</ChainOfThoughtContent>
				</ChainOfThought>
			</div>
		</ShowcaseGroup>
	)
}

// ── Sources Showcase ──────────────────────────────────────────────────────

function SourcesShowcase() {
	return (
		<ShowcaseGroup label="Sources">
			<div className="max-w-2xl">
				<Sources>
					<SourcesTrigger count={3} />
					<SourcesContent>
						<Source href="https://react.dev" title="React Documentation" />
						<Source href="https://nextjs.org/docs" title="Next.js Documentation" />
						<Source href="https://developer.mozilla.org" title="MDN Web Docs" />
					</SourcesContent>
				</Sources>
			</div>
		</ShowcaseGroup>
	)
}

// ── Confirmation Showcase ─────────────────────────────────────────────────

function ConfirmationShowcase() {
	const [approval1, setApproval1] = useState<{ id: string; approved?: boolean } | undefined>({
		id: 'demo-1',
	})
	const [state1, setState1] = useState<'approval-requested' | 'approval-responded'>(
		'approval-requested',
	)

	return (
		<ShowcaseGroup label="Confirmation">
			<div className="max-w-2xl">
				<VStack gap={4}>
					<Typography variant="caption-100" className="text-muted-foreground">
						Pending approval
					</Typography>
					<Confirmation approval={approval1} state={state1}>
						<ConfirmationTitle>Run database migration on production?</ConfirmationTitle>
						<ConfirmationRequest>
							<ConfirmationActions>
								<ConfirmationAction
									variant="default"
									onClick={() => {
										setApproval1({ id: 'demo-1', approved: true })
										setState1('approval-responded')
									}}
								>
									Approve
								</ConfirmationAction>
								<ConfirmationAction
									variant="outline"
									onClick={() => {
										setApproval1({ id: 'demo-1', approved: false })
										setState1('approval-responded')
									}}
								>
									Reject
								</ConfirmationAction>
							</ConfirmationActions>
						</ConfirmationRequest>
						<ConfirmationAccepted>
							<Typography variant="body-100" className="text-success">
								Migration approved and running.
							</Typography>
						</ConfirmationAccepted>
						<ConfirmationRejected>
							<Typography variant="body-100" className="text-critical">
								Migration rejected.
							</Typography>
						</ConfirmationRejected>
					</Confirmation>

					<Typography variant="caption-100" className="text-muted-foreground">
						Already approved
					</Typography>
					<Confirmation approval={{ id: 'demo-2', approved: true }} state="approval-responded">
						<ConfirmationTitle>Delete temporary files?</ConfirmationTitle>
						<ConfirmationAccepted>
							<Typography variant="body-100" className="text-success">
								Approved — files cleaned up.
							</Typography>
						</ConfirmationAccepted>
					</Confirmation>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Shimmer Showcase ──────────────────────────────────────────────────────

function ShimmerShowcase() {
	return (
		<ShowcaseGroup label="Shimmer">
			<div className="max-w-2xl">
				<VStack gap={3}>
					<Shimmer duration={1.5}>Thinking...</Shimmer>
					<Shimmer duration={2}>Generating response...</Shimmer>
					<Shimmer duration={1}>Analyzing code...</Shimmer>
				</VStack>
			</div>
		</ShowcaseGroup>
	)
}

// ── Full Chat Demo ────────────────────────────────────────────────────────

function FullChatDemo() {
	const handleSubmit = useCallback(() => {
		// no-op for demo
	}, [])

	return (
		<ShowcaseGroup label="Full Chat Example">
			<div
				className="max-w-2xl rounded-lg border border-stroke/40 overflow-hidden flex flex-col"
				style={{ height: 520 }}
			>
				<Conversation>
					<ConversationContent>
						<Message from="user">
							<MessageContent>
								<p>How do I add dark mode to my app?</p>
							</MessageContent>
						</Message>

						<Message from="assistant">
							<Reasoning isStreaming={false} defaultOpen={false} duration={4}>
								<ReasoningTrigger />
								<ReasoningContent>
									{`The user wants to implement dark mode. I should explain the CSS custom properties approach since they're using a design token system.`}
								</ReasoningContent>
							</Reasoning>
							<MessageContent>
								<MessageResponse>
									{`Here's how to add dark mode using CSS custom properties:\n\n1. **Define tokens** for both light and dark themes\n2. **Toggle a class** (e.g. \`.dark\`) on the root element\n3. **Use semantic tokens** like \`bg-page\` and \`text-foreground\` that automatically switch\n\nYour design system already handles this — just add the \`.dark\` class to your \`<html>\` element.`}
								</MessageResponse>
							</MessageContent>
							<Sources>
								<SourcesTrigger count={2} />
								<SourcesContent>
									<Source href="#" title="Tailwind CSS Dark Mode" />
									<Source href="#" title="Design Tokens Guide" />
								</SourcesContent>
							</Sources>
							<MessageToolbar>
								<MessageActions>
									<MessageAction tooltip="Copy">
										<CopyIcon className="size-3.5" />
									</MessageAction>
									<MessageAction tooltip="Like">
										<ThumbsUpIcon className="size-3.5" />
									</MessageAction>
								</MessageActions>
							</MessageToolbar>
						</Message>
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>

				<div className="border-t border-stroke/40 p-3">
					<Suggestions className="mb-3">
						<Suggestion suggestion="Show me an example" />
						<Suggestion suggestion="What about system preference?" />
					</Suggestions>
					<PromptInput onSubmit={handleSubmit}>
						<PromptInputTextarea placeholder="Follow up..." />
						<PromptInputFooter>
							<PromptInputTools>
								<PromptInputButton tooltip="Attach">
									<PaperclipIcon className="size-4" />
								</PromptInputButton>
							</PromptInputTools>
							<PromptInputSubmit />
						</PromptInputFooter>
					</PromptInput>
				</div>
			</div>
		</ShowcaseGroup>
	)
}

// ── Main Export ────────────────────────────────────────────────────────────

export function AIElementsShowcase() {
	return (
		<ShowcaseSection
			title="AI Elements"
			description="Chatbot and AI-native components powered by Vercel AI SDK integration."
		>
			<VStack gap={10}>
				<Grid columns={1} gap={10} className="lg:grid-cols-2">
					<MessageShowcase />
					<ConversationShowcase />
				</Grid>
				<PromptInputShowcase />
				<SuggestionShowcase />
				<ShimmerShowcase />
				<Grid columns={1} gap={10} className="lg:grid-cols-2">
					<ReasoningShowcase />
					<SourcesShowcase />
				</Grid>
				<Grid columns={1} gap={10} className="lg:grid-cols-2">
					<PlanShowcase />
					<TaskShowcase />
				</Grid>
				<ToolShowcase />
				<ChainOfThoughtShowcase />
				<ConfirmationShowcase />
				<FullChatDemo />
			</VStack>
		</ShowcaseSection>
	)
}
