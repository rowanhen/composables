// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import React from 'react'
import {
	ACCEPT_PRESETS,
	DropZone,
	DropZoneArea,
	DropZoneContent,
	DropZoneFile,
	DropZoneInput,
} from '@/components/_internal/dropzone'
import { VStack } from '@/components/_internal/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function DropzoneShowcase() {
	const [file, setFile] = React.useState<File | null>(null)

	return (
		<ShowcaseSection title="Dropzone" description="File upload area with drag-and-drop support.">
			<VStack gap={6} className="max-w-md">
				<ShowcaseGroup label="Default">
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
				</ShowcaseGroup>
				<ShowcaseGroup label="Disabled">
					<DropZone onDrop={() => {}} disabled>
						<DropZoneArea>
							<DropZoneInput />
							<DropZoneContent title="Upload disabled" />
						</DropZoneArea>
					</DropZone>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
