import {
  List,
  ListArrowItem,
  ListBulletItem,
} from '@/components/ui-opinionated/list'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

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
      description="Variant list renderer: arrow and bullet styles."
    >
      <VStack gap={8}>
        <ShowcaseGroup label="Arrow variant">
          <div className="max-w-sm">
            <List variant="arrow" items={STEPS} />
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="Bullet variant">
          <div className="max-w-sm">
            <List variant="bullet" items={BASICS} />
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="Compositional (children API)">
          <VStack gap={4}>
            <div className="max-w-sm">
              <List variant="arrow">
                <ListArrowItem content="Hand-rolled item A" />
                <ListArrowItem content="Hand-rolled item B with longer description text" />
                <ListArrowItem content={<span className="font-semibold text-primary">Highlighted item C</span>} />
              </List>
            </div>
            <div className="max-w-sm">
              <List variant="bullet">
                <ListBulletItem content="Bullet point A" />
                <ListBulletItem content="Bullet point B with extra detail" />
              </List>
            </div>
          </VStack>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
