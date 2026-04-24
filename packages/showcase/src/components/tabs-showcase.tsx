// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Card, CardContent } from '@/components/_internal/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/_internal/tabs'
import { Typography } from '@/components/_internal/typography'
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
