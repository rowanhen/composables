/**
 * Opinionated LineItem component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <LineItem label="Subtotal" value="$99.00" />
 * <LineItem label="Tax" value="$8.91" variant="compact" />
 * <LineItem label="Total" value="$107.91" variant="bold" divider="solid" />
 * ```
 */
export { LineItem, type LineItemProps, lineItemVariants } from '@/components/_internal/line-item'
