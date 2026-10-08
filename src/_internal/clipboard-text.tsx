import { CheckIcon, CopyIcon, Loader2Icon, AlertCircleIcon } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, type ReactElement } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { buttonVariants } from './button'
import { cn, GROUP_FOCUS_RING } from '../lib/utils'

export type ClipboardTextStatus = 'idle' | 'copying' | 'copied' | 'error'
export type ClipboardTextSize = 'sm' | 'default' | 'lg'
export interface ClipboardTextRootProps extends ComponentPropsWithoutRef<'div'> {
	text: string
	size?: ClipboardTextSize
	status?: ClipboardTextStatus
	disabled?: boolean
	copyLabel?: string
	textLabel?: string
	statusText?: string
	onCopyClick?: () => void
	/** Wrapper for the copy button, for example a tooltip. */
	renderCopyButton?: (button: ReactElement) => ReactNode
}
const heights = {
	sm: 'h-(--clipboard-text-height-sm)',
	default: 'h-(--clipboard-text-height)',
	lg: 'h-(--clipboard-text-height-lg)',
}

export const ClipboardTextRoot = forwardRef<HTMLDivElement, ClipboardTextRootProps>(
	function ClipboardTextRoot(
		{
			text,
			size = 'default',
			status = 'idle',
			disabled,
			copyLabel = 'Copy to clipboard',
			textLabel = 'Text to copy',
			statusText = '',
			onCopyClick,
			renderCopyButton,
			className,
			...props
		},
		ref,
	) {
		const Icon =
			status === 'copied'
				? CheckIcon
				: status === 'copying'
					? Loader2Icon
					: status === 'error'
						? AlertCircleIcon
						: CopyIcon
		const button = (
			<ButtonPrimitive
				type="button"
				disabled={disabled}
				aria-label={copyLabel}
				aria-busy={status === 'copying' || undefined}
				onClick={onCopyClick}
				className={cn(buttonVariants({ size: 'icon-sm', variant: 'ghost' }), 'me-1 shrink-0')}
			>
				<Icon
					aria-hidden="true"
					className={cn(
						'size-4',
						status === 'copying' && 'animate-spin motion-reduce:animate-none',
						status === 'copied' && 'text-success',
						status === 'error' && 'text-critical',
					)}
				/>
			</ButtonPrimitive>
		)
		return (
			<div
				ref={ref}
				data-slot="clipboard-text"
				data-size={size}
				data-status={status}
				className={cn(
					'flex min-w-0 items-center rounded-(--clipboard-text-radius) border border-stroke-input bg-surface-field text-default',
					GROUP_FOCUS_RING,
					heights[size],
					disabled && 'opacity-disabled',
					className,
				)}
				{...props}
			>
				<input
					data-slot="clipboard-text-value"
					value={text}
					readOnly
					disabled={disabled}
					aria-label={textLabel}
					className="h-full min-w-0 flex-1 truncate bg-transparent px-3 font-mono text-sm outline-none"
				/>
				{renderCopyButton ? renderCopyButton(button) : button}
				<span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
					{statusText}
				</span>
			</div>
		)
	},
)
