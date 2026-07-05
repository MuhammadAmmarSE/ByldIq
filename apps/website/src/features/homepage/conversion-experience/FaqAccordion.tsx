"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import { FAQS } from "./data/faqs";

export interface FaqAccordionProps {
  className?: string;
}

/** CLAUDE.md Part 19's FAQ section, built on the design system's Accordion. */
export function FaqAccordion({ className }: FaqAccordionProps) {
  const analytics = useAnalytics();

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(className)}
      onValueChange={(id) => {
        const faq = FAQS.find((candidate) => candidate.id === id);
        if (faq) analytics.track("conversion_faq_expanded", { question: faq.question });
      }}
    >
      {FAQS.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
