import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { Button as ButtonPrimitive, type buttonVariants } from '../_internal/button'
import { Spinner } from '../_internal/spinner'
import { cn } from '../lib/utils'

/**
 * Props for the opinionated Button component.
 *
 * @example
 * ```tsx
 * <Button>Save</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button loading>Submitting...</Button>
 * <Button variant="destructive" type="submit">Delete</Button>
 * ```
 */
export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'size'> {
	/** Render the button as another element, such as a link. */
	render?: React.ReactElement
	/** Visual style variant. @default 'default' */
	variant?: VariantProps<typeof buttonVariants>['variant']
	/** Size variant. @default 'default' */
	size?: VariantProps<typeof buttonVariants>['size']
	/** Corner shape. 'pill' is fully rounded - circular for icon sizes. @default 'default' */
	shape?: VariantProps<typeof buttonVariants>['shape']
	className?: string
	/** Disables the button and prevents interaction. @default false */
	disabled?: boolean
	/** Shows a spinner and disables the button. Replaces children while active. @default false */
	loading?: boolean
	/** HTML button type attribute. @default 'button' */
	type?: 'button' | 'submit' | 'reset'
	children: React.ReactNode
}

function Button({
	variant = 'default',
	size = 'default',
	shape = 'default',
	className,
	disabled = false,
	loading = false,
	type = 'button',
	children,
	...buttonProps
}: ButtonProps) {
	const isDisabled = disabled || loading

	return (
		<ButtonPrimitive
			variant={variant}
			size={size}
			shape={shape}
			className={cn(loading && 'relative', className)}
			disabled={isDisabled}
			aria-busy={loading || undefined}
			type={type}
			{...buttonProps}
		>
			{loading ? (
				<>
					{/* Keep the label in flow so the button holds its width. */}
					<span className="invisible inline-flex items-center gap-1">{children}</span>
					<Spinner className="absolute inset-0 m-auto" />
				</>
			) : (
				children
			)}
		</ButtonPrimitive>
	)
}

export { Button }
