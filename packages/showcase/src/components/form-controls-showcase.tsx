// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import {
  AtSignIcon,
  CopyIcon,
  EyeIcon,
  GlobeIcon,
  HashIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react'
import { Checkbox } from '@/components/_internal/checkbox'
import { Grid } from '@/components/_internal/grid'
import { Input } from '@/components/_internal/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/_internal/input-group'
import { Label } from '@/components/_internal/label'
import { RadioGroup, RadioGroupItem } from '@/components/_internal/radio-group'
import { HStack, VStack } from '@/components/_internal/stack'
import { Switch } from '@/components/_internal/switch'
import { Textarea } from '@/components/_internal/textarea'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function FormControlsShowcase() {
  return (
    <ShowcaseSection
      title="Form Controls"
      description="Input primitives: input, textarea, input group, label, checkbox, switch, radio group."
    >
      <VStack gap={8}>
      <Grid columns={1} gap={6} className="sm:grid-cols-2">
        <VStack gap={2}>
          <Label>Text Input</Label>
          <Input placeholder="Enter your name..." />
        </VStack>
        <VStack gap={2}>
          <Label>Disabled Input</Label>
          <Input placeholder="Disabled" disabled />
        </VStack>
        <VStack gap={2}>
          <Label>Textarea</Label>
          <Textarea placeholder="Write something..." />
        </VStack>
        <VStack gap={3}>
          <Label>Checkbox</Label>
          <HStack gap={2} align="center">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms</Label>
          </HStack>
          <HStack gap={2} align="center">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </HStack>
        </VStack>
        <VStack gap={3}>
          <Label>Switch</Label>
          <HStack gap={2} align="center">
            <Switch />
            <Typography variant="body-100">Enable feature</Typography>
          </HStack>
          <HStack gap={2} align="center">
            <Switch defaultChecked />
            <Typography variant="body-100">Notifications</Typography>
          </HStack>
        </VStack>
        <VStack gap={3}>
          <Label>Radio Group</Label>
          <RadioGroup defaultValue="email">
            <HStack gap={2} align="center">
              <RadioGroupItem value="email" />
              <Label>Email</Label>
            </HStack>
            <HStack gap={2} align="center">
              <RadioGroupItem value="sms" />
              <Label>SMS</Label>
            </HStack>
            <HStack gap={2} align="center">
              <RadioGroupItem value="push" />
              <Label>Push notification</Label>
            </HStack>
          </RadioGroup>
        </VStack>
      </Grid>

      <ShowcaseGroup label="Input Group">
        <Typography variant="body-100" className="text-muted-foreground">
          Composable input groups with icons, text, and buttons on either side.
        </Typography>

        <Grid columns={1} gap={6} className="sm:grid-cols-2">
          {/* Start icon */}
          <VStack gap={2}>
            <Label>Search with icon</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <SearchIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
          </VStack>

          {/* End icon */}
          <VStack gap={2}>
            <Label>Email with end icon</Label>
            <InputGroup>
              <InputGroupInput placeholder="you@example.com" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <MailIcon />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </VStack>

          {/* Both sides icons */}
          <VStack gap={2}>
            <Label>Icons on both sides</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <LockIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput type="password" placeholder="Password" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <EyeIcon />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </VStack>

          {/* Start text prefix */}
          <VStack gap={2}>
            <Label>Currency prefix</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>&pound;</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
            </InputGroup>
          </VStack>

          {/* End text suffix */}
          <VStack gap={2}>
            <Label>Percentage suffix</Label>
            <InputGroup>
              <InputGroupInput placeholder="0" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>%</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </VStack>

          {/* URL-style with prefix text */}
          <VStack gap={2}>
            <Label>URL input</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <GlobeIcon />
                </InputGroupText>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          </VStack>

          {/* With button end */}
          <VStack gap={2}>
            <Label>With copy button</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <LinkIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput defaultValue="https://example.com/invite/abc123" readOnly />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>
                  <CopyIcon />
                  Copy
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </VStack>

          {/* With clear button */}
          <VStack gap={2}>
            <Label>With clear button</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <SearchIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="Type to search..." defaultValue="composable" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>
                  <XIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </VStack>

          {/* Icon + text combined start */}
          <VStack gap={2}>
            <Label>Hashtag channel</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <HashIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="channel-name" />
            </InputGroup>
          </VStack>

          {/* @ mention */}
          <VStack gap={2}>
            <Label>Username</Label>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <AtSignIcon />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="username" />
            </InputGroup>
          </VStack>

          {/* Textarea variant */}
          <VStack gap={2} className="sm:col-span-2">
            <Label>Textarea with icon</Label>
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>
                  <MailIcon />
                </InputGroupText>
                <InputGroupText>Message</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea placeholder="Write your message..." rows={3} />
            </InputGroup>
          </VStack>
        </Grid>
      </ShowcaseGroup>
      </VStack>
    </ShowcaseSection>
  )
}
