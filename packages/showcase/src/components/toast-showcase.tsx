import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { HStack, VStack } from '@/components/ui/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function ToastShowcase() {
  return (
    <ShowcaseSection
      title="Toast"
      description="Toast notifications using sonner with design system variant styling."
    >
      <VStack gap={4}>
        <ShowcaseGroup label="Variants">
          <HStack gap={2} wrap>
            <Button
              variant="outline"
              onClick={() =>
                toast('Default Toast', {
                  description: 'This is a default notification.',
                })
              }
            >
              Default
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.success('Success', {
                  description: 'The operation completed successfully.',
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error('Error', {
                  description: 'Something went wrong. Please try again.',
                })
              }
            >
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.warning('Warning', {
                  description: 'This action may have unintended consequences.',
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.info('Info', {
                  description: 'Helpful context or additional information.',
                })
              }
            >
              Info
            </Button>
          </HStack>
        </ShowcaseGroup>
        <ShowcaseGroup label="With actions">
          <HStack gap={2} wrap>
            <Button
              variant="outline"
              onClick={() =>
                toast('File deleted', {
                  description: 'The file has been moved to trash.',
                  action: {
                    label: 'Undo',
                    onClick: () => toast.success('Restored'),
                  },
                })
              }
            >
              With action
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error('Upload failed', {
                  description: 'Could not upload the file.',
                  action: {
                    label: 'Retry',
                    onClick: () => toast.success('Retrying...'),
                  },
                })
              }
            >
              Error with action
            </Button>
          </HStack>
        </ShowcaseGroup>
        <ShowcaseGroup label="Promise">
          <Button
            variant="outline"
            onClick={() => {
              const id = toast('Loading', {
                icon: <Loader2Icon className="size-4 animate-spin text-muted-foreground" />,
              })
              setTimeout(() => {
                toast.success('Operation complete', { id })
              }, 2000)
            }}
          >
            Promise toast
          </Button>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
