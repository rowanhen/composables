/**
 * Opinionated LineItemHeader component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <LineItemHeader>Order Summary</LineItemHeader>
 * <LineItem label="Item" value="$50.00" />
 *
 * <LineItemHeader variant="bordered">Details</LineItemHeader>
 * ```
 */
export {
  LineItemHeader,
  type LineItemHeaderProps,
  lineItemHeaderVariants,
} from '@/components/_internal/line-item-header'
