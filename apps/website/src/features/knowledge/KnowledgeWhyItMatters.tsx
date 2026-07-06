import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeWhyItMattersProps } from "./KnowledgeWhyItMatters.types";

/**
 * CLAUDE.md Part 18's Why It Matters section: the problem the article
 * addresses, why it matters, how it plays out for both the business and
 * engineering, and its real-world relevance — grouped in one component
 * since none carry their own interactivity, but each keeps a stable `id`
 * for the sticky sidebar/scrollspy a later phase adds.
 *
 * Order matters: the problem always comes before Byld IQ's explanation of
 * why it matters, mirroring `TechnologyBusinessValue`'s "problem before
 * approach" ordering.
 */
export function KnowledgeWhyItMatters({ article, className }: KnowledgeWhyItMattersProps) {
  return (
    <div className={cn("space-y-12", className)}>
      <section id="problem" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          The problem
        </Heading>
        <Text variant="body">{article.problem}</Text>
      </section>

      <section id="why-it-matters" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          Why it matters
        </Heading>
        <Text variant="body">{article.importance}</Text>
      </section>

      <section id="business-and-engineering-context" className="max-w-3xl space-y-6">
        <Heading variant="h3" as="h2">
          Business and engineering context
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Heading variant="h5" as="h3">
              Business context
            </Heading>
            <Text variant="body">{article.businessContext}</Text>
          </div>
          <div className="space-y-1.5">
            <Heading variant="h5" as="h3">
              Engineering context
            </Heading>
            <Text variant="body">{article.engineeringContext}</Text>
          </div>
        </div>
      </section>

      <section id="real-world-relevance" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          Real-world relevance
        </Heading>
        <Text variant="body">{article.realWorldRelevance}</Text>
      </section>
    </div>
  );
}
