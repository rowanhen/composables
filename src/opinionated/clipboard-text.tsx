import {
	forwardRef,
	useEffect,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type ReactNode,
	type ReactElement,
} from 'react'
import {
	ClipboardTextRoot,
	type ClipboardTextStatus,
	type ClipboardTextSize,
} from '../_internal/clipboard-text'
import { Tooltip, TooltipContent, TooltipTrigger } from '../_internal/tooltip'
import { copyText } from '../lib/clipboard'

export interface ClipboardTextProps extends Omit<
	ComponentPropsWithoutRef<'div'>,
	'onCopy' | 'children'
> {
	text: string
	/** The actual value to copy when the display is masked or shortened. */
	textToCopy?: string
	size?: ClipboardTextSize
	disabled?: boolean
	onCopy?: (value: string) => void
	onCopyError?: (error: Error) => void
	/** How long success/error feedback remains, in milliseconds. @default 1500 */
	feedbackDuration?: number
	tooltip?:
		| boolean
		| {
				text?: ReactNode
				copiedText?: ReactNode
				errorText?: ReactNode
				side?: 'top' | 'bottom' | 'left' | 'right'
		  }
	labels?: { copyAction?: string; copied?: string; copyError?: string; text?: string }
}

export const ClipboardText = forwardRef<HTMLDivElement, ClipboardTextProps>(function ClipboardText(
	{
		text,
		textToCopy,
		size = 'default',
		disabled,
		onCopy,
		onCopyError,
		feedbackDuration = 1500,
		tooltip = true,
		labels,
		...props
	},
	ref,
) {
	const [status, setStatus] = useState<ClipboardTextStatus>('idle')
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const operation = useRef(0)
	const mounted = useRef(false)
	useEffect(() => {
		mounted.current = true
		operation.current++
		const clearFeedback = () => {
			if (timer.current) clearTimeout(timer.current)
		}
		return () => {
			mounted.current = false
			clearFeedback()
		}
	}, [])
	useEffect(() => {
		operation.current++
		if (timer.current) clearTimeout(timer.current)
		setStatus('idle')
	}, [text, textToCopy])
	const copy = async () => {
		if (disabled) return
		const current = ++operation.current
		const value = textToCopy ?? text
		if (timer.current) clearTimeout(timer.current)
		setStatus('copying')
		let failure: Error | undefined
		try {
			await copyText(value)
		} catch (error) {
			failure = error instanceof Error ? error : new Error(String(error))
		}
		if (!mounted.current || operation.current !== current) return
		setStatus(failure ? 'error' : 'copied')
		timer.current = setTimeout(
			() => {
				setStatus('idle')
				timer.current = null
			},
			Math.max(0, feedbackDuration),
		)
		if (failure) onCopyError?.(failure)
		else onCopy?.(value)
	}
	const config = typeof tooltip === 'object' ? tooltip : {}
	const copyLabel = labels?.copyAction ?? 'Copy to clipboard'
	const copiedLabel = labels?.copied ?? 'Copied to clipboard'
	const errorLabel = labels?.copyError ?? 'Could not copy. Select the text and copy it manually.'
	const renderCopyButton = tooltip
		? (button: ReactElement) => (
				<Tooltip>
					<TooltipTrigger render={button} />
					<TooltipContent side={config.side ?? 'top'}>
						{status === 'copied'
							? (config.copiedText ?? 'Copied!')
							: status === 'error'
								? (config.errorText ?? 'Unable to copy')
								: (config.text ?? 'Copy')}
					</TooltipContent>
				</Tooltip>
			)
		: undefined
	return (
		<ClipboardTextRoot
			ref={ref}
			text={text}
			size={size}
			status={status}
			disabled={disabled}
			copyLabel={status === 'copied' ? copiedLabel : copyLabel}
			textLabel={labels?.text ?? 'Text to copy'}
			statusText={status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : ''}
			onCopyClick={copy}
			renderCopyButton={renderCopyButton}
			{...props}
		/>
	)
})
export type { ClipboardTextSize, ClipboardTextStatus } from '../_internal/clipboard-text'
