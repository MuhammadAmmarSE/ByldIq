import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyFutureRoadmapProps } from "./CaseStudyFutureRoadmap.types";

const SOURCE_LABEL = {
  client: "Client plan",
  "byld-recommendation": "Byld IQ recommendation",
} as const;

/**
 * Milestone 12's Future Roadmap section (CLAUDE.md Part 12): "Make it
 * clear which items are actual client/project plans versus Byld IQ
 * recommendations" — each item is tagged with its real source rather
 * than presented as one undifferentiated wishlist.
 */
export function CaseStudyFutureRoadmap({ caseStudy, className }: CaseStudyFutureRoadmapProps) {
  return (
    <section id="future-roadmap" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        What&apos;s next
      </Heading>

      <ul className="space-y-3">
        {caseStudy.futureRoadmap.map((roadmapItem) => (
          <li
            key={roadmapItem.item}
            className="border-border flex items-start justify-between gap-4 border-b pb-3 last:border-b-0"
          >
            <Text variant="body">{roadmapItem.item}</Text>
            <Badge
              variant={roadmapItem.source === "byld-recommendation" ? "accent" : "outline"}
              className="shrink-0"
            >
              {SOURCE_LABEL[roadmapItem.source]}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
