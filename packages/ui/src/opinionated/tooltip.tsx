import type { Tooltip as TooltipPrimitiveBase } from '@base-ui/react/tooltip'
import type * as React from 'react'

import {
  TooltipContent,
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
} from '../_internal/tooltip'

/**
 * Props for the opinionated Tooltip component.
 *
 * @example
 * ```tsx
 * <Tooltip content="Copy to clipboard">
 *   <Button size="icon"><CopyIcon /></Button>
 * </Tooltip>
 *
 * <Tooltip content="Requires admin access" side="right">
 *   <span>Restricted action</span>
 * </Tooltip>
 * ```
 */
export interface TooltipProps extends Omit<TooltipPrimitiveBase.Root.Props, 'children'> {
  /** Content shown in the tooltip popup. */
  content: React.ReactNode
  className?: string
  /** Which side of the trigger the tooltip appears on. @default 'top' */
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  /** The element that triggers the tooltip on hover/focus. */
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
