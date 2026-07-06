import { Check } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeExecutiveSummaryProps } from "./KnowledgeExecutiveSummary.types";

/**
 * CLAUDE.md Part 18's Executive Summary section: who the article is for
 * and what a reader will learn, so visitors can decide whether to keep
 * reading before investing the full reading time. Each keeps a stable
 * `id` (`#who-this-is-for`, `#what-youll-learn`) for the sticky
 * sidebar/scrollspy a later phase adds.
 */
export function KnowledgeExecutiveSummary({ article, className }: KnowledgeExecutiveSummaryProps) {
  return (
    <div className={cn("space-y-10", className)}>
      <section id="who-this-is-for" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          Who this is for
        </Heading>
        <ul className="flex flex-wrap gap-2">
          {article.audience.map((audience) => (
            <li key={audience}>
              <Text
                variant="caption"
                className="bg-surface-raised rounded-full px-3 py-1 whitespace-nowrap"
              >
                {audience}
              </Text>
            </li>
          ))}
        </ul>
      </section>

      <section id="what-youll-learn" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          What you&apos;ll learn
        </Heading>
        <ul className="space-y-3">
          {article.learningOutcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5">
              <span className="bg-accent/10 text-accent mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon icon={Check} size="xs" />
              </span>
              <Text variant="body">{outcome}</Text>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
