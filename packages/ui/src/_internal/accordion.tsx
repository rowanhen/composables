import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn, FOCUS_RING } from '../lib/utils';

const accordionVariants = cva("flex w-full flex-col", {
	variants: {
		variant: {
			default: "overflow-hidden rounded-md border",
			flush: "",
			separated: "gap-2",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Accordion({
	className,
	variant = "default",
	...props
}: AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			data-variant={variant}
			className={cn(accordionVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"data-open:bg-muted/50 not-last:border-b",
				"[[data-variant=separated]>&]:rounded-md [[data-variant=separated]>&]:border [[data-variant=separated]>&]:not-last:border-b",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"**:data-[slot=accordion-trigger-icon]:text-muted-foreground gap-6 p-2 text-left text-xs/relaxed font-medium hover:underline active:opacity-80 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between rounded-sm border border-transparent transition-[opacity,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-disabled",
					FOCUS_RING,
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					data-slot="accordion-trigger-icon"
					className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				/>
				<ChevronUpIcon
					data-slot="accordion-trigger-icon"
					className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className="data-open:animate-accordion-down data-closed:animate-accordion-up px-2 text-xs/relaxed overflow-hidden"
			{...props}
		>
			<div
				className={cn(
					"pt-0 pb-4 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	accordionVariants,
};
