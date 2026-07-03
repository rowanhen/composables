import { Link } from '@tanstack/react-router'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { Container } from '@/components/ui-opinionated/container'
import { cn } from '@/lib/utils'
import { showcasePages, showcasePagesBySlug } from './showcase-registry'
import type { ShowcaseSlug } from './showcase-pages'

export function ComponentRoute({ slug }: { slug: ShowcaseSlug }) {
	const page = showcasePagesBySlug[slug]
	const currentIndex = showcasePages.findIndex((showcasePage) => showcasePage.slug === slug)
	const previousPage = currentIndex > 0 ? showcasePages[currentIndex - 1] : undefined
	const nextPage =
		currentIndex < showcasePages.length - 1 ? showcasePages[currentIndex + 1] : undefined
	const Demo = page.Component

	return (
		<Container maxWidth="2xl" className="py-10">
			<VStack gap={8}>
				<header className="max-w-3xl">
					<HStack gap={2} align="center" className="mb-4 text-muted-foreground">
						<Link to="/" className="text-sm font-medium hover:text-foreground motion-colors">
							Components
						</Link>
						<span aria-hidden="true">/</span>
						<Typography variant="caption-100">{page.category}</Typography>
					</HStack>

					<Typography variant="heading-500" as="h1">
						{page.title}
					</Typography>
					<Typography variant="body-200" className="mt-3 text-muted-foreground">
						{page.description}
					</Typography>
				</header>

				<Demo />

				<nav className="grid gap-3 border-t border-stroke/50 pt-6 sm:grid-cols-2">
					{previousPage ? <RoutePager page={previousPage} label="Previous" /> : <div />}
					{nextPage ? (
						<RoutePager page={nextPage} label="Next" className="sm:text-right" />
					) : (
						<div />
					)}
				</nav>
			</VStack>
		</Container>
	)
}

function RoutePager({
	page,
	label,
	className,
}: {
	page: (typeof showcasePages)[number]
	label: string
	className?: string
}) {
	return (
		<Link
			to={page.path}
			className={cn(
				'rounded-md border border-stroke/50 bg-background p-4 motion-colors hover:border-stroke hover:bg-muted',
				className,
			)}
		>
			<Typography variant="caption-100" className="text-muted-foreground">
				{label}
			</Typography>
			<Typography variant="body-200" className="mt-1 font-medium">
				{page.title}
			</Typography>
		</Link>
	)
}
