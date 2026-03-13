import { InboxIcon } from 'lucide-react'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { ShowcaseSection } from './showcase-section'

export function EmptyShowcase() {
  return (
    <ShowcaseSection title="Empty State" description="Placeholder for when there's no content.">
      <Empty>
        <EmptyHeader>
          <InboxIcon className="size-10 text-muted-foreground" />
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or filters to find what you're looking for.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </ShowcaseSection>
  )
}
