import React from "react";
import {
	BarChart3Icon,
	GithubIcon,
	Globe2Icon,
	LayersIcon,
	LinkedinIcon,
	PaletteIcon,
	RocketIcon,
	ShieldCheckIcon,
	SparklesIcon,
	TwitterIcon,
	ZapIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	BlogCard,
	BlogCardAuthor,
	BlogCardCategory,
	BlogCardContent,
	BlogCardDate,
	BlogCardExcerpt,
	BlogCardImage,
	BlogCardMeta,
	BlogCardTitle,
	BlogGrid,
	CTABanner,
	CTABannerActions,
	CTABannerContent,
	CTABannerEyebrow,
	CTABannerHeadline,
	CTABannerSubtitle,
	CallToAction,
	CallToActionActions,
	CallToActionBody,
	CallToActionHeadline,
	FAQAccordion,
	FAQSection,
	FeatureCard,
	FeatureCardDescription,
	FeatureCardIcon,
	FeatureCardTitle,
	FeatureGrid,
	FeatureGridDescription,
	FeatureGridIcon,
	FeatureGridItem,
	FeatureGridTitle,
	FeatureRow,
	FeatureRowContent,
	FeatureRowMedia,
	Footer,
	FooterBottom,
	FooterBrand,
	FooterBrandName,
	FooterBrandTagline,
	FooterColumn,
	FooterColumnTitle,
	FooterCopyright,
	FooterGrid,
	FooterInner,
	FooterLink,
	HeroActions,
	HeroContent,
	HeroEyebrow,
	HeroHeadline,
	HeroMedia,
	HeroSection,
	HeroSubheadline,
	LogoCloud,
	LogoCloudLabel,
	LogoItem,
	Navbar,
	NavbarActions,
	NavbarBrand,
	NavbarInner,
	NavbarLink,
	NavbarLinks,
	PricingCard,
	PricingDescription,
	PricingFeature,
	PricingFeatureList,
	PricingAmount,
	PricingPeriod,
	PricingPopularBadge,
	PricingTable,
	PricingTier,
	PricingTierName,
	PricingToggle,
	PricingPrice,
	SectionHeader,
	SectionHeaderEyebrow,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
	StatDescription,
	StatItem,
	StatLabel,
	StatValue,
	StatsBar,
	TeamCard,
	TeamCardAvatar,
	TeamCardBio,
	TeamCardName,
	TeamCardRole,
	TeamCardSocialLink,
	TeamCardSocials,
	TeamSection,
	TestimonialAuthor,
	TestimonialAvatar,
	TestimonialCard,
	TestimonialName,
	TestimonialQuote,
	TestimonialRole,
	TestimonialSection,
} from "@/components/ui-brand";
import { ShowcaseSection } from "./showcase-section";

const intensities = ["subtle", "standard", "bold"] as const;

// ─── Pricing toggle state wrapper ─────────────────────────────────────────────
function PricingShowcase() {
	const [billing, setBilling] = React.useState<"monthly" | "annual">(
		"monthly",
	);
	const monthly = { starter: "$9", pro: "$29", enterprise: "$99" };
	const annual = { starter: "$7", pro: "$23", enterprise: "$79" };
	const prices = billing === "monthly" ? monthly : annual;

	return (
		<VStack gap={4}>
			<HStack justify="center">
				<PricingToggle value={billing} onChange={setBilling} />
			</HStack>
			<PricingTable>
				<PricingCard intensity="standard">
					<PricingTier>
						<PricingTierName>Starter</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.starter}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							Perfect for indie hackers and side projects.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Up to 3 projects</PricingFeature>
						<PricingFeature>5GB storage</PricingFeature>
						<PricingFeature>Community support</PricingFeature>
						<PricingFeature included={false}>
							Custom domain
						</PricingFeature>
						<PricingFeature included={false}>Analytics</PricingFeature>
					</PricingFeatureList>
					<Button variant="outline" className="w-full mt-auto">
						Get started
					</Button>
				</PricingCard>

				<PricingCard highlighted intensity="standard">
					<PricingPopularBadge />
					<PricingTier>
						<PricingTierName>Pro</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.pro}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							For growing teams shipping fast.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Unlimited projects</PricingFeature>
						<PricingFeature>50GB storage</PricingFeature>
						<PricingFeature>Priority support</PricingFeature>
						<PricingFeature>Custom domain</PricingFeature>
						<PricingFeature>Analytics dashboard</PricingFeature>
					</PricingFeatureList>
					<Button variant="secondary" className="w-full mt-auto bg-inverse text-inverse-foreground hover:bg-inverse/90">
						Get started
					</Button>
				</PricingCard>

				<PricingCard intensity="standard">
					<PricingTier>
						<PricingTierName>Enterprise</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.enterprise}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							For large teams that need control and scale.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Unlimited everything</PricingFeature>
						<PricingFeature>500GB storage</PricingFeature>
						<PricingFeature>Dedicated support</PricingFeature>
						<PricingFeature>Custom domain</PricingFeature>
						<PricingFeature>Advanced analytics</PricingFeature>
					</PricingFeatureList>
					<Button variant="outline" className="w-full mt-auto">
						Contact sales
					</Button>
				</PricingCard>
			</PricingTable>
		</VStack>
	);
}

