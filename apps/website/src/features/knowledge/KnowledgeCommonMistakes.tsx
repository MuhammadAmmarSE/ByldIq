import { TriangleAlert } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeCommonMistakesProps } from "./KnowledgeCommonMistakes.types";

/**
 * CLAUDE.md Part 18's Common Mistakes section: what teams get wrong
 * (`article.commonMistakes`) and the consequence of getting it wrong —
 * rendered with the same visual weight as `TechnologyStrengthsWeaknesses`'
 * weaknesses list, since downplaying a genuine mistake would undercut the
 * article's teaching value.
 */
export function KnowledgeCommonMistakes({ article, className }: KnowledgeCommonMistakesProps) {
  return (
    <section id="common-mistakes" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Common mistakes
      </Heading>
      <ul className="space-y-4">
        {article.commonMistakes.map((mistake) => (
          <li key={mistake.mistake} className="flex items-start gap-2.5">
            <span className="bg-danger/10 text-danger mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
              <Icon icon={TriangleAlert} size="xs" />
            </span>
            <div>
              <Text variant="body" className="font-medium">
                {mistake.mistake}
              </Text>
              <Text variant="body" className="text-muted">
                {mistake.consequence}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
