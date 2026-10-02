import {
	Code2Icon,
	LayoutDashboardIcon,
	Layers3Icon,
	PaletteIcon,
	SparklesIcon,
	UsersIcon,
	ZapIcon,
	type LucideIcon,
} from 'lucide-react'
import { Card } from '../card'
import { cn } from '../../lib/utils'
import {
	BlockAction,
	BlockDashboard,
	BlockHeading,
	BlockImage,
	BlockSection,
	type BlockBaseProps,
	type BlockCTA,
	type BlockMedia,
} from './shared'

type IconName = 'Palette' | 'Layers' | 'Code' | 'Users' | 'Zap' | 'LayoutDashboard' | 'Sparkles'
const icons: Record<IconName, LucideIcon> = {
	Palette: PaletteIcon,
	Layers: Layers3Icon,
	Code: Code2Icon,
	Users: UsersIcon,
	Zap: ZapIcon,
	LayoutDashboard: LayoutDashboardIcon,
	Sparkles: SparklesIcon,
}

function ItemIcon({ name }: { name?: IconName }) {
	const Icon = name ? icons[name] : SparklesIcon
	return <Icon aria-hidden="true" className="size-5 text-icon-brand" />
}

type ContentHead = BlockBaseProps & { title: string; description: string }
type ContentItem = { title: string; description: string; media: BlockMedia; icon?: IconName }

export interface Content02Props extends ContentHead {
	items: ContentItem[]
}
export function Content02({
	title,
	description,
	items,
	variant,
	animation,
	className,
}: Content02Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<BlockHeading title={title} description={description} />
			<div className="mt-12 grid gap-8 md:grid-cols-3">
				{items.map((item) => (
					<article key={item.title}>
						<div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
							<BlockImage media={item.media} />
						</div>
						<div className="mt-5 flex items-start gap-3">
							<span className="rounded-lg bg-surface-brand p-2">
								<ItemIcon name={item.icon} />
							</span>
							<div>
								<h3 className="text-lg font-semibold">{item.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
									{item.description}
								</p>
							</div>
						</div>
					</article>
				))}
			</div>
		</BlockSection>
	)
}

export interface Content04Props extends ContentHead {
	items: ContentItem[]
}
export function Content04({
	title,
	description,
	items,
	variant,
	animation,
	className,
}: Content04Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<BlockHeading title={title} description={description} />
			<div className="mt-12 grid gap-8 md:grid-cols-2">
				{items.map((item) => (
					<article key={item.title} className="border-t border-stroke-default pt-5">
						<h3 className="text-xl font-semibold">{item.title}</h3>
						<p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
							{item.description}
						</p>
						<div className="mt-7 aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
							<BlockImage media={item.media} />
						</div>
					</article>
				))}
			</div>
		</BlockSection>
	)
}

export interface Content06Props extends ContentHead {
	media: BlockMedia
	cta?: BlockCTA
}
export function Content06({
	title,
	description,
	media,
	cta,
	variant,
	animation,
	className,
}: Content06Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<div className="grid items-center gap-10 md:grid-cols-2">
				<div>
					<BlockHeading title={title} description={description} />
					<BlockAction action={cta} className="mt-8" />
				</div>
				<div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
					<BlockImage media={media} />
				</div>
			</div>
		</BlockSection>
	)
}

export interface Content07Props extends ContentHead {
	items: { title: string; content: string; media: BlockMedia; cta?: BlockCTA }[]
}
export function Content07({
	title,
	description,
	items,
	variant,
	animation,
	className,
}: Content07Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<BlockHeading title={title} description={description} />
			<div className="mt-12 grid gap-10 md:grid-cols-2">
				{items.map((item) => (
					<article key={item.title}>
						<div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-accent">
							<BlockImage media={item.media} />
						</div>
						<h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
						<p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
							{item.content}
						</p>
						<BlockAction action={item.cta} className="mt-6" arrow />
					</article>
				))}
			</div>
		</BlockSection>
	)
}

export interface Content09Props extends ContentHead {
	items: { title: string; description: string; icon?: IconName }[]
}
export function Content09({
	title,
	description,
	items,
	variant,
	animation,
	className,
}: Content09Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<BlockHeading title={title} description={description} />
			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{items.map((item) => (
					<Card key={item.title} className="min-h-48 border-stroke-default bg-surface-default">
						<div className="flex items-start gap-4">
							<span className="rounded-lg bg-surface-brand p-3">
								<ItemIcon name={item.icon} />
							</span>
							<div>
								<h3 className="text-lg font-semibold">{item.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
									{item.description}
								</p>
							</div>
						</div>
					</Card>
				))}
			</div>
		</BlockSection>
	)
}

export interface Content11Props extends ContentHead {
	feature1: { icon?: IconName; title: string; description: string }
	feature2: { icon?: IconName; title: string; description: string }
}
export function Content11({
	title,
	description,
	feature1,
	feature2,
	variant,
	animation,
	className,
}: Content11Props) {
	return (
		<BlockSection variant={variant} animation={animation} className={className}>
			<div className="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<BlockHeading title={title} description={description} />
					<div className="mt-10 space-y-8">
						{[feature1, feature2].map((feature) => (
							<div key={feature.title} className="flex gap-4 border-t border-stroke-default pt-5">
								<span className="rounded-lg bg-surface-brand p-3">
									<ItemIcon name={feature.icon} />
								</span>
								<div>
									<h3 className="font-semibold">{feature.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={cn('rounded-2xl bg-surface-accent p-5 md:p-8')}>
					<BlockDashboard />
				</div>
			</div>
		</BlockSection>
	)
}
