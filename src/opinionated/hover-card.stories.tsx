import { CalendarDaysIcon, MapPinIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Avatar, AvatarFallback, AvatarImage } from '../_internal/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../_internal/hover-card'
import { HStack, VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Overlays/Hover card',
	parameters: {
		docs: {
			description: { component: 'Richer hover-triggered context panels.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: () => (
		<Gallery>
			<Group label="Basic">
				<HoverCard>
					<HoverCardTrigger
						href="#"
						onClick={(e) => e.preventDefault()}
						className="w-fit cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
					>
						@composables
					</HoverCardTrigger>
					<HoverCardContent>
						<HStack gap={3}>
							<Avatar size="lg">
								<AvatarImage src="images/avatar-4.svg" alt="Composables" />
								<AvatarFallback>CO</AvatarFallback>
							</Avatar>
							<VStack gap={1}>
								<Typography variant="label-200" className="font-semibold">
									Composables
								</Typography>
								<Typography variant="caption-100" className="text-muted-foreground">
									A composable design system for modern React applications.
								</Typography>
								<HStack gap={3} className="pt-1">
									<HStack gap={1} align="center">
										<MapPinIcon className="size-3 text-muted-foreground" />
										<Typography variant="caption-100" className="text-muted-foreground">
											London, UK
										</Typography>
									</HStack>
									<HStack gap={1} align="center">
										<CalendarDaysIcon className="size-3 text-muted-foreground" />
										<Typography variant="caption-100" className="text-muted-foreground">
											Joined 2017
										</Typography>
									</HStack>
								</HStack>
							</VStack>
						</HStack>
					</HoverCardContent>
				</HoverCard>
			</Group>
		</Gallery>
	),
}

export const InlineUsage: Story = {
	name: 'Inline Usage',
	render: () => (
		<Gallery>
			<Group label="Inline Usage">
				<Typography variant="body-200" className="max-w-lg">
					The project was started by{' '}
					<HoverCard>
						<HoverCardTrigger
							href="#"
							onClick={(e) => e.preventDefault()}
							className="cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
						>
							@alice
						</HoverCardTrigger>
						<HoverCardContent>
							<HStack gap={3}>
								<Avatar>
									<AvatarImage src="images/avatar-5.svg" alt="Alice" />
									<AvatarFallback>AL</AvatarFallback>
								</Avatar>
								<VStack gap={1}>
									<Typography variant="label-200" className="font-semibold">
										Alice Johnson
									</Typography>
									<Typography variant="caption-100" className="text-muted-foreground">
										Senior Engineer · Platform Team
									</Typography>
								</VStack>
							</HStack>
						</HoverCardContent>
					</HoverCard>{' '}
					and later reviewed by{' '}
					<HoverCard>
						<HoverCardTrigger
							href="#"
							onClick={(e) => e.preventDefault()}
							className="cursor-pointer underline underline-offset-4 decoration-muted-foreground/40 text-foreground font-medium"
						>
							@bob
						</HoverCardTrigger>
						<HoverCardContent>
							<HStack gap={3}>
								<Avatar>
									<AvatarImage src="images/avatar-1.svg" alt="Bob" />
									<AvatarFallback>BM</AvatarFallback>
								</Avatar>
								<VStack gap={1}>
									<Typography variant="label-200" className="font-semibold">
										Bob Martinez
									</Typography>
									<Typography variant="caption-100" className="text-muted-foreground">
										Tech Lead · Design Systems
									</Typography>
								</VStack>
							</HStack>
						</HoverCardContent>
					</HoverCard>
					.
				</Typography>
			</Group>
		</Gallery>
	),
}

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={6}></VStack>
		</Gallery>
	),
}
