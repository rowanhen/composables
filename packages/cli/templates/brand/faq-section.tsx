import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// ─── FAQSection ───────────────────────────────────────────────────────────────

const faqSectionVariants = cva("group/faq w-full", {
	variants: {
		intensity: {
			subtle: "",
			standard: "",
			bold: "bg-[var(--bg-fill-brand)] rounded-xl p-8",
		},
		layout: {
			single: "max-w-2xl mx-auto",
			"two-col": "grid grid-cols-1 md:grid-cols-2 gap-6",
		},
	},
	defaultVariants: {
		intensity: "standard",
		layout: "single",
	},
});

type FAQSectionProps = React.ComponentProps<"div"> &
	VariantProps<typeof faqSectionVariants>;

function FAQSection({
	className,
	intensity = "standard",
	layout = "single",
	...props
}: FAQSectionProps) {
	return (
		<div
			data-intensity={intensity}
			className={cn(faqSectionVariants({ intensity, layout }), className)}
			{...props}
		/>
	);
}

type FAQAccordionProps = {
	items: Array<{ question: string; answer: string }>;
	className?: string;
	intensity?: "subtle" | "standard" | "bold";
	layout?: "single" | "two-col";
};

function FAQAccordionList({
	items,
	className,
	intensity = "standard",
	startIndex = 0,
}: {
	items: Array<{ question: string; answer: string }>;
	className?: string;
	intensity?: "subtle" | "standard" | "bold";
	startIndex?: number;
}) {
	return (
		<Accordion
			multiple
			variant={intensity === "bold" ? "flush" : "default"}
			className={cn(
				intensity === "bold" && "border-0 text-inverse",
				className,
			)}
		>
			{items.map((item, idx) => (
				<AccordionItem key={startIndex + idx} value={`item-${startIndex + idx}`}>
					<AccordionTrigger
						className={cn(
							intensity === "bold" &&
								"text-inverse hover:text-inverse/80",
						)}
					>
						{item.question}
					</AccordionTrigger>
					<AccordionContent
						className={cn(
							intensity === "bold" && "text-inverse/70",
						)}
					>
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

function FAQAccordion({
	items,
	className,
	intensity = "standard",
	layout = "single",
}: FAQAccordionProps) {
	if (layout === "two-col") {
		const mid = Math.ceil(items.length / 2);
		const leftItems = items.slice(0, mid);
		const rightItems = items.slice(mid);
		return (
			<>
				<FAQAccordionList
					items={leftItems}
					intensity={intensity}
					className={className}
					startIndex={0}
				/>
				<FAQAccordionList
					items={rightItems}
					intensity={intensity}
					className={className}
					startIndex={mid}
				/>
			</>
		);
	}
	return (
		<FAQAccordionList
			items={items}
			intensity={intensity}
			className={className}
			startIndex={0}
		/>
	);
}

function FAQItem({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-2", className)} {...props} />
	);
}

function FAQQuestion({
	className,
	...props
}: React.ComponentProps<"h4">) {
	return (
		<h4
			className={cn(
				"text-sm font-semibold text-foreground group-data-[intensity=bold]/faq:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FAQAnswer({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs/relaxed text-muted-foreground group-data-[intensity=bold]/faq:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

export {
	FAQSection,
	FAQAccordion,
	FAQItem,
	FAQQuestion,
	FAQAnswer,
	faqSectionVariants,
};
