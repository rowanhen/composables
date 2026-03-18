import type { useRender } from '@base-ui/react/use-render'
import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { Badge as BadgePrimitive, type badgeVariants } from '@/components/_internal/badge'

export interface BadgeProps extends Omit<useRender.ComponentProps<'span'>, 'size'> {
  variant?: VariantProps<typeof badgeVariants>['variant']
  className?: string
  children: React.ReactNode
}

function Badge({ variant = 'default', className, children, render, ...badgeProps }: BadgeProps) {
  return (
    <BadgePrimitive variant={variant} className={className} render={render} {...badgeProps}>
      {children}
    </BadgePrimitive>
  )
}

export { Badge }
