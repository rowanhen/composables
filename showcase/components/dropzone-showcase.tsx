import React from 'react'
import {
  ACCEPT_PRESETS,
  DropZone,
  DropZoneArea,
  DropZoneContent,
  DropZoneFile,
  DropZoneInput,
} from '../../src/components/ui/dropzone'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function DropzoneShowcase() {
  const [file, setFile] = React.useState<File | null>(null)

  return (
    <ShowcaseSection title="Dropzone" description="File upload area with drag-and-drop support.">
      <VStack gap={6} className="max-w-md">
        <VStack gap={2}>
          <Typography variant="heading-200">Default</Typography>
          <DropZone
            onDrop={(accepted) => {
              if (accepted.length > 0) setFile(accepted[0])
            }}
            accept={{
              ...ACCEPT_PRESETS.PDF,
              ...ACCEPT_PRESETS.IMAGES,
            }}
            hasFiles={!!file}
          >
            <DropZoneArea>
              <DropZoneInput />
              {file ? (
                <DropZoneFile file={file} onRemove={() => setFile(null)} />
              ) : (
                <DropZoneContent title="Upload a file" />
              )}
            </DropZoneArea>
          </DropZone>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Disabled</Typography>
          <DropZone onDrop={() => {}} disabled>
            <DropZoneArea>
              <DropZoneInput />
              <DropZoneContent title="Upload disabled" />
            </DropZoneArea>
          </DropZone>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
