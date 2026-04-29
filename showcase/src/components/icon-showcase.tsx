// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import {
	AlertCircleIcon,
	HeartIcon,
	LoaderIcon,
	MailIcon,
	SearchIcon,
	SettingsIcon,
	StarIcon,
} from 'lucide-react'
import { Badge } from '@/components/_internal/badge'
import { Button } from '@/components/_internal/button'
import { Icon } from '@/components/_internal/icon'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { ShowcaseGroup, ShowcaseSection } from './showcase-section'

export function IconShowcase() {
	return (
		<ShowcaseSection
			title="Icon"
			description="Wrapper component for consistent icon sizing, colour inheritance, and spin animation."
		>
			<VStack gap={4}>
				<ShowcaseGroup label="Sizes">
					<HStack gap={4} align="center">
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
							<VStack key={size} gap={1} align="center">
								<Icon size={size}>
									<StarIcon />
								</Icon>
								<Typography variant="caption-100">{size}</Typography>
							</VStack>
						))}
					</HStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Spin animation">
					<HStack gap={4} align="center">
						<Icon spin>
							<LoaderIcon />
						</Icon>
						<Icon size="lg" spin>
							<SettingsIcon />
						</Icon>
						<Icon size="xl" spin>
							<LoaderIcon />
						</Icon>
					</HStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Colour inheritance">
					<HStack gap={4} align="center">
						<span className="text-foreground">
							<Icon size="lg">
								<HeartIcon />
							</Icon>
						</span>
						<span className="text-danger">
							<Icon size="lg">
								<AlertCircleIcon />
							</Icon>
						</span>
						<span className="text-muted-foreground">
							<Icon size="lg">
								<SearchIcon />
							</Icon>
						</span>
						<span className="text-primary">
							<Icon size="lg">
								<MailIcon />
							</Icon>
						</span>
					</HStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Inside Button">
					<HStack gap={3} align="center">
						<Button size="sm">
							<Icon size="sm">
								<MailIcon />
							</Icon>
							Send
						</Button>
						<Button variant="outline">
							<Icon>
								<SearchIcon />
							</Icon>
							Search
						</Button>
						<Button size="lg" variant="secondary">
							<Icon size="lg">
								<SettingsIcon />
							</Icon>
							Settings
						</Button>
					</HStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Inside Badge">
					<HStack gap={3} align="center">
						<Badge variant="default">
							<Icon size="xs">
								<StarIcon />
							</Icon>
							Featured
						</Badge>
						<Badge variant="destructive">
							<Icon size="xs">
								<AlertCircleIcon />
							</Icon>
							Error
						</Badge>
						<Badge variant="success">
							<Icon size="xs">
								<HeartIcon />
							</Icon>
							Healthy
						</Badge>
					</HStack>
				</ShowcaseGroup>
			</VStack>
		</ShowcaseSection>
	)
}
