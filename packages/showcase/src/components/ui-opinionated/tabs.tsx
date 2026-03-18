// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import type { Tabs as TabsPrimitiveBase } from '@base-ui/react/tabs'
import { TabsList, Tabs as TabsPrimitive, TabsTrigger } from '@/components/_internal/tabs'

export type TabItem = {
  value: string
  label: string
}

type TabsProps = Omit<TabsPrimitiveBase.Root.Props, 'children'> & {
  items: TabItem[]
  value: string
  onValueChange: (value: string) => void
  ariaLabel?: string
  className?: string
}

export const Tabs = ({
  items,
  value,
  onValueChange,
  ariaLabel,
  className,
  ...tabsProps
}: TabsProps) => {
  return (
    <TabsPrimitive value={value} onValueChange={onValueChange} className={className} {...tabsProps}>
      <TabsList variant="line" aria-label={ariaLabel}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsPrimitive>
  )
}

// Re-export sub-components for advanced usage
export { TabsContent } from '@/components/_internal/tabs'
