import { Link } from '@tanstack/react-router'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { Container } from '@/components/ui-opinionated/container'
import { showcaseGroups } from './showcase-pages'

export function CatalogPage() {
	return (
		<Container maxWidth="2xl" className="py-10">
			<VStack gap={10}>
				<header className="max-w-3xl">
					<Typography variant="heading-500" as="h1">
						Component gallery
					</Typography>
					<Typography variant="body-200" className="mt-3 text-muted-foreground">
						Browse every showcase section as an isolated route, or run the full showcase as a single
						regression sweep.
					</Typography>
					<HStack gap={3} className="mt-6 flex-wrap">
						<Link
							to="/showcase"
							className="rounded-md border border-stroke bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
						>
							Full showcase
						</Link>
					</HStack>
				</header>

				{showcaseGroups.map((group) => (
					<section key={group.category}>
						<Typography variant="heading-300" as="h2">
							{group.category}
						</Typography>
						<div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
							{group.pages.map((page) => (
								<Link
									key={page.slug}
									to={page.path}
									className="min-h-32 rounded-md border border-stroke/50 bg-background p-4 hover:border-stroke hover:bg-muted"
								>
									<Typography variant="heading-200">{page.title}</Typography>
									<Typography variant="body-100" className="mt-2 text-muted-foreground">
										{page.description}
									</Typography>
								</Link>
							))}
						</div>
					</section>
				))}
			</VStack>
		</Container>
	)
}
