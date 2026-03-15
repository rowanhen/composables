import { FileTextIcon, MoreHorizontalIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { VStack } from '@/components/ui/stack'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function ItemShowcase() {
  return (
    <ShowcaseSection
      title="Item"
      description="List item component with media, content, and action slots."
    >
      <VStack gap={6} className="max-w-lg">
        <ShowcaseGroup label="Variants">
          <ItemGroup>
            <Item variant="default">
              <ItemMedia variant="icon">
                <FileTextIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default item</ItemTitle>
                <ItemDescription>No visible border by default</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="success">Active</Badge>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <UserIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Outline item</ItemTitle>
                <ItemDescription>Bordered variant for separation</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-xs">
                  <MoreHorizontalIcon />
                </Button>
              </ItemActions>
            </Item>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <SettingsIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Muted item</ItemTitle>
                <ItemDescription>Subtle background for grouping</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </ShowcaseGroup>
        <ShowcaseGroup label="Sizes">
          <ItemGroup>
            <Item size="default" variant="outline">
              <ItemMedia variant="icon">
                <FileTextIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Default size</ItemTitle>
                <ItemDescription>Standard padding and spacing</ItemDescription>
              </ItemContent>
            </Item>
            <Item size="sm" variant="outline">
              <ItemMedia variant="icon">
                <FileTextIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Small size</ItemTitle>
                <ItemDescription>Compact layout</ItemDescription>
              </ItemContent>
            </Item>
            <Item size="xs" variant="outline">
              <ItemMedia variant="icon">
                <FileTextIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Extra small size</ItemTitle>
                <ItemDescription>Minimal padding</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
