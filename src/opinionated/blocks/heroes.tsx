import { ArrowRightIcon, SearchIcon, SparklesIcon } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { Input } from '../input'
import { WindowFrame } from '../window-frame'
import { cn } from '../../lib/utils'
import {
	BlockAction,
	BlockActions,
	BlockDashboard,
	BlockImage,
	BlockLogos,
	BlockSection,
	type BlockBaseProps,
	type BlockCTA,
	type BlockMedia,
} from './shared'

type HeroCopy = {
	title: string
	description: string
	primaryCTA?: BlockCTA
	secondaryCTA?: BlockCTA
}
type TwoLineCopy = HeroCopy & { titleLine2: string }

export interface Hero01Props extends TwoLineCopy, BlockBaseProps {
	washImage: string
	integrationRows?: string[][]
}
export function Hero01({
	title,
	titleLine2,
	description,
	washImage,
	integrationRows,
	primaryCTA,
	className,
	animation,
}: Hero01Props) {
	return (
		<BlockSection className={cn('min-h-[42rem] text-center', className)} animation={animation}>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]">
				<img src={washImage} alt="" className="h-full w-full object-cover" />
			</div>
			<div className="relative mx-auto max-w-4xl pt-14">
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">
					{title}
					<br />
					{titleLine2}
				</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<BlockActions primary={primaryCTA} centered />
			</div>
			{integrationRows && (
				<div className="relative mx-auto mt-20 flex max-w-3xl flex-col items-center gap-3">
					{integrationRows.map((row, index) => (
						<div key={index} className="flex flex-wrap justify-center gap-3">
							{row.map((name) => (
								<span
									key={name}
									className="rounded-full border border-stroke-default bg-surface-default px-5 py-2 text-xs font-medium shadow-sm"
								>
									{name}
								</span>
							))}
						</div>
					))}
				</div>
			)}
		</BlockSection>
	)
}

