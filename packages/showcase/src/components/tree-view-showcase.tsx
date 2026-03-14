import * as React from 'react'
import { TreeView } from '@/components/ui/tree-view'
import { VStack } from '@/components/ui/stack'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function TreeViewShowcase() {
  return (
    <ShowcaseSection
      title="Tree View"
      description="ASCII-art collapsible tree. Click folders or use Enter/Space/Arrow keys to navigate."
    >
      <VStack gap={8}>
        {/* Basic tree */}
        <VStack gap={2}>
          <Typography variant="heading-200">File system tree</Typography>
          <div className="border border-border rounded-md p-4 bg-muted/30 w-fit min-w-[300px]">
            <TreeView title="my-project" isRoot defaultOpen>
              <TreeView title="src" defaultOpen>
                <TreeView title="components">
                  <TreeView title="Button.tsx" isFile />
                  <TreeView title="Card.tsx" isFile />
                  <TreeView title="index.ts" isFile isLastChild />
                </TreeView>
                <TreeView title="hooks">
                  <TreeView title="use-mobile.ts" isFile />
                  <TreeView title="use-form.ts" isFile isLastChild />
                </TreeView>
                <TreeView title="lib">
                  <TreeView title="utils.ts" isFile isLastChild />
                </TreeView>
                <TreeView title="app.tsx" isFile />
                <TreeView title="main.tsx" isFile isLastChild />
              </TreeView>
              <TreeView title="public">
                <TreeView title="favicon.ico" isFile />
                <TreeView title="robots.txt" isFile isLastChild />
              </TreeView>
              <TreeView title="package.json" isFile />
              <TreeView title="tsconfig.json" isFile isLastChild />
            </TreeView>
          </div>
        </VStack>

        {/* Collapsed by default */}
        <VStack gap={2}>
          <Typography variant="heading-200">Collapsed by default</Typography>
          <div className="border border-border rounded-md p-4 bg-muted/30 w-fit min-w-[260px]">
            <TreeView title="packages" isRoot>
              <TreeView title="cli">
                <TreeView title="src" isLastChild>
                  <TreeView title="registry.ts" isFile isLastChild />
                </TreeView>
              </TreeView>
              <TreeView title="showcase" isLastChild>
                <TreeView title="src" isLastChild>
                  <TreeView title="app.tsx" isFile isLastChild />
                </TreeView>
              </TreeView>
            </TreeView>
          </div>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
