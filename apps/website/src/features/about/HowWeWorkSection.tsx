import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { HowWeWorkSectionProps } from "./HowWeWorkSection.types";

const COLLABORATION_LAYERS = ["Client", "Product", "Design", "Engineering", "Byld IQ"];

const TRANSPARENCY_ITEMS = [
  {
    title: "Risks",
    detail:
      "What could go wrong, and how likely it actually is — not just the risks that are comfortable to name.",
  },
  {
    title: "Technical debt",
    detail:
      "Where we've deliberately taken a shortcut, why, and what it will cost to unwind later.",
  },
  {
    title: "Estimates",
    detail:
      "What a number is actually based on, and how confident we are in it — a guess dressed as precision helps no one.",
  },
  {
    title: "Trade-offs",
    detail:
      "What we gained and gave up with a decision, so it reads as a choice, not an inevitability.",
  },
  {
    title: "Constraints",
    detail: "The real limits — budget, timeline, existing systems — a plan has to work within.",
  },
  {
    title: "Dependencies",
    detail:
      "What this work is waiting on, whether that's a third party, a team, or a decision that hasn't been made yet.",
  },
  {
    title: "Unknowns",
    detail:
      "What we genuinely don't know yet, stated as a question rather than papered over with false confidence.",
  },
];

/**
 * CLAUDE.md Milestone 13 §§10-11's How We Work With Clients and
 * Transparency: two closely related themes (a collaboration model, and
 * the honesty that model depends on) rendered as one component with two
 * anchors — the same "one component, two ids" pattern
 * `CaseStudyOverview` uses for Executive Summary/Business Challenge.
 */
export function HowWeWorkSection({ className }: HowWeWorkSectionProps) {
  return (
    <div className={cn("space-y-16", className)}>
      <section id="how-we-work" className="space-y-8">
        <SectionHeader
          eyebrow="How We Work With Clients"
          heading="A visible process, not a black box."
          description="Communication, planning, reviews, and decisions happen where you can see them — not behind a status update once a week."
        />

        <div
          role="list"
          aria-label="Collaboration model"
          className="flex flex-wrap items-center gap-1 overflow-x-auto"
        >
          {COLLABORATION_LAYERS.map((layer, index) => (
            <div key={layer} role="listitem" className="flex items-center gap-1">
              <span className="bg-surface-raised text-foreground shrink-0 rounded-md px-3 py-2 text-sm font-medium">
                {layer}
              </span>
              {index < COLLABORATION_LAYERS.length - 1 && (
                <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
              )}
            </div>
          ))}
        </div>

        <Text variant="body">
          Every layer stays in the conversation — product, design, and engineering decisions are
          made with the client present, not translated after the fact. Planning, reviews, and demos
          happen on a regular cadence; feedback and decisions are documented where the work lives,
          not lost in a chat thread; and ownership of what ships is always clear.
        </Text>
      </section>

      <section id="transparency" className="space-y-8">
        <SectionHeader
          eyebrow="Transparency"
          heading="We don't hide complexity. We make it understandable."
          description="Every one of these gets communicated as a matter of course, not extracted through a difficult conversation."
        />

        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {TRANSPARENCY_ITEMS.map((item) => (
            <div key={item.title} className="border-border space-y-1.5 border-t pt-4">
              <dt className="text-foreground font-medium">{item.title}</dt>
              <dd>
                <Text variant="body" className="text-muted">
                  {item.detail}
                </Text>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
