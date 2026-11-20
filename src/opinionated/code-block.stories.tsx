import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { CodeBlock } from './code-block'

const meta = {
	title: 'Components/Code block',
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
    "@leitware/composables": "latest",
    "react": "^19.0.0"
  }
}`

export const TypeScript: Story = {
	render: () => (
		<Gallery>
			<Group label="TypeScript">
				<div className="w-full min-w-0 max-w-2xl">
					<CodeBlock language="tsx" title="button.tsx" showCopyButton>
						{TYPESCRIPT_EXAMPLE}
					</CodeBlock>
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
					<CodeBlock language="json" title="package.json">
						{JSON_EXAMPLE}
					</CodeBlock>
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
