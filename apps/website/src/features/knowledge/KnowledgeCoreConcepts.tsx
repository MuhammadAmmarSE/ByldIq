import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeCoreConceptsProps } from "./KnowledgeCoreConcepts.types";

/**
 * CLAUDE.md Part 18's Core Concepts section: the terms and ideas a reader
 * needs before the walkthrough/examples later in the article make sense,
 * rendered as a definition list rather than prose so it stays scannable.
 */
export function KnowledgeCoreConcepts({ article, className }: KnowledgeCoreConceptsProps) {
  return (
    <section id="core-concepts" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Core concepts
      </Heading>
      <dl className="space-y-5">
        {article.coreConcepts.map((concept) => (
          <div key={concept.term}>
            <dt>
              <Text variant="body" className="font-medium">
                {concept.term}
              </Text>
            </dt>
            <dd>
              <Text variant="body" className="text-muted">
                {concept.explanation}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
