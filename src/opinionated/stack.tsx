/**
 * Opinionated Stack component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <Stack gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * <Stack direction="row" gap="lg" align="center">
 *   <span>Left</span>
 *   <span>Right</span>
 * </Stack>
 * ```
 */
export { Stack, type StackProps, stackVariants } from '../_internal/stack'
