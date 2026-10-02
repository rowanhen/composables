export const blockPageMeta = [
	...(
		[
			'hero-01',
			'hero-02',
			'hero-03',
			'hero-04',
			'hero-05',
			'hero-06',
			'hero-07',
			'hero-08',
			'hero-09',
			'hero-10',
			'hero-11',
			'hero-12',
			'hero-13',
			'hero-14',
		] as const
	).map((slug) => ({ slug, category: 'Hero' })),
	...(
		['content-02', 'content-04', 'content-06', 'content-07', 'content-09', 'content-11'] as const
	).map((slug) => ({ slug, category: 'Content' })),
	...(['feature-01', 'feature-02', 'feature-03'] as const).map((slug) => ({
		slug,
		category: 'Feature',
	})),
	{ slug: 'cta-01', category: 'Call to action' },
	{ slug: 'bento-grids-01', category: 'Bento grid' },
	{ slug: 'testimonials-01', category: 'Testimonial' },
] as const

export type BlockSlug = (typeof blockPageMeta)[number]['slug']

export const blockPages = blockPageMeta.map((page) => ({
	...page,
	path: `/blocks/${page.slug}`,
	title: page.slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' '),
}))
