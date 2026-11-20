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
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../../_storybook/gallery'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from './input-group'
import { Label } from '../label/label'

const meta = {
	title: 'Components/Input Group',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const InputGroupExample: Story = {
	name: 'Input Group',
	render: () => (
		<Gallery>
			<Group label="Input Group">
				<p className="text-sm text-content-muted">
					Composable input groups with icons, text, and buttons on either side.
				</p>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{/* Start icon */}
					<div className="flex flex-col gap-2">
						<Label>Search with icon</Label>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText>
									<SearchIcon />
								</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="Search..." />
						</InputGroup>
					</div>

					{/* End icon */}
					<div className="flex flex-col gap-2">
						<Label>Email with end icon</Label>
						<InputGroup>
							<InputGroupInput placeholder="you@example.com" />
							<InputGroupAddon align="inline-end">
								<InputGroupText>
									<MailIcon />
								</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</div>

					{/* Both sides icons */}
					<div className="flex flex-col gap-2">
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
					</div>

					{/* Start text prefix */}
					<div className="flex flex-col gap-2">
						<Label>Currency prefix</Label>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText>&pound;</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="0.00" />
						</InputGroup>
					</div>

					{/* End text suffix */}
					<div className="flex flex-col gap-2">
						<Label>Percentage suffix</Label>
						<InputGroup>
							<InputGroupInput placeholder="0" />
							<InputGroupAddon align="inline-end">
								<InputGroupText>%</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</div>

					{/* URL-style with prefix text */}
					<div className="flex flex-col gap-2">
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
					</div>

					{/* With button end */}
					<div className="flex flex-col gap-2">
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
					</div>

					{/* With clear button */}
					<div className="flex flex-col gap-2">
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
					</div>

					{/* Icon + text combined start */}
					<div className="flex flex-col gap-2">
						<Label>Hashtag channel</Label>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText>
									<HashIcon />
								</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="channel-name" />
						</InputGroup>
					</div>

					{/* @ mention */}
					<div className="flex flex-col gap-2">
						<Label>Username</Label>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<InputGroupText>
									<AtSignIcon />
								</InputGroupText>
							</InputGroupAddon>
							<InputGroupInput placeholder="username" />
						</InputGroup>
					</div>

					{/* Textarea variant */}
					<div className="flex flex-col gap-2 sm:col-span-2">
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
					</div>
				</div>
			</Group>
		</Gallery>
	),
}
