export const aiElementPageMeta = [
	{
		slug: 'message',
		path: '/ai-elements/message',
		title: 'Message',
		description: 'AI message layout with markdown response rendering and action toolbars.',
	},
	{
		slug: 'conversation',
		path: '/ai-elements/conversation',
		title: 'Conversation',
		description: 'Scrollable chat containers with empty states and jump-to-latest controls.',
	},
	{
		slug: 'prompt-input',
		path: '/ai-elements/prompt-input',
		title: 'Prompt input',
		description: 'Composer layout with textarea, tools, and submit affordances.',
	},
	{
		slug: 'suggestions',
		path: '/ai-elements/suggestions',
		title: 'Suggestions',
		description: 'Suggested prompts and follow-up actions for AI conversations.',
	},
	{
		slug: 'shimmer',
		path: '/ai-elements/shimmer',
		title: 'Shimmer',
		description: 'Animated inline thinking and generation text.',
	},
	{
		slug: 'reasoning',
		path: '/ai-elements/reasoning',
		title: 'Reasoning',
		description: 'Collapsible reasoning summaries with streaming and completed states.',
	},
	{
		slug: 'sources',
		path: '/ai-elements/sources',
		title: 'Sources',
		description: 'Citation disclosure for response references.',
	},
	{
		slug: 'plan',
		path: '/ai-elements/plan',
		title: 'Plan',
		description: 'Structured plans with headers, descriptions, actions, and collapsible content.',
	},
	{
		slug: 'task',
		path: '/ai-elements/task',
		title: 'Task',
		description: 'Task progress rows with nested result details and files.',
	},
	{
		slug: 'tool',
		path: '/ai-elements/tool',
		title: 'Tool',
		description: 'Tool invocation panels with input, output, and error states.',
	},
	{
		slug: 'chain-of-thought',
		path: '/ai-elements/chain-of-thought',
		title: 'Chain of thought',
		description: 'Step-by-step AI activity timelines and search result details.',
	},
	{
		slug: 'confirmation',
		path: '/ai-elements/confirmation',
		title: 'Confirmation',
		description: 'Approval request surfaces with accepted and rejected states.',
	},
	{
		slug: 'full-chat',
		path: '/ai-elements/full-chat',
		title: 'Full chat',
		description:
			'A composed conversation using messages, reasoning, sources, suggestions, and input.',
	},
] as const

export type AIElementPageMeta = (typeof aiElementPageMeta)[number]
export type AIElementSlug = AIElementPageMeta['slug']
