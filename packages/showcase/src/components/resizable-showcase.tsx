import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Typography } from '@/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function ResizableShowcase() {
  return (
    <ShowcaseSection title="Resizable" description="Resizable panel groups with draggable handles.">
      <div className="max-w-2xl">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-32 items-center justify-center p-4">
              <Typography variant="body-100">Panel A</Typography>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <Typography variant="body-100">Panel B</Typography>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <Typography variant="body-100">Panel C</Typography>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShowcaseSection>
  )
}
