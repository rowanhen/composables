/**
 * Ledger Showcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Demonstrates LineItem variants, SectionLabel variants, Ledger compositions.
 */

import { Ledger, SectionLabel } from '@/components/ui/ledger'
import { LineItem } from '@/components/ui/line-item'
import { HStack, VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function LedgerShowcase() {
  return (
    <ShowcaseSection
      title="Ledger"
      description="Information-dense ledger layout components: LineItem, SectionLabel, and Ledger composition."
    >
      <VStack gap={8}>
        {/* LineItem Variants */}
        <VStack gap={2}>
          <Typography variant="label-100">LineItem Variants</Typography>
          <div className="w-80 border border-border rounded-lg p-4 space-y-1">
            <LineItem label="Default row" value="$100" variant="default" />
            <LineItem label="Fill row (dots)" value="$200" variant="fill" dividerVariant="dots" />
            <LineItem label="Fill row (solid)" value="$300" variant="fill" dividerVariant="solid" />
            <LineItem label="Fill row (pills)" value="$400" variant="fill" dividerVariant="pills" />
            <LineItem label="Bold total" value="$1,000" variant="bold" />
            <LineItem label="Compact row" value="tiny" variant="compact" />
          </div>
        </VStack>

        {/* SectionLabel Variants */}
        <VStack gap={2}>
          <Typography variant="label-100">SectionLabel Variants</Typography>
          <HStack gap={4} wrap>
            <SectionLabel variant="default">DEFAULT LABEL</SectionLabel>
            <SectionLabel variant="bordered">BORDERED LABEL</SectionLabel>
          </HStack>
        </VStack>

        {/* Ledger Variants */}
        <VStack gap={2}>
          <Typography variant="label-100">Ledger Compositions</Typography>
          <HStack gap={6} align="start" wrap>
            <Ledger
              title="INVOICE #001"
              rows={[
                { label: 'Consulting', value: '$4,000', variant: 'fill' },
                { label: 'Design', value: '$1,200', variant: 'fill' },
                { label: 'Expenses', value: '$320', variant: 'fill' },
              ]}
              total={{ label: 'Total Due', value: '$5,520' }}
              className="w-64"
            />
            <Ledger
              rows={[
                { label: 'Components', value: '80+', variant: 'fill', dividerVariant: 'pills' },
                { label: 'Presets', value: 'All', variant: 'fill', dividerVariant: 'pills' },
                { label: 'Projects', value: 'Unlimited', variant: 'fill', dividerVariant: 'pills' },
                { label: 'Updates', value: 'Lifetime', variant: 'fill', dividerVariant: 'pills' },
              ]}
              total={{ label: 'Price', value: '$99 / yr' }}
              className="w-64"
            />
          </HStack>
        </VStack>

        {/* Complete Composition */}
        <VStack gap={2}>
          <Typography variant="label-100">Complete Composition</Typography>
          <div className="w-80 border border-border rounded-lg p-4">
            <SectionLabel className="mb-2">ORDER SUMMARY</SectionLabel>
            <LineItem label="Subtotal" value="$240.00" variant="fill" dividerVariant="dots" />
            <LineItem label="Discount (10%)" value="-$24.00" variant="fill" dividerVariant="dots" />
            <LineItem label="Tax (VAT 20%)" value="$43.20" variant="fill" dividerVariant="dots" />
            <LineItem label="Shipping" value="FREE" variant="fill" dividerVariant="dots" />
            <LineItem label="TOTAL" value="$259.20" variant="bold" />
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
