/**
 * Opinionated LayoutBento components.
 * Re-exports the primitives as the API is already clean.
 *
 * @example
 * ```tsx
 * <BentoGrid>
 *   <BentoCell colSpan={2}>Featured</BentoCell>
 *   <BentoCell>Small</BentoCell>
 *   <BentoCell>Small</BentoCell>
 * </BentoGrid>
 *
 * <BentoSplit>
 *   <BentoLeader>Main content</BentoLeader>
 *   <BentoCell>Sidebar</BentoCell>
 * </BentoSplit>
 * ```
 */
export {
  BentoCell,
  BentoGrid,
  BentoLeader,
  BentoQuad,
  BentoSplit,
  BentoTriple,
  CellGrid,
  CellRow,
  StatCell,
} from '../_internal/layout-bento'
