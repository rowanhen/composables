import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../_internal/accordion'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Content/Accordion',
	component: Accordion,
	parameters: {
		docs: {
			description: { component: 'Expandable disclosure sections and grouped content.' },
		},
	},
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const faqItems = [
	{
		q: 'What is Composables?',
		a: 'A React component library built on Base UI and Tailwind CSS v4, designed for copy-paste composition.',
	},
	{
		q: 'How do I install components?',
		a: 'Install the package: npm install @leitware/composables. Then import components directly.',
	},
	{
		q: 'Does it support dark mode?',
		a: 'Yes. Add the .dark class to your html element and all semantic tokens swap automatically.',
	},
]

export const DefaultBordered: Story = {
	name: 'Default (bordered)',
	render: () => (
		<Gallery>
			<Group label="Default (bordered)">
				<Accordion>
					{faqItems.map(({ q, a }) => (
						<AccordionItem key={q}>
							<AccordionTrigger>{q}</AccordionTrigger>
							<AccordionContent>{a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Group>
		</Gallery>
	),
}

export const Filled: Story = {
	render: () => (
		<Gallery>
			<Group label="Filled">
				<Accordion variant="filled">
					{faqItems.map(({ q, a }) => (
						<AccordionItem key={q}>
							<AccordionTrigger>{q}</AccordionTrigger>
							<AccordionContent>{a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Group>
		</Gallery>
	),
}

export const FlushNoBorder: Story = {
	name: 'Flush (rules)',
	render: () => (
		<Gallery>
			<Group label="Flush (rules)">
				<Accordion variant="flush">
					{faqItems.map(({ q, a }) => (
						<AccordionItem key={q}>
							<AccordionTrigger>{q}</AccordionTrigger>
							<AccordionContent>{a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Group>
		</Gallery>
	),
}

export const Separated: Story = {
	render: () => (
		<Gallery>
			<Group label="Separated">
				<Accordion variant="separated">
					{faqItems.map(({ q, a }) => (
						<AccordionItem key={q}>
							<AccordionTrigger>{q}</AccordionTrigger>
							<AccordionContent>{a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}></VStack>
		</Gallery>
	),
}
