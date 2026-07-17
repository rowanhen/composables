import type { useRender } from '@base-ui/react/use-render'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { Badge as BadgePrimitive, type badgeVariants } from '../_internal/badge'

/**
 * Props for the opinionated Badge component.
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">v1.2.3</Badge>
 * ```
 */
export interface BadgeProps extends Omit<useRender.ComponentProps<'span'>, 'size'> {
	/** Visual style variant. @default 'default' */
	variant?: VariantProps<typeof badgeVariants>['variant']
	/** Corner shape. 'pill' forces full rounding regardless of theme. @default 'default' */
	shape?: VariantProps<typeof badgeVariants>['shape']
	className?: string
	children: React.ReactNode
}

function Badge({
	variant = 'default',
	shape = 'default',
	className,
	children,
	render,
	...badgeProps
}: BadgeProps) {
	return (
		<BadgePrimitive
			variant={variant}
			shape={shape}
			className={className}
			render={render}
			{...badgeProps}
		>
			{children}
		</BadgePrimitive>
	)
}

export { Badge }
