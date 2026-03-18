import type { VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import type * as React from 'react'

import { Button as ButtonPrimitive, type buttonVariants } from '@/components/_internal/button'

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'size'> {
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  className?: string
  // Button-specific props
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

function Button({
  variant = 'default',
  size = 'default',
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
      className={className}
      disabled={isDisabled}
      type={type}
      {...buttonProps}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : children}
    </ButtonPrimitive>
  )
}

export { Button }
