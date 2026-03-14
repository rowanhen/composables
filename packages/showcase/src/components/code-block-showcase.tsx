import { CodeBlock } from '@/components/ui/code-block'
import { VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

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
        <VStack gap={2}>
          <Typography variant="heading-200">TypeScript</Typography>
          <div className="max-w-2xl">
            <CodeBlock>{TYPESCRIPT_EXAMPLE}</CodeBlock>
          </div>
        </VStack>

        <VStack gap={2}>
          <Typography variant="heading-200">JSON</Typography>
          <div className="max-w-lg">
            <CodeBlock>{JSON_EXAMPLE}</CodeBlock>
          </div>
        </VStack>

        <VStack gap={2}>
          <Typography variant="heading-200">Inline / short snippet</Typography>
          <div className="max-w-xs">
            <CodeBlock>{`npm install @leitware/composables`}</CodeBlock>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