// ─── Navbar showcase ─────────────────────────────────────────────────────────
function NavbarShowcaseItem({
	intensity,
}: { intensity: "subtle" | "standard" | "bold" }) {
	return (
		<div className="rounded-xl overflow-hidden border border-border">
			<Navbar sticky={false} intensity={intensity}>
				<NavbarInner>
					<NavbarBrand>
						<SparklesIcon className="size-4" />
						Composables
					</NavbarBrand>
					<NavbarLinks>
						<NavbarLink href="#">Product</NavbarLink>
						<NavbarLink href="#">Pricing</NavbarLink>
						<NavbarLink href="#">Docs</NavbarLink>
					</NavbarLinks>
					<NavbarActions>
						<Button
							variant={intensity === "bold" ? "secondary" : "outline"}
							size="sm"
							className={
								intensity === "bold"
									? "bg-white/15 text-inverse border-transparent hover:bg-white/25"
									: undefined
							}
						>
							Sign in
						</Button>
						<Button
							variant={intensity === "bold" ? "secondary" : "brand"}
							size="sm"
							className={
								intensity === "bold"
									? "bg-inverse text-inverse-foreground hover:bg-inverse/90"
									: undefined
							}
						>
							Get started
						</Button>
					</NavbarActions>
				</NavbarInner>
			</Navbar>
		</div>
	);
}

// ─── Footer showcase ─────────────────────────────────────────────────────────
function FooterShowcaseItem() {
	return (
		<div className="rounded-xl overflow-hidden border border-border">
			<Footer variant="multicolumn">
				<FooterInner>
					<FooterGrid>
						<FooterBrand>
							<FooterBrandName>Composables</FooterBrandName>
							<FooterBrandTagline>
								Design system components that adapt to your brand
								through design tokens.
							</FooterBrandTagline>
						</FooterBrand>
						<FooterColumn>
							<FooterColumnTitle>Product</FooterColumnTitle>
							<FooterLink href="#">Features</FooterLink>
							<FooterLink href="#">Pricing</FooterLink>
							<FooterLink href="#">Changelog</FooterLink>
						</FooterColumn>
						<FooterColumn>
							<FooterColumnTitle>Developers</FooterColumnTitle>
							<FooterLink href="#">Documentation</FooterLink>
							<FooterLink href="#">API Reference</FooterLink>
							<FooterLink href="#">GitHub</FooterLink>
						</FooterColumn>
						<FooterColumn>
							<FooterColumnTitle>Company</FooterColumnTitle>
							<FooterLink href="#">About</FooterLink>
							<FooterLink href="#">Blog</FooterLink>
							<FooterLink href="#">Contact</FooterLink>
						</FooterColumn>
					</FooterGrid>
					<FooterBottom>
						<FooterCopyright>
							© 2024 Composables. All rights reserved.
						</FooterCopyright>
					</FooterBottom>
				</FooterInner>
			</Footer>
		</div>
	);
}

