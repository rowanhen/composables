import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { HStack } from '@/components/ui/stack'
import { ShowcaseSection } from './showcase-section'

export function SelectShowcase() {
  return (
    <ShowcaseSection title="Select" description="Dropdown selection control.">
      <HStack gap={4} wrap>
        <Select defaultValue="apple">
          <SelectTrigger>
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="sm">
          <SelectTrigger size="sm">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </HStack>
    </ShowcaseSection>
  )
}
