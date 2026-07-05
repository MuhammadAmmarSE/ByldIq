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

import type { CaseStudyFaqSectionProps } from "./CaseStudyFaqSection.types";

/**
 * CLAUDE.md Part 21's FAQ section — the on-page interactive accordion.
 * FAQPage structured data (for search engines) is added separately in
 * the SEO phase, mirroring `SolutionFaqSection`'s split between the
 * visible accordion and the JSON-LD that describes the same content to
 * crawlers.
 */
export function CaseStudyFaqSection({ caseStudy, className }: CaseStudyFaqSectionProps) {
  const analytics = useAnalytics();

  return (
    <section id="faq" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Common questions
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(question) => {
          if (question) {
            analytics.track("case_study_faq_expanded", { slug: caseStudy.slug, question });
          }
        }}
      >
        {caseStudy.faqs.map((faq) => (
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
