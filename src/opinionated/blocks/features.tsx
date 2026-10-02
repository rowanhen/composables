import { useState } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { Avatar } from '../avatar'
import { BentoCell, BentoGrid } from '../layout-bento'
import { cn } from '../../lib/utils'
import {
	BlockAction,
	BlockHeading,
	BlockImage,
	BlockSection,
	type BlockBaseProps,
	type BlockCTA,
	type BlockMedia,
} from './shared'

type FeatureItem = { id: string; title: string; description: string; media: BlockMedia }

export interface Feature01Props extends BlockBaseProps {
	items: FeatureItem[]
}
export function Feature01({ items, variant, animation, className }: Feature01Props) {
	const [active, setActive] = useState(0)
	const current = items[active]
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<div className="grid gap-10 md:grid-cols-2">
				<div className="divide-y divide-[var(--border-default)] border-y border-stroke-default">
					{items.map((item, index) => (
						<button
							key={item.id}
							type="button"
							onClick={() => setActive(index)}
							aria-pressed={active === index}
							className={cn(
								'group flex w-full items-start gap-5 py-6 text-left transition-colors',
								active === index ? 'text-default' : 'text-[var(--text-muted)] hover:text-default',
							)}
						>
							<span className="pt-1 text-xs tabular-nums">{item.id}</span>
							<span className="flex-1">
								<span className="block font-heading text-2xl">{item.title}</span>
								{active === index && (
									<span className="mt-3 block max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
										{item.description}
									</span>
								)}
							</span>
							<ArrowRightIcon className="mt-1 size-4" />
						</button>
					))}
				</div>
				<div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
					{current && <BlockImage media={current.media} />}
				</div>
			</div>
		</BlockSection>
	)
}

export interface Feature02Props extends BlockBaseProps {
	title: string
	description: string
	image: string
	imageAlt: string
	steps: { number: string; title: string; description: string }[]
}
export function Feature02({
	title,
	description,
	image,
	imageAlt,
	steps,
	animation,
	className,
}: Feature02Props) {
	const midpoint = Math.ceil(steps.length / 2)
	const Step = ({
		number,
		title: stepTitle,
		description: stepDescription,
	}: (typeof steps)[number]) => (
		<div className="border-t border-stroke-default pt-5">
			<span className="text-xs text-brand">{number}</span>
			<h3 className="mt-4 text-xl font-semibold">{stepTitle}</h3>
			<p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{stepDescription}</p>
		</div>
	)
	return (
		<BlockSection animation={animation} className={className}>
			<div className="grid gap-8 md:grid-cols-2">
				<BlockHeading title={title} />
				<p className="self-end text-[var(--text-secondary)]">{description}</p>
			</div>
			<div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr_1fr]">
				<div className="flex flex-col justify-around gap-8">
					{steps.slice(0, midpoint).map((step) => (
						<Step key={step.number} {...step} />
					))}
				</div>
				<div className="min-h-[34rem] overflow-hidden rounded-xl bg-surface-accent">
					<BlockImage media={{ src: image, alt: imageAlt }} />
				</div>
				<div className="flex flex-col justify-around gap-8">
					{steps.slice(midpoint).map((step) => (
						<Step key={step.number} {...step} />
					))}
				</div>
			</div>
		</BlockSection>
	)
}

export interface Feature03Props extends BlockBaseProps {
	title: string
	description: string
	items: FeatureItem[]
}
export function Feature03({
	title,
	description,
	items,
	variant,
	animation,
	className,
}: Feature03Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<div className="grid gap-12 lg:grid-cols-2">
				<div className="self-start lg:sticky lg:top-12">
					<BlockHeading title={title} description={description} />
				</div>
				<div className="space-y-14">
					{items.map((item) => (
						<article key={item.id}>
							<div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
								<BlockImage media={item.media} />
							</div>
							<div className="mt-5 flex gap-5 border-t border-stroke-default pt-5">
								<span className="text-xs text-[var(--text-muted)]">{item.id}</span>
								<div>
									<h3 className="text-xl font-semibold">{item.title}</h3>
									<p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
										{item.description}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</BlockSection>
	)
}

export interface Cta01Props extends BlockBaseProps {
	title: string
	description: string
	cta?: BlockCTA
}
export function Cta01({ title, description, cta, className }: Cta01Props) {
	return (
		<BlockSection className={cn('text-center', className)}>
			<BlockHeading title={title} description={description} centered className="[&_p]:mx-auto" />
			<BlockAction action={cta} className="mt-8" />
		</BlockSection>
	)
}

type BentoMedia = { src: string; title: string }
type BentoItem = { title: string; description: string; media: BentoMedia }
export interface BentoGrids01Props extends BlockBaseProps {
	primary: BentoItem & { cta?: BlockCTA }
	items: BentoItem[]
}
export function BentoGrids01({ primary, items, className }: BentoGrids01Props) {
	return (
		<BlockSection className={className}>
			<BentoGrid cols={3} className="gap-3 bg-transparent p-0">
				<BentoCell
					colSpan={2}
					rowSpan={2}
					className="relative flex min-h-[32rem] flex-col justify-end overflow-hidden p-0"
				>
					<BlockImage
						media={{ src: primary.media.src, alt: primary.media.title }}
						className="absolute inset-0"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
					<div className="relative p-8 text-white">
						<h2 className="font-heading text-3xl">{primary.title}</h2>
						<p className="mt-3 max-w-md text-sm">{primary.description}</p>
						<BlockAction action={primary.cta} className="mt-6" />
					</div>
				</BentoCell>
				{items.map((item) => (
					<BentoCell
						key={item.title}
						className="relative flex min-h-56 flex-col justify-end overflow-hidden p-0"
					>
						<BlockImage
							media={{ src: item.media.src, alt: item.media.title }}
							className="absolute inset-0"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
						<div className="relative p-5 text-white">
							<h3 className="text-lg font-semibold">{item.title}</h3>
							<p className="mt-2 text-xs">{item.description}</p>
						</div>
					</BentoCell>
				))}
			</BentoGrid>
		</BlockSection>
	)
}

export interface Testimonials01Props extends BlockBaseProps {
	quote: string
	author: { name: string; role: string; avatar: { src?: string; alt?: string; fallback: string } }
}
export function Testimonials01({ quote, author, className }: Testimonials01Props) {
	return (
		<BlockSection className={cn('text-center', className)}>
			<figure className="mx-auto max-w-3xl py-12">
				<blockquote className="font-heading text-2xl leading-snug tracking-tight md:text-4xl">
					“{quote}”
				</blockquote>
				<figcaption className="mt-9 flex items-center justify-center gap-4 text-left">
					<Avatar
						src={author.avatar.src}
						alt={author.avatar.alt ?? author.name}
						fallback={author.avatar.fallback}
						size="lg"
					/>
					<span>
						<span className="block text-sm font-semibold">{author.name}</span>
						<span className="mt-1 block text-xs text-[var(--text-muted)]">{author.role}</span>
					</span>
				</figcaption>
			</figure>
		</BlockSection>
	)
}
