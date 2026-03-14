import {
  List,
  ListArrowItem,
  ListBulletItem,
  ListCheckBorderedItem,
  ListCheckItem,
} from '@/components/ui-opinionated/list'
import { VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

const FEATURES = [
  { content: 'Full TypeScript support out of the box' },
  { content: 'Composable with any Tailwind preset' },
  { content: 'Semantic tokens for consistent theming' },
  { content: 'Accessible by default with ARIA roles' },
]

const STEPS = [
  { content: 'Install the CLI from npm' },
  { content: 'Run composables add in your project' },
  { content: 'Import and use components directly' },
]

const BASICS = [
  { content: 'Zero runtime overhead' },
  { content: 'Tree-shakable exports' },
  { content: 'Copy-paste friendly' },
]

export function ListShowcase() {
  return (
    <ShowcaseSection
      title="List"
      description="Variant list renderer: arrow, check, check-bordered, and bullet styles."
    >
      <VStack gap={8}>
        {/* Arrow */}
        <VStack gap={2}>
          <Typography variant="heading-200">Arrow variant</Typography>
          <div className="max-w-sm">
            <List variant="arrow" items={STEPS} />
          </div>
        </VStack>

        {/* Check */}
        <VStack gap={2}>
          <Typography variant="heading-200">Check variant</Typography>
          <div className="max-w-sm">
            <List variant="check" items={FEATURES} />
          </div>
        </VStack>

        {/* Check bordered */}
        <VStack gap={2}>
          <Typography variant="heading-200">Check-bordered variant</Typography>
          <div className="max-w-2xl">
            <List variant="check-bordered" items={FEATURES} />
          </div>
        </VStack>

        {/* Bullet */}
        <VStack gap={2}>
          <Typography variant="heading-200">Bullet variant</Typography>
          <div className="max-w-sm">
            <List variant="bullet" items={BASICS} />
          </div>
        </VStack>

        {/* Compositional (children) */}
        <VStack gap={2}>
          <Typography variant="heading-200">Compositional (children API)</Typography>
          <div className="max-w-sm">
            <List variant="arrow">
              <ListArrowItem content="Hand-rolled item A" />
              <ListArrowItem content="Hand-rolled item B with longer description text" />
              <ListArrowItem content={<span className="font-semibold text-primary">Highlighted item C</span>} />
            </List>
          </div>
          <div className="max-w-sm mt-4">
            <List variant="check">
              <ListCheckItem content="Composable checkmark" />
              <ListCheckItem content={<>With <code className="text-xs bg-muted px-1">React.ReactNode</code> content</>} />
            </List>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
