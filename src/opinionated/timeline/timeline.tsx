'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Timeline as Root,
	TimelineConnector,
	TimelineDescription,
	TimelineItem,
	TimelineMarker,
	TimelineTime,
	TimelineTitle,
	createTimelineController,
} from '../../components/keyframery/timeline'

export type TimelineEvent = {
	value: string
	title: ReactNode
	description?: ReactNode
	time?: ReactNode
	status?: ComponentProps<typeof TimelineItem>['status']
}

export type TimelineProps = ComponentProps<typeof Root> & {
	items?: readonly TimelineEvent[]
}

export function Timeline({ items, children, ...props }: TimelineProps) {
	return (
		<Root {...props}>
			{children ??
				items?.map(({ value, title, description, time, status }, index) => (
					<TimelineItem key={value} value={value} status={status}>
						<TimelineMarker />
						{index < items.length - 1 && <TimelineConnector />}
						<TimelineTitle>{title}</TimelineTitle>
						{time != null && <TimelineTime>{time}</TimelineTime>}
						{description != null && <TimelineDescription>{description}</TimelineDescription>}
					</TimelineItem>
				))}
		</Root>
	)
}

export {
	TimelineConnector,
	TimelineDescription,
	TimelineItem,
	TimelineMarker,
	TimelineTime,
	TimelineTitle,
	createTimelineController,
}
