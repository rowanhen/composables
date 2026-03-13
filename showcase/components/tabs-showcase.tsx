import { Card, CardContent } from '../../src/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function TabsShowcase() {
  return (
    <ShowcaseSection title="Tabs" description="Tab interface for content organization.">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-4">
          <Card>
            <CardContent className="pt-4">
              <Typography variant="body-200">Overview content here.</Typography>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardContent className="pt-4">
              <Typography variant="body-200">Analytics content here.</Typography>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardContent className="pt-4">
              <Typography variant="body-200">Reports content here.</Typography>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ShowcaseSection>
  )
}
