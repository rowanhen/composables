import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../src/components/ui/accordion'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

const faqItems = [
  {
    q: 'What is smores-internal?',
    a: "A React component library for Marshmallow's internal tooling, built on Base UI and Tailwind CSS v4.",
  },
  {
    q: 'How do I install components?',
    a: 'Use the CLI: npx smores-internal add button. This copies the component source directly into your project.',
  },
  {
    q: 'Does it support dark mode?',
    a: 'Yes. Add the .dark class to your html element and all semantic tokens swap automatically.',
  },
]

export function AccordionShowcase() {
  return (
    <ShowcaseSection
      title="Accordion"
      description="Expandable content sections with multiple visual variants."
    >
      <VStack gap={6}>
        <VStack gap={2}>
          <Typography variant="heading-200">Default (bordered)</Typography>
          <Accordion>
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Flush (no border)</Typography>
          <Accordion variant="flush">
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Separated</Typography>
          <Accordion variant="separated">
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
