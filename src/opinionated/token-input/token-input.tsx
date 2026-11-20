'use client'

import type { ComponentProps } from 'react'
import {
	TokenInput as Root,
	TokenInputEditor,
	TokenInputToken,
	TokenInputTokenRemove,
	createTokenInputController,
	defaultCodec,
	fromText,
	toLabel,
	toText,
} from '../../components/keyframery/token-input'

export type TokenInputProps = ComponentProps<typeof Root> & {
	editorProps?: ComponentProps<typeof TokenInputEditor>
}

export function TokenInput({ editorProps, children, ...props }: TokenInputProps) {
	return <Root {...props}>{children ?? <TokenInputEditor {...editorProps} />}</Root>
}

export {
	TokenInputEditor,
	TokenInputToken,
	TokenInputTokenRemove,
	createTokenInputController,
	defaultCodec,
	fromText,
	toLabel,
	toText,
}
