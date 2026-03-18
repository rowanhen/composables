import { CodeBlock } from '@/components/_internal/code-block'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

const TYPESCRIPT_EXAMPLE = `import * as React from 'react'
import { cn } from '@/lib/utils'

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

export function CodeBlockShowcase() {
  return (
    <ShowcaseSection
      title="Code Block"
      description="Monospace code display with line numbers and horizontal overflow scrolling."
    >
      <VStack gap={6}>
        <ShowcaseGroup label="TypeScript">
          <div className="max-w-2xl">
            <CodeBlock>{TYPESCRIPT_EXAMPLE}</CodeBlock>
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="JSON">
          <div className="max-w-lg">
            <CodeBlock>{JSON_EXAMPLE}</CodeBlock>
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="Inline / short snippet">
          <div className="max-w-xs">
            <CodeBlock>{`npm install @leitware/composables`}</CodeBlock>
          </div>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
