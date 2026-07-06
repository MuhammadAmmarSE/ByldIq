import { Check, X } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { TechnologyStrengthsWeaknessesProps } from "./TechnologyStrengthsWeaknesses.types";

/**
 * CLAUDE.md Part 22's Strengths and Weaknesses sections. Every technology
 * has genuine weaknesses (Part 22: "Honest... Every technology has
 * weaknesses. Transparency builds trust.") — rendered with the same
 * visual weight as strengths, not buried or hedged, since downplaying
 * trade-offs would be exactly the dishonesty this section exists to avoid.
 */
export function TechnologyStrengthsWeaknesses({
  technology,
  className,
}: TechnologyStrengthsWeaknessesProps) {
  return (
    <div className={cn("grid gap-10 sm:grid-cols-2", className)}>
      <section id="strengths" className="space-y-4">
        <Heading variant="h3" as="h2">
          Strengths
        </Heading>
        <ul className="space-y-3">
          {technology.strengths.map((strength) => (
            <li key={strength.label} className="flex items-start gap-2.5">
              <span className="bg-accent/10 text-accent mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon icon={Check} size="xs" />
              </span>
              <div>
                <Text variant="body" className="font-medium">
                  {strength.label}
                </Text>
                <Text variant="body" className="text-muted">
                  {strength.description}
                </Text>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="weaknesses" className="space-y-4">
        <Heading variant="h3" as="h2">
          Weaknesses
        </Heading>
        <ul className="space-y-3">
          {technology.weaknesses.map((weakness) => (
            <li key={weakness.label} className="flex items-start gap-2.5">
              <span className="bg-muted/10 text-muted mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon icon={X} size="xs" />
              </span>
              <div>
                <Text variant="body" className="font-medium">
                  {weakness.label}
                </Text>
                <Text variant="body" className="text-muted">
                  {weakness.description}
                </Text>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
