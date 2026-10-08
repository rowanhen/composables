// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { useState } from 'react'
import { Tabs as OpinionatedTabs } from '@/components/ui-opinionated/tabs'
import { Card, CardContent } from '@/components/_internal/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/_internal/tabs'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseSection, ShowcaseGroup } from './showcase-section'

export function TabsShowcase() {
	const [selected, setSelected] = useState('preview')
	return (
		<ShowcaseSection title="Tabs" description="Tab interface for content organization.">
			<div className="space-y-8">
				<ShowcaseGroup label="Segmented">
					<Tabs defaultValue="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="analytics">Analytics</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
							<TabsTrigger value="archived" disabled>
								Archived
							</TabsTrigger>
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
				</ShowcaseGroup>
				<ShowcaseGroup label="Underline">
					<Tabs defaultValue="activity">
						<TabsList variant="underline">
							<TabsTrigger value="activity">Activity</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
							<TabsTrigger value="billing">Billing</TabsTrigger>
						</TabsList>
						<TabsContent value="activity">Recent activity</TabsContent>
						<TabsContent value="settings">Project settings</TabsContent>
						<TabsContent value="billing">Billing details</TabsContent>
					</Tabs>
				</ShowcaseGroup>
				<ShowcaseGroup label="Vertical segmented">
					<Tabs defaultValue="general" orientation="vertical">
						<TabsList>
							<TabsTrigger value="general">General</TabsTrigger>
							<TabsTrigger value="security">Security</TabsTrigger>
						</TabsList>
						<TabsContent value="general" className="p-3">
							General settings
						</TabsContent>
						<TabsContent value="security" className="p-3">
							Security settings
						</TabsContent>
					</Tabs>
				</ShowcaseGroup>
				<ShowcaseGroup label="Opinionated API">
					<OpinionatedTabs
						ariaLabel="View mode"
						items={[
							{ value: 'preview', label: 'Preview' },
							{ value: 'code', label: 'Code' },
						]}
						value={selected}
						onValueChange={setSelected}
					/>
				</ShowcaseGroup>
			</div>
		</ShowcaseSection>
	)
}