// ─── Main showcase ────────────────────────────────────────────────────────────
export function BrandShowcase() {
	return (
		<ShowcaseSection
			title="Brand"
			description="Brand & emphasis variants plus composable marketing components with 3 intensity levels."
		>
			<VStack gap={8}>
				{/* Button & Badge brand/emphasis variants */}
				<VStack gap={2}>
					<Typography variant="heading-200">
						Button &amp; Badge Variants
					</Typography>
					<HStack gap={3} wrap align="center">
						<Button variant="brand">Brand</Button>
						<Button variant="emphasis">Emphasis</Button>
						<Badge variant="brand">Brand</Badge>
						<Badge variant="emphasis">Emphasis</Badge>
					</HStack>
				</VStack>

				<Separator />

				{/* SectionHeader */}
				<VStack gap={2}>
					<Typography variant="heading-200">Section Header</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<SectionHeader
								key={intensity}
								intensity={intensity}
								align="start"
							>
								<SectionHeaderEyebrow>
									{intensity}
								</SectionHeaderEyebrow>
								<SectionHeaderTitle>
									Build something great
								</SectionHeaderTitle>
								<SectionHeaderSubtitle>
									Composable components that adapt to your brand
									automatically through design tokens.
								</SectionHeaderSubtitle>
							</SectionHeader>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* CallToAction */}
				<VStack gap={2}>
					<Typography variant="heading-200">Call to Action</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<CallToAction
								key={intensity}
								intensity={intensity}
								align="start"
							>
								<CallToActionHeadline>
									Ready to get started? ({intensity})
								</CallToActionHeadline>
								<CallToActionBody>
									Ship faster with token-driven components that
									transform when you switch presets.
								</CallToActionBody>
								<CallToActionActions>
									<Button
										variant={
											intensity === "bold"
												? "secondary"
												: "brand"
										}
									>
										Get Started
									</Button>
									<Button
										variant={
											intensity === "bold"
												? "ghost"
												: "outline"
										}
										className={
											intensity === "bold"
												? "text-inverse hover:bg-white/15"
												: undefined
										}
									>
										Learn More
									</Button>
								</CallToActionActions>
							</CallToAction>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* FeatureCard */}
				<VStack gap={2}>
					<Typography variant="heading-200">Feature Cards</Typography>
					{intensities.map((intensity) => (
						<div
							key={intensity}
							className="grid grid-cols-3 gap-4"
						>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<PaletteIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>
									Token-Driven ({intensity})
								</FeatureCardTitle>
								<FeatureCardDescription>
									All colors, fonts, and spacing are pulled from
									design tokens so everything stays in sync.
								</FeatureCardDescription>
							</FeatureCard>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<LayersIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>Composable</FeatureCardTitle>
								<FeatureCardDescription>
									Mix and match sub-components to build exactly
									the layout you need.
								</FeatureCardDescription>
							</FeatureCard>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<SparklesIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>Preset-Ready</FeatureCardTitle>
								<FeatureCardDescription>
									Switch presets and watch every brand component
									transform automatically.
								</FeatureCardDescription>
							</FeatureCard>
						</div>
					))}
				</VStack>

				<Separator />

				{/* HeroSection */}
				<VStack gap={2}>
					<Typography variant="heading-200">Hero Section</Typography>
					<VStack gap={4}>
						<div className="rounded-xl border border-border overflow-hidden">
							<HeroSection variant="centered" intensity="standard">
								<HeroContent>
									<HeroEyebrow>
										New — Token-driven marketing
									</HeroEyebrow>
									<HeroHeadline>
										Build pages that feel like your brand
									</HeroHeadline>
									<HeroSubheadline>
										Composable marketing sections powered by design
										tokens. Switch presets and every component
										transforms.
									</HeroSubheadline>
									<HeroActions>
										<Button variant="brand" size="lg">
											Get started free
										</Button>
										<Button variant="outline" size="lg">
											View docs
										</Button>
									</HeroActions>
								</HeroContent>
							</HeroSection>
						</div>
						<div className="rounded-xl border border-border overflow-hidden">
							<HeroSection variant="split" intensity="standard">
								<HeroContent>
									<HeroEyebrow>Split layout</HeroEyebrow>
									<HeroHeadline>
										Two columns, one message
									</HeroHeadline>
									<HeroSubheadline>
										Pair your headline with an image or visual for
										maximum impact.
									</HeroSubheadline>
									<HeroActions>
										<Button variant="brand">Get started</Button>
									</HeroActions>
								</HeroContent>
								<HeroMedia className="min-h-48 bg-gradient-to-br from-surface-brand to-surface-emphasis" />
							</HeroSection>
						</div>
						<div className="rounded-xl overflow-hidden">
							<HeroSection variant="with-background" intensity="bold">
								<HeroContent>
									<HeroEyebrow>Brand background</HeroEyebrow>
									<HeroHeadline>
										Full-bleed brand hero
									</HeroHeadline>
									<HeroSubheadline>
										Maximum brand impact with the brand fill token.
									</HeroSubheadline>
									<HeroActions>
										<Button variant="secondary" className="bg-inverse text-inverse-foreground hover:bg-inverse/90">
											Get started
										</Button>
										<Button variant="ghost" className="text-inverse hover:bg-white/15">
											Learn more
										</Button>
									</HeroActions>
								</HeroContent>
							</HeroSection>
						</div>
					</VStack>
				</VStack>

				<Separator />

				{/* Navbar */}
				<VStack gap={2}>
					<Typography variant="heading-200">Navbar</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<NavbarShowcaseItem key={intensity} intensity={intensity} />
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* Footer */}
				<VStack gap={2}>
					<Typography variant="heading-200">Footer</Typography>
					<FooterShowcaseItem />
				</VStack>

				<Separator />

				{/* TestimonialCard & Section */}
				<VStack gap={2}>
					<Typography variant="heading-200">Testimonials</Typography>
					<VStack gap={6}>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={2}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<TestimonialSection layout="grid">
									<TestimonialCard intensity={intensity}>
										<TestimonialQuote>
											This design system has saved us weeks of
											work. Every component just works.
										</TestimonialQuote>
										<TestimonialAuthor>
											<TestimonialAvatar fallback="SJ" />
											<VStack gap={0}>
												<TestimonialName>
													Sarah Johnson
												</TestimonialName>
												<TestimonialRole>
													CTO, Acme Corp
												</TestimonialRole>
											</VStack>
										</TestimonialAuthor>
									</TestimonialCard>
									<TestimonialCard intensity={intensity}>
										<TestimonialQuote>
											Switching presets is like magic. One click
											and the whole product feels different.
										</TestimonialQuote>
										<TestimonialAuthor>
											<TestimonialAvatar fallback="MK" />
											<VStack gap={0}>
												<TestimonialName>
													Marcus Klein
												</TestimonialName>
												<TestimonialRole>
													Design Lead, StartupCo
												</TestimonialRole>
											</VStack>
										</TestimonialAuthor>
									</TestimonialCard>
									<TestimonialCard intensity={intensity}>
										<TestimonialQuote>
											Token-driven theming is the future. This
											library nails the developer experience.
										</TestimonialQuote>
										<TestimonialAuthor>
											<TestimonialAvatar fallback="AL" />
											<VStack gap={0}>
												<TestimonialName>
													Ana Lima
												</TestimonialName>
												<TestimonialRole>
													Frontend Eng, DevCo
												</TestimonialRole>
											</VStack>
										</TestimonialAuthor>
									</TestimonialCard>
								</TestimonialSection>
							</VStack>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* LogoCloud */}
				<VStack gap={2}>
					<Typography variant="heading-200">Logo Cloud</Typography>
					<VStack gap={4}>
						<LogoCloudLabel>
							Trusted by teams at leading companies
						</LogoCloudLabel>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={1}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<LogoCloud layout="row" intensity={intensity}>
									{[
										"Acme Corp",
										"GlobalTech",
										"NovaSoft",
										"QuantumAI",
										"DataFlow",
										"CloudBase",
									].map((name) => (
										<LogoItem key={name} intensity={intensity}>
											<div className="font-brand font-bold text-sm text-muted-foreground px-4 py-2 rounded-md border border-border">
												{name}
											</div>
										</LogoItem>
									))}
								</LogoCloud>
							</VStack>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* StatsBar */}
				<VStack gap={2}>
					<Typography variant="heading-200">Stats Bar</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={1}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<StatsBar intensity={intensity} layout="row">
									<StatItem>
										<StatValue>10k+</StatValue>
										<StatLabel>Active users</StatLabel>
										<StatDescription>
											Across 40+ countries
										</StatDescription>
									</StatItem>
									<StatItem>
										<StatValue>99.9%</StatValue>
										<StatLabel>Uptime SLA</StatLabel>
										<StatDescription>
											Last 12 months
										</StatDescription>
									</StatItem>
									<StatItem>
										<StatValue>4.9★</StatValue>
										<StatLabel>Avg. rating</StatLabel>
										<StatDescription>
											1,200+ reviews
										</StatDescription>
									</StatItem>
									<StatItem>
										<StatValue>3min</StatValue>
										<StatLabel>Median setup</StatLabel>
										<StatDescription>
											Start to first deploy
										</StatDescription>
									</StatItem>
								</StatsBar>
							</VStack>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* PricingTable */}
				<VStack gap={2}>
					<Typography variant="heading-200">Pricing Table</Typography>
					<PricingShowcase />
				</VStack>

				<Separator />

				{/* FAQSection */}
				<VStack gap={2}>
					<Typography variant="heading-200">FAQ Section</Typography>
					<VStack gap={6}>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={1}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<FAQSection intensity={intensity}>
									<FAQAccordion
										intensity={intensity}
										items={[
											{
												question:
													"How do I switch between presets?",
												answer:
													"Use the preset selector in the top-right panel. Switching presets updates all CSS variable tokens instantly, so every component reflects the new look.",
											},
											{
												question:
													"Can I use these components without Tailwind?",
												answer:
													"These components rely on Tailwind v4 for utility classes. Tailwind v4 is required, but the token layer is standard CSS custom properties so you could theoretically port them.",
											},
											{
												question:
													"Are the components accessible?",
												answer:
													"Yes — all interactive components are built on Base UI primitives which follow WAI-ARIA patterns and manage focus correctly.",
											},
										]}
									/>
								</FAQSection>
							</VStack>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* FeatureGrid */}
				<VStack gap={2}>
					<Typography variant="heading-200">Feature Grid</Typography>
					<VStack gap={6}>
						<VStack gap={1}>
							<Typography variant="caption-100">
								Icon grid — standard
							</Typography>
							<FeatureGrid layout="grid" intensity="standard">
								{[
									{
										icon: <PaletteIcon />,
										title: "Token-Driven",
										desc: "CSS variables power every visual decision.",
									},
									{
										icon: <LayersIcon />,
										title: "Composable",
										desc: "Mix sub-components freely.",
									},
									{
										icon: <ZapIcon />,
										title: "Fast",
										desc: "Zero runtime overhead — pure CSS.",
									},
									{
										icon: <ShieldCheckIcon />,
										title: "Accessible",
										desc: "WAI-ARIA out of the box.",
									},
									{
										icon: <BarChart3Icon />,
										title: "Analytics",
										desc: "Built-in usage insights.",
									},
									{
										icon: <Globe2Icon />,
										title: "Global",
										desc: "i18n-ready from day one.",
									},
								].map((f) => (
									<FeatureGridItem key={f.title} intensity="standard">
										<FeatureGridIcon>{f.icon}</FeatureGridIcon>
										<FeatureGridTitle>{f.title}</FeatureGridTitle>
										<FeatureGridDescription>
											{f.desc}
										</FeatureGridDescription>
									</FeatureGridItem>
								))}
							</FeatureGrid>
						</VStack>
						<VStack gap={1}>
							<Typography variant="caption-100">
								Alternating rows
							</Typography>
							<FeatureGrid layout="alternating">
								<FeatureRow reverse={false}>
									<FeatureRowContent>
										<FeatureGridTitle className="text-base">
											Design tokens that scale
										</FeatureGridTitle>
										<FeatureGridDescription className="text-sm">
											A single token change propagates through your
											entire UI. Build once, theme infinitely.
										</FeatureGridDescription>
										<Button variant="brand" className="self-start mt-2">
											Learn more
										</Button>
									</FeatureRowContent>
									<FeatureRowMedia className="bg-gradient-to-br from-surface-brand to-surface-emphasis" />
								</FeatureRow>
								<FeatureRow reverse>
									<FeatureRowContent>
										<FeatureGridTitle className="text-base">
											6 presets, infinite variations
										</FeatureGridTitle>
										<FeatureGridDescription className="text-sm">
											Default, Editorial, Brutalist, Soft, Swiss,
											Midnight — pick your vibe and ship.
										</FeatureGridDescription>
										<Button variant="brand" className="self-start mt-2">
											Explore presets
										</Button>
									</FeatureRowContent>
									<FeatureRowMedia className="bg-gradient-to-br from-surface-info to-surface-emphasis" />
								</FeatureRow>
							</FeatureGrid>
						</VStack>
					</VStack>
				</VStack>

				<Separator />

				{/* CTABanner */}
				<VStack gap={2}>
					<Typography variant="heading-200">CTA Banner</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<CTABanner key={intensity} intensity={intensity} align="left">
								<CTABannerContent>
									<CTABannerEyebrow>{intensity}</CTABannerEyebrow>
									<CTABannerHeadline>
										Ready to ship your product?
									</CTABannerHeadline>
									<CTABannerSubtitle>
										Join thousands of teams building with
										Composables today. No credit card required.
									</CTABannerSubtitle>
								</CTABannerContent>
								<CTABannerActions>
									<Button
										variant={
											intensity === "bold"
												? "secondary"
												: "brand"
										}
										className={
											intensity === "bold"
												? "bg-inverse text-inverse-foreground hover:bg-inverse/90"
												: undefined
										}
									>
										Get started free
									</Button>
									<Button
										variant={
											intensity === "bold" ? "ghost" : "outline"
										}
										className={
											intensity === "bold"
												? "text-inverse hover:bg-white/15"
												: undefined
										}
									>
										Talk to sales
									</Button>
								</CTABannerActions>
							</CTABanner>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* TeamCard & Section */}
				<VStack gap={2}>
					<Typography variant="heading-200">Team</Typography>
					<VStack gap={6}>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={1}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<TeamSection columns={3}>
									{[
										{
											name: "Sophie Nguyen",
											role: "CEO & Co-founder",
											bio: "Building the future of design systems.",
											initials: "SN",
										},
										{
											name: "James Park",
											role: "CTO & Co-founder",
											bio: "Obsessed with developer experience.",
											initials: "JP",
										},
										{
											name: "Aisha Diallo",
											role: "Head of Design",
											bio: "Crafting beautiful, accessible UIs.",
											initials: "AD",
										},
									].map((member) => (
										<TeamCard key={member.name} intensity={intensity}>
											<TeamCardAvatar fallback={member.initials} />
											<TeamCardName>{member.name}</TeamCardName>
											<TeamCardRole>{member.role}</TeamCardRole>
											<TeamCardBio>{member.bio}</TeamCardBio>
											<TeamCardSocials>
												<TeamCardSocialLink href="#" aria-label="Twitter">
													<TwitterIcon />
												</TeamCardSocialLink>
												<TeamCardSocialLink href="#" aria-label="LinkedIn">
													<LinkedinIcon />
												</TeamCardSocialLink>
												<TeamCardSocialLink href="#" aria-label="GitHub">
													<GithubIcon />
												</TeamCardSocialLink>
											</TeamCardSocials>
										</TeamCard>
									))}
								</TeamSection>
							</VStack>
						))}
					</VStack>
				</VStack>

				<Separator />

				{/* BlogCard & Grid */}
				<VStack gap={2}>
					<Typography variant="heading-200">Blog Cards</Typography>
					<VStack gap={6}>
						{intensities.map((intensity) => (
							<VStack key={intensity} gap={1}>
								<Typography variant="caption-100">
									{intensity}
								</Typography>
								<BlogGrid columns={3}>
									{[
										{
											category: "Design Systems",
											title: "How design tokens changed everything",
											excerpt:
												"A deep dive into the token architecture that powers 6 themes from a single codebase.",
											author: "Sophie Nguyen",
											date: "Mar 10, 2024",
										},
										{
											category: "Engineering",
											title: "Building accessible accordions with Base UI",
											excerpt:
												"WAI-ARIA done right — how we wrapped Base UI primitives for zero-effort accessibility.",
											author: "James Park",
											date: "Mar 5, 2024",
										},
										{
											category: "Releases",
											title: "Phase 2: Marketing component library ships",
											excerpt:
												"12 new section-level components — hero, pricing, testimonials, FAQ, and more.",
											author: "Aisha Diallo",
											date: "Mar 1, 2024",
										},
									].map((post) => (
										<BlogCard
											key={post.title}
											intensity={intensity}
										>
											<BlogCardImage className="bg-gradient-to-br from-surface-brand to-surface-emphasis" />
											<BlogCardContent>
												<BlogCardCategory>
													{post.category}
												</BlogCardCategory>
												<BlogCardTitle>
													{post.title}
												</BlogCardTitle>
												<BlogCardExcerpt>
													{post.excerpt}
												</BlogCardExcerpt>
												<BlogCardMeta>
													<BlogCardAuthor name={post.author} />
													<BlogCardDate>
														{post.date}
													</BlogCardDate>
												</BlogCardMeta>
											</BlogCardContent>
										</BlogCard>
									))}
								</BlogGrid>
							</VStack>
						))}
					</VStack>
				</VStack>
			</VStack>
		</ShowcaseSection>
	);
}
