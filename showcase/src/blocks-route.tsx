import { Link } from '@tanstack/react-router'
import { Container } from '@/components/ui-opinionated/container'
import { blockExamples } from './block-examples'
import { blockPages, type BlockSlug } from './block-pages'

export function BlocksRoute() {
	return (
		<Container maxWidth="2xl" className="py-10">
			<header className="max-w-3xl">
				<h1 className="font-heading text-4xl">Page blocks</h1>
				<p className="mt-3 text-sm text-[var(--text-muted)]">
					Ready-to-compose sections built with Composables components and semantic tokens.
				</p>
			</header>
			<div className="mt-10 grid gap-8">
				{['Hero', 'Content', 'Feature', 'Call to action', 'Bento grid', 'Testimonial'].map(
					(category) => (
						<section key={category}>
							<h2 className="mb-4 text-xl font-semibold">{category}</h2>
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
								{blockPages
									.filter((page) => page.category === category)
									.map((page) => (
										<Link
											key={page.slug}
											to={page.path}
											className="rounded-lg border border-stroke-default bg-surface-default p-5 hover:bg-surface-hover"
										>
											<span className="text-sm font-medium">{page.title}</span>
											<span className="mt-1 block text-xs text-[var(--text-muted)]">
												Open block preview
											</span>
										</Link>
									))}
							</div>
						</section>
					),
				)}
			</div>
		</Container>
	)
}

export function BlockRoute({ slug }: { slug: string }) {
	const page = blockPages.find((item) => item.slug === slug)
	const Demo = page ? blockExamples[slug as BlockSlug] : undefined
	if (!page || !Demo)
		return (
			<Container maxWidth="2xl" className="py-10">
				<h1>Block not found</h1>
				<Link to="/blocks">Back to blocks</Link>
			</Container>
		)
	const index = blockPages.findIndex((item) => item.slug === slug)
	return (
		<main>
			<Container maxWidth="2xl" className="py-8">
				<nav className="text-xs text-[var(--text-muted)]">
					<Link to="/blocks" className="hover:text-default">
						Blocks
					</Link>{' '}
					/ {page.category}
				</nav>
				<div className="mt-3">
					<h1 className="font-heading text-3xl">{page.title}</h1>
					<p className="mt-1 text-sm text-[var(--text-muted)]">{page.category} block</p>
				</div>
			</Container>
			<div className="border-y border-stroke-default">
				<Demo />
			</div>
			<Container maxWidth="2xl" className="flex justify-between gap-4 py-8 text-sm">
				{index > 0 ? (
					<Link to={blockPages[index - 1].path} className="hover:text-link">
						← {blockPages[index - 1].title}
					</Link>
				) : (
					<span />
				)}
				{index < blockPages.length - 1 ? (
					<Link to={blockPages[index + 1].path} className="hover:text-link">
						{blockPages[index + 1].title} →
					</Link>
				) : (
					<span />
				)}
			</Container>
		</main>
	)
}
