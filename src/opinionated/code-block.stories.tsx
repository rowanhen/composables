import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { CodeBlock } from '../_internal/code-block'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Data/Code block',
	parameters: {
		docs: {
			description: { component: 'Syntax-highlighted code surfaces.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const TYPESCRIPT_EXAMPLE = `
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
export function Button({
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}`
const JSON_EXAMPLE = `{
  "name": "@leitware/composables",
  "version": "0.1.0",
  "dependencies": {
    "@base-ui/react": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "lucide-react": "^0.577.0"
  }
}`

export const TypeScript: Story = {
	render: () => (
		<Gallery>
			<Group label="TypeScript">
				<div className="w-full min-w-0 max-w-2xl">
					<CodeBlock>{TYPESCRIPT_EXAMPLE}</CodeBlock>
				</div>
			</Group>
		</Gallery>
	),
}

export const JSON: Story = {
	render: () => (
		<Gallery>
			<Group label="JSON">
				<div className="w-full min-w-0 max-w-lg">
					<CodeBlock>{JSON_EXAMPLE}</CodeBlock>
				</div>
			</Group>
		</Gallery>
	),
}

export const InlineShortSnippet: Story = {
	name: 'Inline / short snippet',
	render: () => (
		<Gallery>
			<Group label="Inline / short snippet">
				<div className="w-full min-w-0 max-w-xs">
					<CodeBlock>{`npm install @leitware/composables`}</CodeBlock>
				</div>
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
