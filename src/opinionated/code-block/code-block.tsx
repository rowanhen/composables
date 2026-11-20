'use client'

import type { ComponentProps } from 'react'
import {
	CodeBlock as Root,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from '../../components/keyframery/code-block'

export type CodeBlockProps = Omit<ComponentProps<typeof Root>, 'children' | 'code' | 'title'> & {
	children: string | number
	title?: string
	showCopyButton?: boolean
}

export function CodeBlock({
	children,
	title,
	lineNumbers = true,
	showCopyButton = false,
	...props
}: CodeBlockProps) {
	return (
		<Root code={String(children)} lineNumbers={lineNumbers} {...props}>
			{(title || showCopyButton) && (
				<CodeBlockHeader>
					{title && <CodeBlockTitle>{title}</CodeBlockTitle>}
					{showCopyButton && (
						<CodeBlockActions>
							<CodeBlockCopyButton />
						</CodeBlockActions>
					)}
				</CodeBlockHeader>
			)}
			<CodeBlockContent />
		</Root>
	)
}
