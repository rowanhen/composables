// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import * as React from 'react'
import { TreeView } from '@/components/_internal/tree-view'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function TreeViewShowcase() {
	return (
		<ShowcaseSection
			title="Tree View"
			description="ASCII-art collapsible tree. Click folders or use Enter/Space/Arrow keys to navigate."
		>
			<VStack gap={8}>
				<ShowcaseGroup label="File system tree">
					<div className="border border-stroke rounded-md p-4 bg-muted/30 w-full max-w-[300px]">
						<TreeView title="my-project" isRoot defaultOpen>
							<TreeView title="src" defaultOpen>
								<TreeView title="components">
									<TreeView title="Button.tsx" isFile />
									<TreeView title="Card.tsx" isFile />
									<TreeView title="index.ts" isFile />
								</TreeView>
								<TreeView title="hooks">
									<TreeView title="use-mobile.ts" isFile />
									<TreeView title="use-form.ts" isFile />
								</TreeView>
								<TreeView title="lib">
									<TreeView title="utils.ts" isFile />
								</TreeView>
								<TreeView title="app.tsx" isFile />
								<TreeView title="main.tsx" isFile />
							</TreeView>
							<TreeView title="public">
								<TreeView title="favicon.ico" isFile />
								<TreeView title="robots.txt" isFile />
							</TreeView>
							<TreeView title="package.json" isFile />
							<TreeView title="tsconfig.json" isFile />
						</TreeView>
					</div>
				</ShowcaseGroup>

				<ShowcaseGroup label="Collapsed by default">
					<div className="border border-stroke rounded-md p-4 bg-muted/30 w-full max-w-[260px]">
						<TreeView title="packages" isRoot>
							<TreeView title="cli">
								<TreeView title="src">
									<TreeView title="registry.ts" isFile />
								</TreeView>
							</TreeView>
							<TreeView title="showcase">
								<TreeView title="src">
									<TreeView title="app.tsx" isFile />
								</TreeView>
							</TreeView>
						</TreeView>
					</div>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
