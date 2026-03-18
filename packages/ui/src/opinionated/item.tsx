import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  Item as ItemPrimitive,
  ItemSeparator,
  ItemTitle,
  type itemVariants,
} from '../_internal/item'
import { Typography } from './typography'

export type ItemVariants = typeof itemVariants

export interface ItemProps {
  /**
   * Title text for the item
   */
  title?: React.ReactNode
  /**
   * Description text for the item
   */
  description?: React.ReactNode
  /**
   * Icon or media content to display
   */
  icon?: React.ReactNode
  /**
   * Image URL or image element
   */
  image?: React.ReactNode
  /**
   * Actions (buttons, etc.) to display
   */
  actions?: React.ReactNode
  /**
   * Header content (overrides title/description if provided)
   */
  header?: React.ReactNode
  /**
   * Footer content
   */
  footer?: React.ReactNode
  /**
   * Additional content to display
   */
  children?: React.ReactNode
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: VariantProps<typeof itemVariants>['variant']
  /**
   * Size variant
   * @default 'default'
   */
  size?: VariantProps<typeof itemVariants>['size']
  /**
   * Additional className
   */
  className?: string
  /**
   * Click handler
   */
  onClick?: () => void
}

/**
 * Opinionated Item component with sensible defaults and common patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Item title="Item Title" description="Item description" />
 *
 * // With icon
 * <Item
 *   title="Settings"
 *   description="Manage your settings"
 *   icon={<SettingsIcon />}
 * />
 *
 * // With image
 * <Item
 *   title="Profile"
 *   description="View profile"
 *   image={<img src="avatar.jpg" alt="Avatar" />}
 * />
 *
 * // With actions
 * <Item
 *   title="Item"
 *   actions={<Button>Action</Button>}
 * />
 *
 * // Clickable item
 * <Item
 *   title="Click me"
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 */
function Item({
  title,
  description,
  icon,
  image,
  actions,
  header,
  footer,
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  ...props
}: ItemProps & Omit<React.ComponentProps<typeof ItemPrimitive>, 'variant' | 'size' | 'children'>) {
  const hasMedia = icon || image
  const hasContent = title || description || children

  return (
    <ItemPrimitive variant={variant} size={size} className={className} onClick={onClick} {...props}>
      {hasMedia && <ItemMedia variant={image ? 'image' : 'icon'}>{image || icon}</ItemMedia>}

      {hasContent && (
        <ItemContent>
          {header ? (
            header
          ) : (
            <>
              {title && (
                <ItemTitle>
                  {typeof title === 'string' ? (
                    <Typography variant="heading-100">{title}</Typography>
                  ) : (
                    title
                  )}
                </ItemTitle>
              )}
              {description && (
                <ItemDescription>
                  {typeof description === 'string' ? (
                    <Typography variant="body-100" className="text-muted-foreground">
                      {description}
                    </Typography>
                  ) : (
                    description
                  )}
                </ItemDescription>
              )}
            </>
          )}
          {children}
        </ItemContent>
      )}

      {actions && <ItemActions>{actions}</ItemActions>}

      {footer && <ItemFooter>{footer}</ItemFooter>}
    </ItemPrimitive>
  )
}

// Export individual components for advanced usage
export {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}

export { Item }
