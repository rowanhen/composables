import type React from 'react'
import {
	AIChainOfThoughtShowcase,
	AIConfirmationShowcase,
	AIConversationShowcase,
	AIFullChatShowcase,
	AIMessageShowcase,
	AIPlanShowcase,
	AIPromptInputShowcase,
	AIReasoningShowcase,
	AIShimmerShowcase,
	AISourcesShowcase,
	AISuggestionShowcase,
	AITaskShowcase,
	AIToolShowcase,
} from './components'
import { aiElementPageMeta, type AIElementSlug } from './ai-elements-pages'

const aiElementComponents = {
	message: AIMessageShowcase,
	conversation: AIConversationShowcase,
	'prompt-input': AIPromptInputShowcase,
	suggestions: AISuggestionShowcase,
	shimmer: AIShimmerShowcase,
	reasoning: AIReasoningShowcase,
	sources: AISourcesShowcase,
	plan: AIPlanShowcase,
	task: AITaskShowcase,
	tool: AIToolShowcase,
	'chain-of-thought': AIChainOfThoughtShowcase,
	confirmation: AIConfirmationShowcase,
	'full-chat': AIFullChatShowcase,
} satisfies Record<AIElementSlug, React.ComponentType>

export const aiElementPages = aiElementPageMeta.map((page) => ({
	...page,
	Component: aiElementComponents[page.slug],
}))

export const aiElementPagesBySlug = Object.fromEntries(
	aiElementPages.map((page) => [page.slug, page]),
) as {
	[Slug in AIElementSlug]: Extract<(typeof aiElementPages)[number], { slug: Slug }>
}
