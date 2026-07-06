import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeRealExamplesProps } from "./KnowledgeRealExamples.types";

/**
 * CLAUDE.md Part 18's Real Examples section: concrete, fictional scenarios
 * (`article.realExamples`) that make the core concepts tangible — the same
 * "believable fictional data, not Lorem Ipsum" approach the homepage's
 * Product Showcase uses (CLAUDE.md Part 14).
 */
export function KnowledgeRealExamples({ article, className }: KnowledgeRealExamplesProps) {
  return (
    <section id="real-examples" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Real examples
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        {article.realExamples.map((example) => (
          <Card key={example.title} className="p-5">
            <Heading variant="h5" as="h3">
              {example.title}
            </Heading>
            <Text variant="body" className="mt-2">
              {example.description}
            </Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
