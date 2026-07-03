/**
 * CodeBlock
 * ─────────────────────────────────────────────────────────────────────────────
 * Monospace code display with line numbers and overflow scrolling.
 * Uses composables semantic tokens (bg-muted / bg-page) rather than
 * raw CSS variable references.
 *
 * Usage:
 *   <CodeBlock>{`const x = 1\nconsole.log(x)`}</CodeBlock>
 */

import * as React from 'react'
import { cn, FOCUS_RING, leftPad } from '../lib/utils'

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, 'children'> {
	children: string | number
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
	({ children, className, ...props }, ref) => {
		return (
			<pre
				data-slot="code-block"
				ref={ref}
				className={cn(
					'block w-full max-w-full min-w-0 overflow-auto bg-muted font-mono text-sm font-normal scrollbar-none rounded-lg border border-[length:var(--border-width)] border-stroke focus-visible:outline-none',
					FOCUS_RING,
					className,
				)}
				{...props}
			>
				{String(children)
					.split('\n')
					.map((line, index) => (
						<div key={index} className="flex min-w-max items-start">
							<span
								aria-hidden="true"
								className="inline-flex w-[3ch] shrink-0 select-none bg-page pr-[1ch] text-right text-muted-foreground"
							>
								{leftPad(String(index + 1), 3)}
							</span>
							<span className="min-w-[10%] whitespace-pre bg-muted pl-[2ch] text-foreground">
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
