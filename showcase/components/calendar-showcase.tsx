import React from 'react'
import { Calendar } from '../../src/components/ui/calendar'
import { Grid } from '../../src/components/ui/grid'
import { HStack, VStack } from '../../src/components/ui/stack'
import { Typography } from '../../src/components/ui/typography'
import { FormCalendarPopover } from '../../src/components/ui-extended/form-calendar-popover'
import { FormDateOfBirth } from '../../src/components/ui-extended/form-date-of-birth'
import { ShowcaseSection } from './showcase-section'

export function CalendarShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [dateWithLimits, setDateWithLimits] = React.useState<Date | undefined>(undefined)

  return (
    <ShowcaseSection
      title="Calendar & Date Pickers"
      description="Calendar primitive and opinionated date picker components."
    >
      <VStack gap={8}>
        <VStack gap={2}>
          <Typography variant="heading-200">Calendar Popover</Typography>
          <Grid columns={1} gap={4} className="sm:grid-cols-2 max-w-lg">
            <FormCalendarPopover
              label="Select a date"
              placeholder="Pick a date"
              value={date}
              onChange={setDate}
            />
            <FormCalendarPopover
              label="With constraints"
              description="Min: today, Max: 30 days from now"
              placeholder="Pick a date"
              value={dateWithLimits}
              onChange={setDateWithLimits}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            />
          </Grid>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Date of Birth</Typography>
          <div className="max-w-xs">
            <FormDateOfBirth label="Date of birth" description="Enter in DD/MM/YYYY format" />
          </div>
        </VStack>
        <VStack gap={2}>
          <Typography variant="heading-200">Raw Calendar</Typography>
          <HStack gap={6} wrap>
            <Calendar />
          </HStack>
        </VStack>
      </VStack>
    </ShowcaseSection>
  )
}
