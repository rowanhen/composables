import type React from 'react'
import {
	BentoGrids01,
	Content02,
	Content04,
	Content06,
	Content07,
	Content09,
	Content11,
	Cta01,
	Feature01,
	Feature02,
	Feature03,
	Hero01,
	Hero02,
	Hero03,
	Hero04,
	Hero05,
	Hero06,
	Hero07,
	Hero08,
	Hero09,
	Hero10,
	Hero11,
	Hero12,
	Hero13,
	Hero14,
	Testimonials01,
} from '@/components/ui-opinionated/blocks'
import type { BlockSlug } from './block-pages'

const photo = {
	wash: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1600&q=80',
	portrait: 'https://images.unsplash.com/photo-1746467364902-ab40952e33fe?w=1100&q=80',
	studio: 'https://images.unsplash.com/photo-1685013640715-8701bbaa2207?w=1600&q=80',
	architecture: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
	meadow: 'https://images.unsplash.com/photo-1673271044466-b23ea152130f?w=1600&q=80',
	material: 'https://images.unsplash.com/photo-1695152560286-b09a744834e1?w=1200&q=80',
	shapes: 'https://images.unsplash.com/photo-1683143724745-d66cf5ea5ce7?w=1200&q=80',
	gradient: 'https://images.unsplash.com/photo-1577083862054-7324cd025fa6?w=1200&q=80',
	lake: 'https://images.unsplash.com/photo-1758855313518-f7c9602026a0?w=1800&q=80',
}
const primary = { text: 'Get started', link: '#get-started' }
const secondary = { text: 'Learn more', link: '#learn-more', variant: 'outline' as const }
const galleryItems = [
	{
		title: 'Design',
		description: 'Compose a polished layout with clear hierarchy and adaptable visual details.',
		icon: 'Palette' as const,
		media: { src: photo.material, alt: 'Abstract material study' },
	},
	{
		title: 'Components',
		description: 'Build a consistent interface from reusable, accessible pieces.',
		icon: 'Layers' as const,
		media: { src: photo.shapes, alt: 'Geometric shapes' },
	},
	{
		title: 'Development',
		description: 'Move from the first concept to a finished product with predictable APIs.',
		icon: 'Code' as const,
		media: { src: photo.gradient, alt: 'Warm abstract gradient' },
	},
]
const featureItems = galleryItems.map((item, index) => ({
	id: String(index + 1).padStart(2, '0'),
	title: item.title,
	description: item.description,
	media: item.media,
}))

