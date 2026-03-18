import React from 'react'
import { Calendar } from '@/components/_internal/calendar'
import { Grid } from '@/components/_internal/grid'
import { HStack, VStack } from '@/components/_internal/stack'
import { FormCalendarPopover } from '@/components/ui-opinionated/form-calendar-popover'
import { FormDateOfBirth } from '@/components/ui-opinionated/form-date-of-birth'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function CalendarShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [dateWithLimits, setDateWithLimits] = React.useState<Date | undefined>(undefined)

  return (
    <ShowcaseSection
      title="Calendar & Date Pickers"
      description="Calendar primitive and opinionated date picker components."
    >
      <VStack gap={8}>
        <ShowcaseGroup label="Calendar Popover">
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
        </ShowcaseGroup>
        <ShowcaseGroup label="Date of Birth">
          <div className="max-w-xs">
            <FormDateOfBirth label="Date of birth" description="Enter in DD/MM/YYYY format" />
          </div>
        </ShowcaseGroup>
        <ShowcaseGroup label="Raw Calendar">
          <HStack gap={6} wrap>
            <Calendar />
          </HStack>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