export interface Hero02Props extends TwoLineCopy, BlockBaseProps {
	washImage: string
}
export function Hero02({
	title,
	titleLine2,
	description,
	washImage,
	primaryCTA,
	className,
	animation,
}: Hero02Props) {
	return (
		<BlockSection className={className} animation={animation}>
			<div className="grid min-h-[35rem] items-center gap-12 lg:grid-cols-2">
				<div>
					<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-6xl">
						{title}
						<br />
						{titleLine2}
					</h1>
					<p className="mt-6 max-w-lg text-lg text-[var(--text-secondary)]">{description}</p>
					<BlockActions primary={primaryCTA} />
				</div>
				<div className="relative min-h-96 overflow-hidden rounded-2xl bg-surface-accent">
					<img
						src={washImage}
						alt=""
						className="absolute inset-0 h-full w-full object-cover opacity-50"
					/>
					<BlockDashboard className="absolute inset-x-6 top-16 rotate-[-3deg]" />
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero03Props extends HeroCopy, BlockBaseProps {
	portraitImage: string
	portraitAlt: string
}
export function Hero03({
	title,
	description,
	portraitImage,
	portraitAlt,
	primaryCTA,
	secondaryCTA,
	className,
	animation,
}: Hero03Props) {
	return (
		<BlockSection className={cn('text-center', className)} animation={animation}>
			<div className="mx-auto max-w-3xl">
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">{title}</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<BlockActions primary={primaryCTA} secondary={secondaryCTA} centered />
			</div>
			<div className="mx-auto mt-14 h-[30rem] max-w-4xl overflow-hidden rounded-t-[8rem] [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
				<BlockImage media={{ src: portraitImage, alt: portraitAlt }} priority />
			</div>
		</BlockSection>
	)
}

export interface Hero04Props extends TwoLineCopy, BlockBaseProps {
	washImage: string
	primaryImage: string
	secondaryImage: string
	primaryAlt: string
	secondaryAlt: string
}
export function Hero04({
	title,
	titleLine2,
	description,
	washImage,
	primaryImage,
	secondaryImage,
	primaryAlt,
	secondaryAlt,
	primaryCTA,
	secondaryCTA,
	className,
	animation,
}: Hero04Props) {
	return (
		<BlockSection className={className} animation={animation}>
			<img
				src={washImage}
				alt=""
				className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
			/>
			<div className="relative grid min-h-[36rem] items-center gap-10 md:grid-cols-2">
				<div>
					<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-6xl">
						{title}
						<br />
						{titleLine2}
					</h1>
					<p className="mt-6 max-w-md text-[var(--text-secondary)]">{description}</p>
					<BlockActions primary={primaryCTA} secondary={secondaryCTA} />
				</div>
				<div className="relative h-[32rem]">
					<div className="absolute left-0 top-0 h-4/5 w-3/4 overflow-hidden rounded-2xl shadow-lg">
						<BlockImage media={{ src: primaryImage, alt: primaryAlt }} />
					</div>
					<div className="absolute bottom-0 right-0 h-3/5 w-1/2 overflow-hidden rounded-2xl border-8 border-[var(--bg-default)] shadow-lg">
						<BlockImage media={{ src: secondaryImage, alt: secondaryAlt }} />
					</div>
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero05Props extends HeroCopy, BlockBaseProps {
	tagline: string
	landscapeImage: string
	landscapeAlt: string
}
export function Hero05({
	tagline,
	title,
	description,
	landscapeImage,
	landscapeAlt,
	primaryCTA,
	secondaryCTA,
	className,
	animation,
}: Hero05Props) {
	return (
		<BlockSection className={className} animation={animation}>
			<div className="grid gap-8 border-t border-stroke-default pt-5 md:grid-cols-[1fr_2fr]">
				<p className="max-w-xs text-xs uppercase tracking-wider text-[var(--text-muted)]">
					{tagline}
				</p>
				<div>
					<h1 className="font-heading text-4xl leading-tight tracking-tight md:text-6xl">
						{title}
					</h1>
					<p className="mt-6 max-w-2xl text-[var(--text-secondary)]">{description}</p>
					<BlockActions primary={primaryCTA} secondary={secondaryCTA} />
				</div>
			</div>
			<div className="mt-14 h-[28rem] overflow-hidden rounded-xl">
				<BlockImage media={{ src: landscapeImage, alt: landscapeAlt }} priority />
			</div>
		</BlockSection>
	)
}

export interface Hero06Props extends HeroCopy, BlockBaseProps {
	highlight: string
	logosLabel?: string
	logos?: string[]
}
export function Hero06({
	title,
	highlight,
	description,
	primaryCTA,
	secondaryCTA,
	logosLabel,
	logos,
	className,
	animation,
}: Hero06Props) {
	return (
		<BlockSection className={cn('text-center', className)} animation={animation}>
			<div className="mx-auto max-w-4xl">
				<p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-stroke-default bg-surface-accent px-4 py-2 text-xs font-medium">
					<SparklesIcon className="size-3 text-icon-brand" /> A better way to build
				</p>
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">
					{title} <span className="text-brand">{highlight}</span>
				</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<BlockActions primary={primaryCTA} secondary={secondaryCTA} centered />
			</div>
			<div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-stroke-default bg-surface-accent p-3 shadow-xl">
				<BlockDashboard />
			</div>
			<BlockLogos label={logosLabel} logos={logos} />
		</BlockSection>
	)
}

export interface Hero07Props extends Hero05Props {}
export function Hero07({
	tagline,
	title,
	description,
	landscapeImage,
	landscapeAlt,
	primaryCTA,
	secondaryCTA,
	className,
	animation,
}: Hero07Props) {
	return (
		<BlockSection className={className} animation={animation}>
			<div className="h-[30rem] overflow-hidden rounded-xl">
				<BlockImage media={{ src: landscapeImage, alt: landscapeAlt }} priority />
			</div>
			<div className="mt-12 grid gap-8 border-t border-stroke-default pt-5 md:grid-cols-[1fr_2fr]">
				<p className="max-w-xs text-xs uppercase tracking-wider text-[var(--text-muted)]">
					{tagline}
				</p>
				<div>
					<h1 className="font-heading text-4xl leading-tight tracking-tight md:text-6xl">
						{title}
					</h1>
					<p className="mt-6 max-w-2xl text-[var(--text-secondary)]">{description}</p>
					<BlockActions primary={primaryCTA} secondary={secondaryCTA} />
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero08Props extends BlockBaseProps {
	title: string
	description: string
	socialProof: string
	avatars?: { src: string; fallback: string }[]
	cards: {
		title: string
		subtitle: string
		image: string
		imageAlt: string
		invert?: boolean
		cta?: BlockCTA
	}[]
}
export function Hero08({
	title,
	description,
	socialProof,
	avatars,
	cards,
	className,
	animation,
}: Hero08Props) {
	return (
		<BlockSection className={className} animation={animation}>
			<div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
				<div className="flex flex-col justify-center">
					<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-6xl">
						{title}
					</h1>
					<p className="mt-6 text-lg text-[var(--text-secondary)]">{description}</p>
					<div className="mt-10 flex items-center gap-4">
						<div className="flex -space-x-2">
							{avatars?.map((person, index) => (
								<Avatar
									key={index}
									src={person.src}
									fallback={person.fallback}
									className="ring-2 ring-[var(--bg-default)]"
								/>
							))}
						</div>
						<p className="text-xs font-medium text-[var(--text-muted)]">{socialProof}</p>
					</div>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{cards.map((card) => (
						<article
							key={card.title}
							className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-xl"
						>
							<BlockImage
								media={{ src: card.image, alt: card.imageAlt }}
								className="absolute inset-0"
							/>
							<div
								className={cn(
									'absolute inset-0 bg-gradient-to-t',
									card.invert
										? 'from-black/80 via-black/20 to-transparent'
										: 'from-white/90 via-white/10 to-transparent',
								)}
							/>
							<div className={cn('relative p-6', card.invert ? 'text-white' : 'text-black')}>
								<h2 className="text-2xl font-semibold">{card.title}</h2>
								<p className="mt-1 text-sm">{card.subtitle}</p>
								<BlockAction action={card.cta} className="mt-5" arrow />
							</div>
						</article>
					))}
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero09Props extends BlockBaseProps {
	title: string
	titleLine2: string
	description: string
	searchPlaceholder: string
	searchButtonText: string
	heroImage: string
	heroAlt: string
	bottomTitle: string
	bottomTitleLine2: string
	bottomText: string
	onSearch?: (query: string) => void
}
export function Hero09({
	title,
	titleLine2,
	description,
	searchPlaceholder,
	searchButtonText,
	heroImage,
	heroAlt,
	bottomTitle,
	bottomTitleLine2,
	bottomText,
	onSearch,
	className,
	animation,
}: Hero09Props) {
	const [query, setQuery] = useState('')
	return (
		<BlockSection className={cn('text-center', className)} animation={animation}>
			<div className="mx-auto max-w-3xl">
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">
					{title}
					<br />
					{titleLine2}
				</h1>
				<p className="mx-auto mt-5 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<form
					onSubmit={(event) => {
						event.preventDefault()
						onSearch?.(query)
					}}
					role="search"
					className="mx-auto mt-8 flex max-w-lg gap-2 rounded-full border border-stroke-default bg-surface-default p-2 shadow-sm"
				>
					<SearchIcon className="ml-3 size-5 self-center text-icon-secondary" />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder={searchPlaceholder}
						aria-label={searchPlaceholder}
						className="min-w-0 flex-1 border-0 bg-transparent shadow-none"
					/>
					<Button type="submit" shape="pill" className="min-h-10 px-5">
						{searchButtonText}
					</Button>
				</form>
			</div>
			<div className="mx-auto mt-12 h-[29rem] max-w-5xl overflow-hidden rounded-t-[8rem] [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
				<BlockImage media={{ src: heroImage, alt: heroAlt }} priority />
			</div>
			<div className="grid gap-6 border-t border-stroke-default pt-8 text-left md:grid-cols-2">
				<h2 className="font-heading text-3xl md:text-4xl">
					{bottomTitle}
					<br />
					{bottomTitleLine2}
				</h2>
				<p className="max-w-lg text-[var(--text-secondary)]">{bottomText}</p>
			</div>
		</BlockSection>
	)
}

export interface Hero10Props extends HeroCopy, BlockBaseProps {
	titleLine2Prefix: string
	titleHighlight: string
	socialProof: string
	images: string[]
	imageAlts: string[]
}
export function Hero10({
	title,
	titleLine2Prefix,
	titleHighlight,
	description,
	socialProof,
	images,
	imageAlts,
	primaryCTA,
	secondaryCTA,
	className,
	animation,
}: Hero10Props) {
	return (
		<BlockSection className={cn('text-center', className)} animation={animation}>
			<div className="mx-auto max-w-4xl">
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">
					{title}
					<br />
					{titleLine2Prefix} <span className="text-brand">{titleHighlight}</span>
				</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<BlockActions primary={primaryCTA} secondary={secondaryCTA} centered />
				<p className="mt-8 text-xs uppercase tracking-wider text-[var(--text-muted)]">
					{socialProof}
				</p>
			</div>
			<div className="relative mx-auto mt-14 flex h-80 max-w-4xl items-center justify-center sm:h-[28rem]">
				{images.slice(0, 3).map((src, index) => (
					<div
						key={src}
						className={cn(
							'absolute h-4/5 w-[45%] overflow-hidden rounded-xl border-4 border-[var(--bg-default)] shadow-lg',
							index === 0 && '-translate-x-1/2 -rotate-12',
							index === 1 && 'z-10 translate-y-3',
							index === 2 && 'translate-x-1/2 rotate-12',
						)}
					>
						<BlockImage media={{ src, alt: imageAlts[index] ?? '' }} />
					</div>
				))}
			</div>
		</BlockSection>
	)
}

export interface Hero11Props extends BlockBaseProps {
	title: string
	description: string
	featureText: string
	featureHref: string
}
export function Hero11({
	title,
	description,
	featureText,
	featureHref,
	className,
	animation,
	variant,
}: Hero11Props) {
	return (
		<BlockSection className={className} variant={variant} animation={animation}>
			<div className="grid min-h-[34rem] items-center gap-12 lg:grid-cols-2">
				<div>
					<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-6xl">
						{title}
					</h1>
					<p className="mt-6 max-w-lg text-lg text-[var(--text-secondary)]">{description}</p>
					<a
						href={featureHref}
						className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-link hover:underline"
					>
						{featureText}
						<ArrowRightIcon className="size-4" />
					</a>
				</div>
				<WindowFrame
					title="Product workspace"
					contentClassName="relative min-h-96 bg-surface-accent p-5"
					className="[mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
				>
					<div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
						<div className="rounded-xl border border-stroke-default bg-surface-default p-4">
							<p className="text-sm font-medium">Issues</p>
							{['Review onboarding flow', 'Publish component docs', 'Refine navigation'].map(
								(item, index) => (
									<div
										key={item}
										className="mt-4 flex items-center gap-3 border-t border-stroke-default pt-4 text-xs"
									>
										<span className="text-icon-brand">●</span>
										<span>{item}</span>
										<span className="ml-auto text-[var(--text-muted)]">{index + 1}</span>
									</div>
								),
							)}
						</div>
						<div className="rounded-xl border border-stroke-default bg-surface-default p-4 text-xs">
							<p className="font-medium">Properties</p>
							<p className="mt-5 text-[var(--text-muted)]">Status</p>
							<p className="mt-2 rounded-full bg-surface-brand px-2 py-1 text-brand">In progress</p>
							<p className="mt-5 text-[var(--text-muted)]">Priority</p>
							<p className="mt-2">High</p>
						</div>
					</div>
					<div className="absolute bottom-3 right-4 w-3/5 rounded-xl border border-stroke-default bg-surface-default p-4 shadow-lg">
						<p className="flex items-center gap-2 text-xs font-medium">
							<SparklesIcon className="size-4 text-icon-brand" /> Agent activity
						</p>
						<p className="mt-3 text-xs text-[var(--text-muted)]">
							Reviewing your workspace and preparing next steps...
						</p>
					</div>
				</WindowFrame>
			</div>
		</BlockSection>
	)
}

export interface Hero12Props extends BlockBaseProps {
	title: string
	established: string
	description: string
	backgroundImage: string
	backgroundAlt: string
	primaryCTA?: BlockCTA
}
export function Hero12({
	title,
	established,
	description,
	backgroundImage,
	backgroundAlt,
	primaryCTA,
	className,
	animation,
}: Hero12Props) {
	return (
		<BlockSection
			fullWidth
			className={cn('flex min-h-[42rem] items-end py-0 text-white', className)}
			animation={animation}
		>
			<BlockImage
				media={{ src: backgroundImage, alt: backgroundAlt }}
				className="absolute inset-0"
				priority
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
			<div className="relative mx-auto flex w-full max-w-[90rem] flex-col justify-between gap-20 px-8 py-10 md:min-h-[42rem]">
				<div className="flex items-start justify-between gap-5">
					<h1 className="font-heading text-6xl leading-none tracking-tight md:text-8xl">{title}</h1>
					<span className="text-xs uppercase tracking-widest">{established}</span>
				</div>
				<div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
					<p className="max-w-xl text-lg leading-relaxed">{description}</p>
					<BlockAction action={primaryCTA} className="bg-white text-black" arrow />
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero13Props extends BlockBaseProps {
	title: string
	titleLine2: string
	meta: string
	eyebrow: string
	description: string
	primaryImage: BlockMedia
	secondaryImage: BlockMedia
}
export function Hero13({
	title,
	titleLine2,
	meta,
	eyebrow,
	description,
	primaryImage,
	secondaryImage,
	variant,
	animation,
	className,
}: Hero13Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<div className="grid min-h-[38rem] gap-10 md:grid-cols-[3fr_2fr]">
				<div className="flex flex-col justify-between">
					<div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--text-muted)]">
						<span>{eyebrow}</span>
						<span>{meta}</span>
					</div>
					<div>
						<h1 className="font-heading text-7xl leading-none tracking-tight md:text-8xl">
							{title}
							<br />
							{titleLine2}
						</h1>
						<p className="mt-8 max-w-md text-[var(--text-secondary)]">{description}</p>
					</div>
				</div>
				<div className="relative min-h-[30rem]">
					<div className="absolute inset-x-8 top-0 h-4/5 overflow-hidden rounded-xl">
						<BlockImage media={primaryImage} />
					</div>
					<div className="absolute bottom-0 left-0 h-1/2 w-1/2 overflow-hidden rounded-xl border-8 border-[var(--bg-default)] shadow-lg">
						<BlockImage media={secondaryImage} />
					</div>
				</div>
			</div>
		</BlockSection>
	)
}

export interface Hero14Props extends HeroCopy, BlockBaseProps {
	image: string
	imageAlt: string
	logos?: string[]
}
export function Hero14({
	title,
	description,
	image,
	imageAlt,
	logos,
	primaryCTA,
	secondaryCTA,
	variant,
	animation,
	className,
}: Hero14Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={cn('text-center', className)}>
			<div className="mx-auto max-w-4xl">
				<h1 className="font-heading text-5xl leading-tight tracking-tight md:text-7xl">{title}</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">{description}</p>
				<BlockActions primary={primaryCTA} secondary={secondaryCTA} centered />
			</div>
			<div className="relative mt-14 h-[32rem] overflow-hidden rounded-2xl">
				<BlockImage media={{ src: image, alt: imageAlt }} priority />
				<WindowFrame
					title="Block builder"
					className="absolute bottom-6 left-1/2 w-[min(90%,32rem)] -translate-x-1/2 text-left shadow-xl"
					contentClassName="p-5"
				>
					<p className="mt-2 text-sm text-default">Describe the section you want to create</p>
					<div className="mt-4 flex items-center justify-between rounded-lg border border-stroke-default bg-default p-3 text-xs text-[var(--text-muted)]">
						<span>A responsive landing page hero...</span>
						<ArrowRightIcon className="size-4 text-icon-default" />
					</div>
				</WindowFrame>
			</div>
			<BlockLogos logos={logos} />
		</BlockSection>
	)
}
