import React from "react";
import { VStack } from "@/components/ui/stack";
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
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

const posts = [
	{
		category: "Design Systems",
		title: "How design tokens changed everything",
		excerpt:
			"A deep dive into the token architecture that powers 6 themes from a single codebase.",
		author: "Sophie Nguyen",
		date: "Mar 10, 2024",
		dateTime: "2024-03-10",
	},
	{
		category: "Engineering",
		title: "Building accessible accordions with Base UI",
		excerpt:
			"WAI-ARIA done right — how we wrapped Base UI primitives for zero-effort accessibility.",
		author: "James Park",
		date: "Mar 5, 2024",
		dateTime: "2024-03-05",
	},
	{
		category: "Releases",
		title: "Phase 2: Marketing component library ships",
		excerpt:
			"12 new section-level components — hero, pricing, testimonials, FAQ, and more.",
		author: "Aisha Diallo",
		date: "Mar 1, 2024",
		dateTime: "2024-03-01",
	},
];

export function BlogShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Blog Cards</Typography>
			<VStack gap={6}>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={1}>
						<Typography variant="caption-100">
							{intensity} — default size
						</Typography>
						<BlogGrid columns={3}>
							{posts.map((post) => (
								<BlogCard key={post.title} intensity={intensity}>
									<BlogCardImage className="bg-gradient-to-br from-surface-brand to-surface-emphasis" />
									<BlogCardContent>
										<BlogCardCategory>{post.category}</BlogCardCategory>
										<BlogCardTitle>{post.title}</BlogCardTitle>
										<BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
										<BlogCardMeta>
											<BlogCardAuthor name={post.author} />
											<BlogCardDate dateTime={post.dateTime}>
												{post.date}
											</BlogCardDate>
										</BlogCardMeta>
									</BlogCardContent>
								</BlogCard>
							))}
						</BlogGrid>
					</VStack>
				))}
				<VStack gap={1}>
					<Typography variant="caption-100">featured size</Typography>
					<BlogGrid columns={2}>
						{posts.slice(0, 2).map((post) => (
							<BlogCard key={post.title} intensity="standard" size="featured">
								<BlogCardImage className="bg-gradient-to-br from-surface-brand to-surface-emphasis" />
								<BlogCardContent>
									<BlogCardCategory>{post.category}</BlogCardCategory>
									<BlogCardTitle>{post.title}</BlogCardTitle>
									<BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
									<BlogCardMeta>
										<BlogCardAuthor name={post.author} />
										<BlogCardDate dateTime={post.dateTime}>
											{post.date}
										</BlogCardDate>
									</BlogCardMeta>
								</BlogCardContent>
							</BlogCard>
						))}
					</BlogGrid>
				</VStack>
			</VStack>
		</VStack>
	);
}
