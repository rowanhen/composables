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
import { Skeleton } from '../../src/components/ui/skeleton'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function ResponsiveGridShowcase() {
  return (
    <ShowcaseSection
      title="Responsive Grid"
      description="Grid with Tailwind responsive prefixes. Resize the window to see changes."
    >
      <VStack gap={6}>
        <Typography variant="heading-200">Card grid (1 → 2 → 3 cols)</Typography>
        <Grid columns={1} gap={6} className="sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Policies', 'Manage insurance policies'],
            ['Claims', 'Process and review claims'],
            ['Customers', 'Customer database'],
            ['Quotes', 'Generate new quotes'],
            ['Payments', 'Payment processing'],
            ['Reports', 'Analytics dashboard'],
          ].map(([title, desc]) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </VStack>
    </ShowcaseSection>
  )
}
