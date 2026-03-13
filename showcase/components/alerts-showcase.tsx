import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../../src/components/ui/alert'
import { VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { ShowcaseSection } from './showcase-section'

export function AlertsShowcase() {
  return (
    <ShowcaseSection title="Alerts" description="Alert variants for messaging and notifications.">
      <VStack gap={4}>
        <VStack gap={2}>
          <Typography variant="heading-200">Variants</Typography>
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
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Without icons</Typography>
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Alerts work without icons too.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Clean and minimal success message.</AlertDescription>
          </Alert>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
