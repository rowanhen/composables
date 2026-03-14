import { PricingReceipt } from '@/components/ui-opinionated/pricing-receipt'
import { HStack } from '@/components/ui/stack'
import { ShowcaseSection } from './showcase-section'
import type { PricingProduct } from '@/components/ui-opinionated/pricing-receipt'

const STARTER: PricingProduct = {
  id: 'starter',
  orderNum: '001',
  title: 'Starter',
  subtitle: 'For indie hackers',
  items: [
    { name: 'Components', value: '40+' },
    { name: 'Presets', value: '5' },
    { name: 'Projects', value: '1' },
    { name: 'Updates', value: '6 months' },
  ],
  total: 'FREE',
  cta: 'Get started',
  link: '#',
  learnMoreLink: '#',
}

const PRO: PricingProduct = {
  id: 'pro',
  orderNum: '002',
  title: 'Pro',
  subtitle: 'For growing teams',
  items: [
    { name: 'Components', value: '80+' },
    { name: 'Presets', value: 'All' },
    { name: 'Projects', value: 'Unlimited' },
    { name: 'Updates', value: 'Lifetime' },
  ],
  total: '$99 / yr',
  cta: 'Buy Pro',
  link: '#',
  learnMoreLink: '#',
}

const ENTERPRISE: PricingProduct = {
  id: 'enterprise',
  orderNum: '003',
  title: 'Enterprise',
  subtitle: 'For large organisations',
  items: [
    { name: 'Components', value: '80+' },
    { name: 'Presets', value: 'Custom' },
    { name: 'Projects', value: 'Unlimited' },
    { name: 'Support', value: 'Priority' },
  ],
  total: 'Contact us',
  cta: 'Talk to sales',
  link: '#',
}

export function PricingReceiptShowcase() {
  return (
    <ShowcaseSection
      title="Pricing Receipt"
      description="Receipt-styled pricing cards. Drop three side-by-side for a classic tier layout."
    >
      <HStack gap={4} wrap>
        <PricingReceipt product={STARTER} />
        <PricingReceipt product={PRO} />
        <PricingReceipt product={ENTERPRISE} />
      </HStack>
    </ShowcaseSection>
  )
}
