/**
 * CodeBlock
 * ─────────────────────────────────────────────────────────────────────────────
 * Monospace code display with line numbers and overflow scrolling.
 *
 * Usage:
 *   <CodeBlock>{`const x = 1\nconsole.log(x)`}</CodeBlock>
 */

import * as React from 'react'
import { cn, leftPad } from '@/lib/utils'

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, 'children'> {
	children: string | number
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
	({ children, className, ...props }, ref) => {
		const lines = String(children).split('\n')
		// Width of the widest line number (e.g. 3 for a 100-line file)
		const lineNumWidth = String(lines.length).length

		return (
			<pre
				data-slot="code-block"
				ref={ref}
				className={cn(
					'block font-mono text-xs leading-5 font-normal overflow-auto rounded-md border border-stroke bg-muted scrollbar-none',
					className,
				)}
				{...props}
			>
				{lines.map((line, index) => (
					<div key={index} className="flex items-start">
						<span
							aria-hidden="true"
							className="inline-flex shrink-0 select-none border-r border-stroke bg-page text-right tabular-nums text-muted-foreground/60"
							// 1ch left pad + number width + 2ch right pad = comfortable gutter
							style={{ width: `${lineNumWidth + 3}ch`, paddingRight: '1ch' }}
						>
							{leftPad(String(index + 1), lineNumWidth)}
						</span>
						<span className="w-full whitespace-pre pl-[2ch] text-foreground/90">{line}</span>
					</div>
				))}
			</pre>
		)
	},
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
