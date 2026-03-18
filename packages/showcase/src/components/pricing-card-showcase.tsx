// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { PricingCard } from '@/components/ui-opinionated/pricing-card'
import { HStack } from '@/components/_internal/stack'
import { ShowcaseSection } from './showcase-section'
import type { PricingProduct } from '@/components/ui-opinionated/pricing-card'

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

export function PricingCardShowcase() {
  return (
    <ShowcaseSection
      title="Pricing Card"
      description="Receipt-styled pricing cards. Drop three side-by-side for a classic tier layout."
    >
      <HStack gap={4} wrap>
        <PricingCard product={STARTER} />
        <PricingCard product={PRO} />
        <PricingCard product={ENTERPRISE} />
      </HStack>
    </ShowcaseSection>
  )
}
