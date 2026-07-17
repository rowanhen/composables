import { Link } from '@tanstack/react-router'
import { HStack, VStack } from '@/components/_internal/stack'
import { Typography } from '@/components/_internal/typography'
import { Container } from '@/components/ui-opinionated/container'
import { cn } from '@/lib/utils'
import { aiElementPages, aiElementPagesBySlug } from './ai-elements-registry'
import type { AIElementSlug } from './ai-elements-pages'

export function AIElementRoute({ slug }: { slug: AIElementSlug }) {
	const page = aiElementPagesBySlug[slug]
	const currentIndex = aiElementPages.findIndex((aiPage) => aiPage.slug === slug)
	const previousPage = currentIndex > 0 ? aiElementPages[currentIndex - 1] : undefined
	const nextPage =
		currentIndex < aiElementPages.length - 1 ? aiElementPages[currentIndex + 1] : undefined
	const Demo = page.Component

	return (
		<Container maxWidth="2xl" className="py-10">
			<VStack gap={8}>
				<header className="max-w-3xl">
					<HStack gap={2} align="center" className="mb-4 text-muted-foreground">
						<Link to="/" className="text-sm font-medium hover:text-foreground">
							Components
						</Link>
						<span aria-hidden="true">/</span>
						<Link to="/ai-elements" className="text-sm font-medium hover:text-foreground">
							AI elements
						</Link>
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
					{previousPage ? <AIElementPager page={previousPage} label="Previous" /> : <div />}
					{nextPage ? (
						<AIElementPager page={nextPage} label="Next" className="sm:text-right" />
					) : (
						<div />
					)}
				</nav>
			</VStack>
		</Container>
	)
}

function AIElementPager({
	page,
	label,
	className,
}: {
	page: (typeof aiElementPages)[number]
	label: string
	className?: string
}) {
	return (
		<Link
			to={page.path}
			className={cn(
				'rounded-md border border-stroke/50 bg-background p-4 hover:border-stroke hover:bg-muted',
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