export const blockExamples = {
	'hero-01': () => (
		<Hero01
			title="Build what matters."
			titleLine2="Connect what works."
			description="A calm foundation for the next product you make."
			washImage={photo.wash}
			primaryCTA={primary}
			integrationRows={[
				['Notion', 'GitHub', 'Stripe'],
				['Figma', 'Raycast', 'Resend'],
			]}
		/>
	),
	'hero-02': () => (
		<Hero02
			title="Every metric that matters,"
			titleLine2="in one clear view."
			description="Keep the whole team aligned with one readable dashboard."
			washImage={photo.wash}
			primaryCTA={primary}
		/>
	),
	'hero-03': () => (
		<Hero03
			title="Ideas worth sharing with the world."
			description="Write, refine, and publish your best work from a focused workspace."
			portraitImage={photo.portrait}
			portraitAlt="Soft editorial portrait"
			primaryCTA={primary}
			secondaryCTA={secondary}
		/>
	),
	'hero-04': () => (
		<Hero04
			title="A gallery for the work"
			titleLine2="you are proud of."
			description="Give your creative projects a space that feels like a studio."
			washImage={photo.studio}
			primaryImage={photo.portrait}
			primaryAlt="Portrait artwork"
			secondaryImage={photo.wash}
			secondaryAlt="Abstract artwork"
			primaryCTA={primary}
			secondaryCTA={secondary}
		/>
	),
	'hero-05': () => (
		<Hero05
			tagline="Brand, product, and story"
			title="A creative studio for founders building something new."
			description="From the first thought to the final detail, we make useful things feel considered."
			landscapeImage={photo.studio}
			landscapeAlt="Creative studio"
			primaryCTA={primary}
			secondaryCTA={secondary}
		/>
	),
	'hero-06': () => (
		<Hero06
			title="Ship your best work,"
			highlight="without the busywork."
			description="Plan, build, and launch together in one clear workspace."
			primaryCTA={primary}
			secondaryCTA={secondary}
			logosLabel="Trusted by thoughtful teams"
			logos={['Northwind', 'Vertex', 'Lumen', 'Solstice']}
		/>
	),
	'hero-07': () => (
		<Hero07
			tagline="Architecture and interiors"
			title="Thoughtful spaces for everyday life."
			description="We shape homes that balance material, light, and the people who live there."
			landscapeImage={photo.architecture}
			landscapeAlt="Modern house"
			primaryCTA={primary}
			secondaryCTA={secondary}
		/>
	),
	'hero-08': () => (
		<Hero08
			title="Learn the craft behind great design."
			description="Practical courses taught by the people doing the work."
			socialProof="Join 40,000 makers"
			avatars={[
				{
					src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&q=80',
					fallback: 'JD',
				},
				{
					src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80',
					fallback: 'SC',
				},
			]}
			cards={[
				{
					title: 'Design fundamentals',
					subtitle: 'Start with the essentials',
					image: photo.portrait,
					imageAlt: 'Portrait study',
					invert: true,
					cta: primary,
				},
				{
					title: 'Advanced motion',
					subtitle: 'Bring interfaces to life',
					image: photo.wash,
					imageAlt: 'Abstract landscape',
					invert: true,
					cta: primary,
				},
			]}
		/>
	),
	'hero-09': () => (
		<Hero09
			title="Find the perfect"
			titleLine2="place to begin."
			description="Explore considered spaces and find one that feels like home."
			searchPlaceholder="Search spaces"
			searchButtonText="Search"
			heroImage={photo.architecture}
			heroAlt="Modern minimalist home"
			bottomTitle="Spaces"
			bottomTitleLine2="with purpose."
			bottomText="A collection of homes designed around how people live."
		/>
	),
	'hero-10': () => (
		<Hero10
			title="Build faster interfaces"
			titleLine2Prefix="with"
			titleHighlight="ready-made blocks"
			description="Start from expressive sections and make the details your own."
			socialProof="Made for product teams"
			images={[photo.studio, photo.portrait, photo.wash]}
			imageAlts={['Abstract artwork', 'Portrait study', 'Color wash']}
			primaryCTA={primary}
			secondaryCTA={secondary}
		/>
	),
	'hero-11': () => (
		<Hero11
			title="The interface system for teams and agents."
			description="Useful building blocks for planning and shipping a complete product."
			featureText="Explore compositions"
			featureHref="#compositions"
		/>
	),
	'hero-12': () => (
		<Hero12
			title="Aspen Ridge"
			established="Est. 2019"
			description="A quiet mountain retreat with long views, warm materials, and space to slow down."
			backgroundImage={photo.lake}
			backgroundAlt="Mountain lake beneath a forested ridge"
			primaryCTA={{ text: 'Reserve a stay', link: '#reserve' }}
		/>
	),
	'hero-13': () => (
		<Hero13
			title="Haven"
			titleLine2="Studio."
			meta="Portland — 2019"
			eyebrow="Craft & quiet"
			description="Rooms shaped by light, material, and the rhythm of daily life."
			primaryImage={{ src: photo.wash, alt: 'Muted abstract color wash' }}
			secondaryImage={{ src: photo.portrait, alt: 'Soft portrait artwork' }}
		/>
	),
	'hero-14': () => (
		<Hero14
			title="Describe the screen. Ship the block."
			description="Go from a simple brief to a section you can shape for your product."
			image={photo.meadow}
			imageAlt="Mountain landscape"
			logos={['Northwind', 'Vertex', 'Solstice', 'Lumen']}
			primaryCTA={{ text: 'Browse blocks', link: '#blocks' }}
			secondaryCTA={secondary}
		/>
	),
	'content-02': () => (
		<Content02
			title="Everything you need to ship"
			description="Three connected strengths for making useful products."
			items={galleryItems}
		/>
	),
	'content-04': () => (
		<Content04
			title="Build with clarity"
			description="Two focused stories with room for words and visual context."
			items={galleryItems.slice(0, 2)}
		/>
	),
	'content-06': () => (
		<Content06
			title="Ship with confidence"
			description="A clear interface makes complex work feel manageable."
			media={{ src: photo.material, alt: 'Abstract material study' }}
			cta={primary}
		/>
	),
	'content-07': () => (
		<Content07
			title="Two ways to move faster"
			description="Pair an expressive visual with concise, useful copy."
			items={galleryItems.slice(0, 2).map((item) => ({
				title: item.title,
				content: item.description,
				media: item.media,
				cta: secondary,
			}))}
		/>
	),
	'content-09': () => (
		<Content09
			title="What we offer"
			description="The parts of a useful system, working together."
			items={[
				{
					title: 'Modern design',
					description: 'A visual language with room for your own personality.',
					icon: 'Palette',
				},
				{
					title: 'Developer experience',
					description: 'Clear APIs and flexible compositions for shipping quickly.',
					icon: 'Code',
				},
				{
					title: 'Community',
					description: 'A shared foundation that gets stronger with every project.',
					icon: 'Users',
				},
				{
					title: 'Performance',
					description: 'Lightweight interfaces that feel responsive.',
					icon: 'Zap',
				},
			]}
		/>
	),
	'content-11': () => (
		<Content11
			title="Every account, one place to watch it move"
			description="Keep balances, campaigns, and payments in a single understandable view."
			feature1={{
				icon: 'LayoutDashboard',
				title: 'One view for every account',
				description: 'Find the information your team needs without switching tools.',
			}}
			feature2={{
				icon: 'Sparkles',
				title: 'Insights that update themselves',
				description: 'Spot changes early and keep the next step visible.',
			}}
		/>
	),
	'feature-01': () => <Feature01 items={featureItems} />,
	'feature-02': () => (
		<Feature02
			title="Turn a product vision into a useful interface."
			description="A simple sequence from exploration to launch."
			image={photo.architecture}
			imageAlt="Considered architecture"
			steps={[
				{
					number: '01',
					title: 'Explore',
					description: 'Find a strong starting point for your page.',
				},
				{
					number: '02',
					title: 'Customize',
					description: 'Adjust tokens, copy, and media to fit your brand.',
				},
				{
					number: '03',
					title: 'Compose',
					description: 'Arrange sections into a complete experience.',
				},
				{
					number: '04',
					title: 'Ship',
					description: 'Review the details and release with confidence.',
				},
			]}
		/>
	),
	'feature-03': () => (
		<Feature03
			title="One connected workflow."
			description="Explore, edit, and publish without losing your place."
			items={featureItems}
		/>
	),
	'cta-01': () => (
		<Cta01
			title="Make something remarkable."
			description="Start with a clear section and make it your own."
			cta={primary}
		/>
	),
	'bento-grids-01': () => (
		<BentoGrids01
			primary={{
				title: 'Build bento sections in minutes',
				description: 'Give your most important story space to breathe.',
				media: { src: photo.material, title: 'Abstract material' },
				cta: primary,
			}}
			items={galleryItems.map((item) => ({
				title: item.title,
				description: item.description,
				media: { src: item.media.src, title: item.media.alt },
			}))}
		/>
	),
	'testimonials-01': () => (
		<Testimonials01
			quote="The new sections helped our team give every page a clearer story and a consistent feel."
			author={{
				name: 'Sophie Carter',
				role: 'Product design lead',
				avatar: {
					src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
					fallback: 'SC',
				},
			}}
		/>
	),
} satisfies Record<BlockSlug, React.ComponentType>
