"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { SolutionFaqSectionProps } from "./SolutionFaqSection.types";

/**
 * CLAUDE.md Part 20's FAQs section. FAQPage structured data (for search
 * engines) is added separately in the SEO phase — this component is the
 * on-page interactive accordion. Named `SolutionFaqSection` (not
 * `SolutionFaq`) because `SolutionFaq` is already the exported type for a
 * single {question, answer} entry (`data/solution.schema.ts`).
 */
export function SolutionFaqSection({ solution, className }: SolutionFaqSectionProps) {
  const analytics = useAnalytics();

  return (
    <section id="faq" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Common questions
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(question) => {
          if (question) {
            analytics.track("solution_faq_expanded", { slug: solution.slug, question });
          }
        }}
      >
        {solution.faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <Text variant="body">{faq.answer}</Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
