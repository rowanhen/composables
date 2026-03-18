// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import * as React from 'react'
import { BlockLoader, SEQUENCES, type BlockLoaderMode } from '@/components/_internal/block-loader'
import { VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function BlockLoaderShowcase() {
  return (
    <ShowcaseSection
      title="Block Loader"
      description="Animated Unicode spinner with 11 sequence modes. Drop-in loading indicator."
    >
      <VStack gap={6}>
        <ShowcaseGroup label="All modes (0–10)">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {SEQUENCES.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center w-10 h-10 border border-stroke rounded-md bg-muted/30">
                  <BlockLoader mode={i as BlockLoaderMode} className="text-lg text-foreground" />
                </div>
                <Typography variant="caption-100" className="text-muted-foreground">
                  {i}
                </Typography>
              </div>
            ))}
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="In context">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BlockLoader mode={1} />
              <span>Uploading file…</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BlockLoader mode={6} />
              <span>Building project…</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <BlockLoader mode={2} className="text-primary" />
              <span>Connecting to server…</span>
            </div>
          </div>
        </ShowcaseGroup>

        <ShowcaseGroup label="Speed variants">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center gap-1">
              <BlockLoader mode={1} intervalMs={50} className="text-xl text-foreground" />
              <Typography variant="caption-100" className="text-muted-foreground">Fast (50ms)</Typography>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BlockLoader mode={1} intervalMs={100} className="text-xl text-foreground" />
              <Typography variant="caption-100" className="text-muted-foreground">Default (100ms)</Typography>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BlockLoader mode={1} intervalMs={300} className="text-xl text-foreground" />
              <Typography variant="caption-100" className="text-muted-foreground">Slow (300ms)</Typography>
            </div>
          </div>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
