import type { ComponentPropsWithoutRef } from "react";
import type * as AccordionPrimitive from "@radix-ui/react-accordion";

export type AccordionSingleProps = Extract<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  { type: "single" }
>;
export type AccordionMultipleProps = Extract<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  { type: "multiple" }
>;
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;
export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;
