import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-dg-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex min-h-11 flex-1 items-center justify-between py-4 text-left text-[15px] font-semibold text-dg-text [&[data-state=open]>span.icon-plus]:hidden [&[data-state=open]>span.icon-minus]:block [&[data-state=closed]>span.icon-minus]:hidden [&[data-state=closed]>span.icon-plus]:block",
          className
        )}
        {...props}
      >
        {children}
        <span className="icon-plus ml-3 shrink-0 text-dg-blue" aria-hidden>
          <Plus className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="icon-minus ml-3 hidden shrink-0 text-dg-blue" aria-hidden>
          <Minus className="h-4 w-4" strokeWidth={2} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "pb-4 pt-0 text-[14px] leading-relaxed text-dg-muted",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
