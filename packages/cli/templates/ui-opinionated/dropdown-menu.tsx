import type * as React from 'react'

import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface DropdownMenuItemData {
  /** Display label for the menu item */
  label: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Icon to display before the label */
  icon?: React.ReactNode
  /** Keyboard shortcut to display */
  shortcut?: string
  /** Whether the item is disabled */
  disabled?: boolean
  /** Set to true to render a separator instead of an item */
  separator?: boolean
  /** Variant for destructive actions */
  variant?: 'default' | 'destructive'
}

export interface DropdownMenuProps {
  /** Trigger element that opens the menu */
  trigger: React.ReactNode
  /** Array of menu items */
  items?: DropdownMenuItemData[]
  /** Menu alignment relative to trigger */
  align?: 'start' | 'center' | 'end'
  /** Side to position the menu */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Additional class names for the content */
  className?: string
  /** Children for advanced usage (overrides items) */
  children?: React.ReactNode
}

/**
 * Opinionated DropdownMenu component with items array API.
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   trigger={<Button>Open Menu</Button>}
 *   items={[
 *     { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('edit') },
 *     { label: 'Copy', shortcut: '⌘C', onClick: () => console.log('copy') },
 *     { separator: true },
 *     { label: 'Delete', variant: 'destructive', onClick: () => console.log('delete') },
 *   ]}
 * />
 * ```
 */
function DropdownMenu({
  trigger,
  items,
  align = 'start',
  side = 'bottom',
  className,
  children,
}: DropdownMenuProps) {
  // If children provided, use primitive API
  if (children) {
    return (
      <DropdownMenuPrimitive>
        <DropdownMenuTrigger render={<>{trigger}</>} />
        {children}
      </DropdownMenuPrimitive>
    )
  }

  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger render={<>{trigger}</>} />
      <DropdownMenuContent align={align} side={side} className={className}>
        {items?.map((item, index) => {
          if (item.separator) {
            return <DropdownMenuSeparator key={index} />
          }

          return (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              variant={item.variant}
            >
              {item.icon}
              {item.label}
              {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  )
}

// Re-export sub-components for advanced usage
export {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
export { DropdownMenu }
