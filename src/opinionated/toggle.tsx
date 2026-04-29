import type { Toggle as TogglePrimitiveType } from '@base-ui/react/toggle'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { Toggle as TogglePrimitive, type toggleVariants } from '../_internal/toggle'

export interface ToggleProps extends Omit<TogglePrimitiveType.Props, 'size' | 'variant'> {
	/**
	 * Visual style variant
	 * @default 'default'
	 */
	variant?: VariantProps<typeof toggleVariants>['variant']
	/**
	 * Size of the toggle
	 * @default 'default'
	 */
	size?: VariantProps<typeof toggleVariants>['size']
	/**
	 * Icon to display on the left side
	 */
	leftIcon?: React.ReactNode
	/**
	 * Icon to display on the right side
	 */
	rightIcon?: React.ReactNode
	/**
	 * Children content (text label)
	 */
	children?: React.ReactNode
}

/**
 * Opinionated Toggle component with sensible defaults and common patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Toggle pressed={isActive} onPressedChange={setIsActive}>
 *   Toggle me
 * </Toggle>
 *
 * // With icons
 * <Toggle
 *   pressed={isBold}
 *   onPressedChange={setIsBold}
 *   leftIcon={<BoldIcon />}
 *   variant="outline"
 * >
 *   Bold
 * </Toggle>
 *
 * // Small size
 * <Toggle pressed={isActive} onPressedChange={setIsActive} size="sm">
 *   Small
 * </Toggle>
 * ```
 */
function Toggle({
	variant = 'default',
	size = 'default',
	leftIcon,
	rightIcon,
	children,
	...props
}: ToggleProps) {
	return (
		<TogglePrimitive variant={variant} size={size} {...props}>
			{leftIcon && <span className="inline-flex items-center">{leftIcon}</span>}
			{children && <span>{children}</span>}
			{rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
		</TogglePrimitive>
	)
}

export { Toggle }
