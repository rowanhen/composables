/**
 * CodeBlock
 * ─────────────────────────────────────────────────────────────────────────────
 * Monospace code display with line numbers and overflow scrolling.
 * Uses composables semantic tokens (bg-muted / bg-background) rather than
 * raw CSS variable references from dockets.
 *
 * Usage:
 *   <CodeBlock>{`const x = 1\nconsole.log(x)`}</CodeBlock>
 */

import * as React from 'react'
import { cn, leftPad } from '@/lib/utils'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
	({ children, className, ...props }, ref) => {
		return (
			<pre
				data-slot="code-block"
				ref={ref}
				className={cn(
					'block font-mono text-xs font-normal overflow-auto bg-muted scrollbar-none',
					className,
				)}
				{...props}
			>
				{String(children)
					.split('\n')
					.map((line, index) => (
						<div key={index} className="flex justify-between items-start">
							<span className="inline-flex w-[3ch] text-right pr-[1ch] select-none bg-background text-muted-foreground opacity-50">
								{leftPad(String(index + 1), 3)}
							</span>
							<span className="min-w-[10%] w-full whitespace-pre bg-muted pl-[2ch] text-foreground">
								{line}
							</span>
						</div>
					))}
			</pre>
		)
	},
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
