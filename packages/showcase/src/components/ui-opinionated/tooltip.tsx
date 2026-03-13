import type { Tooltip as TooltipPrimitiveBase } from '@base-ui/react/tooltip'
import type * as React from 'react'

import {
  TooltipContent,
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface TooltipProps extends Omit<TooltipPrimitiveBase.Root.Props, 'children'> {
  content: React.ReactNode
  className?: string
  // TooltipContent props
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  children: React.ReactNode
}

function Tooltip({
  content,
  className,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  children,
  ...tooltipProps
}: TooltipProps) {
  return (
    <TooltipPrimitive {...tooltipProps}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        className={className}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        {content}
      </TooltipContent>
    </TooltipPrimitive>
  )
}

// Re-export all tooltip sub-components for convenience
export { TooltipContent, TooltipTrigger }

export { Tooltip }
