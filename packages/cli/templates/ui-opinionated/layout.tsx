/**
 * Opinionated Layout components.
 * Re-exports the primitives as the API is already clean.
 *
 * @example
 * ```tsx
 * <Section spacing="lg">
 *   <NewspaperGrid cols={3}>
 *     <NewspaperCell>Article 1</NewspaperCell>
 *     <NewspaperCell>Article 2</NewspaperCell>
 *     <NewspaperCell>Article 3</NewspaperCell>
 *   </NewspaperGrid>
 * </Section>
 *
 * <FlexSpacer /> // Fills remaining space in flex container
 * ```
 */
export {
  FlexSpacer,
  NewspaperCell,
  NewspaperGrid,
  newspaperGridVariants,
  Section,
  sectionVariants,
} from '@/components/ui/layout'
export type { SectionProps, NewspaperGridProps, NewspaperCellProps } from '@/components/ui/layout'
