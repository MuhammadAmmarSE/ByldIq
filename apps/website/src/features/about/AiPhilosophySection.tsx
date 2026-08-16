import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { AiCompanionHighlight } from "@/features/homepage/ai-companion-highlight";
import { cn } from "@/utils/cn";

import { AI_ASSISTED_AREAS } from "./data/ai-assisted-areas";
import type { AiPhilosophySectionProps } from "./AiPhilosophySection.types";

/**
 * CLAUDE.md Milestone 13 §§13-14's AI Philosophy and Byld Mascot,
 * combined — the spec introduces Byld on this page as "the public
 * manifestation of this philosophy," so separating the philosophy from
 * its embodiment into two sections would split one idea in half.
 *
 * "Meet Byld" reuses the homepage's `AiCompanionHighlight` directly
 * rather than building a second introduction — it already is a real
 * conversation preview (pulled live from the actual response engine, not
 * scripted demo copy) plus an entry point into the same AI Companion
 * this page's own Hero and Team section link to. Building a bespoke
 * "meet the mascot" interaction here would either duplicate that
 * component or diverge from what the AI Companion actually says.
 */
export function AiPhilosophySection({ className }: AiPhilosophySectionProps) {
  return (
    <section id="ai-philosophy" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="AI Philosophy"
        heading="AI is an accelerator, not a substitute for engineering judgment."
        description="Every area below moves faster with AI's help. None of them ship without a person deciding what 'done' means."
      />

      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {AI_ASSISTED_AREAS.map((area) => (
          <div key={area.id} className="border-border space-y-1.5 border-t pt-4">
            <dt className="text-foreground font-medium">{area.title}</dt>
            <dd>
              <Text variant="body" className="text-muted">
                {area.description}
              </Text>
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-border bg-surface-raised space-y-6 rounded-lg border p-6 lg:p-8">
        <Text variant="caption" className="font-medium">
          Meet Byld
        </Text>
        <AiCompanionHighlight />
      </div>
    </section>
  );
}
