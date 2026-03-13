import { Button } from '../../src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card'
import { Grid } from '../../src/components/ui/grid'
import { HStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function CardsShowcase() {
  return (
    <ShowcaseSection title="Cards" description="Card with header, content, and footer slots.">
      <Grid columns={1} gap={6} className="sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Standard card with all slots</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body-100">Card body content goes here.</Typography>
          </CardContent>
          <CardFooter>
            <HStack gap={2}>
              <Button size="sm">Save</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </HStack>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Compact Card</CardTitle>
            <CardDescription>size="sm" for tighter spacing</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body-100">Compact variant for dense UIs.</Typography>
          </CardContent>
        </Card>
        <Card className="border-[var(--border-brand)]">
          <CardHeader>
            <CardTitle>Branded Card</CardTitle>
            <CardDescription>Using brand border token</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="body-100">Custom border via semantic token.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </ShowcaseSection>
  )
}
