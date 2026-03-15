import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { VStack } from '@/components/ui/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function AlertsShowcase() {
  return (
    <ShowcaseSection title="Alerts" description="Alert variants for messaging and notifications.">
      <VStack gap={4}>
        <ShowcaseGroup label="Variants">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>Informational message with default styling.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <InfoIcon />
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              Helpful context or additional information for the user.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircleIcon />
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>The operation completed successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangleIcon />
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>This action may have unintended consequences.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
        </ShowcaseGroup>
        <ShowcaseGroup label="Without icons">
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Alerts work without icons too.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Clean and minimal success message.</AlertDescription>
          </Alert>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
