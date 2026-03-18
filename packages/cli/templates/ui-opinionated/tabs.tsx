import type { Tabs as TabsPrimitiveBase } from '@base-ui/react/tabs'
import { TabsList, Tabs as TabsPrimitive, TabsTrigger } from '@/components/_internal/tabs'

/** A single tab in the Tabs navigation bar. */
export type TabItem = {
  /** Unique identifier matched against the `value` prop to indicate the active tab. */
  value: string
  /** Display label rendered in the tab trigger. */
  label: string
}

/**
 * Props for the opinionated Tabs component.
 *
 * Renders a tab bar from an `items` array. Pair with `TabsContent` from the
 * re-export to render the corresponding panel for each tab.
 *
 * @example
 * ```tsx
 * const [tab, setTab] = useState('overview')
 *
 * <Tabs
 *   items={[
 *     { value: 'overview', label: 'Overview' },
 *     { value: 'settings', label: 'Settings' },
 *   ]}
 *   value={tab}
 *   onValueChange={setTab}
 * />
 * <TabsContent value="overview">...</TabsContent>
 * <TabsContent value="settings">...</TabsContent>
 * ```
 */
type TabsProps = Omit<TabsPrimitiveBase.Root.Props, 'children'> & {
  /** Tab definitions to render in the navigation bar. */
  items: TabItem[]
  /** Currently active tab value. */
  value: string
  /** Called when the user clicks a different tab. */
  onValueChange: (value: string) => void
  /** Accessible label for the tab list (for screen readers). */
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
