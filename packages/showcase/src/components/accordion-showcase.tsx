import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/_internal/accordion'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

const faqItems = [
  {
    q: 'What is Composables?',
    a: 'A React component library built on Base UI and Tailwind CSS v4, designed for copy-paste composition.',
  },
  {
    q: 'How do I install components?',
    a: 'Use the CLI: npx @leitware/composables-cli add button. This copies the component source directly into your project.',
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
        <ShowcaseGroup label="Default (bordered)">
          <Accordion>
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ShowcaseGroup>
        <ShowcaseGroup label="Flush (no border)">
          <Accordion variant="flush">
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ShowcaseGroup>
        <ShowcaseGroup label="Separated">
          <Accordion variant="separated">
            {faqItems.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
