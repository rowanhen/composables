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
			two_col: "grid grid-cols-1 md:grid-cols-2 gap-6",
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
};

function FAQAccordion({ items, className, intensity = "standard" }: FAQAccordionProps) {
	return (
		<Accordion
			multiple
			variant={intensity === "bold" ? "flush" : "default"}
			className={cn(
				intensity === "bold" && "border-0 text-inverse",
				className,
			)}
		>
			{items.map((item) => (
				<AccordionItem key={item.question} value={item.question}>
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
