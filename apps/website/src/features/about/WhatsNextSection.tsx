"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { FUTURE_PLATFORM_STAGES } from "./data/future-platform";
import type { WhatsNextSectionProps } from "./WhatsNextSection.types";

/**
 * CLAUDE.md Milestone 13 §§15-18: Growth/Evolution, Future Vision, Labs,
 * and Careers, consolidated into one section. All four carry the same
 * instruction — don't fabricate — so four separate blocks would mostly
 * repeat "nothing to show here yet" in different words. Growth/Evolution
 * specifically has no verified milestones (real dates, clients, revenue,
 * employee counts) anywhere in this codebase to present chronologically,
 * so it's folded into Future Vision's direction rather than shipped as an
 * invented timeline.
 */
export function WhatsNextSection({ className }: WhatsNextSectionProps) {
  const { open: openAiCompanion } = useAiCompanion();
  const analytics = useAnalytics();

  function handleCareersInterest() {
    analytics.track("about_cta_selected", { cta: "careers-ai" });
    openAiCompanion();
  }

  return (
    <section id="whats-next" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="What's Next"
        heading="Where the platform is headed."
        description="This website is Version 1 of a larger platform — some of what follows already exists; the rest is real direction, not a promise with a date attached."
      />

      <div
        role="list"
        aria-label="Platform evolution"
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {FUTURE_PLATFORM_STAGES.map((stage, index) => (
          <div key={stage} role="listitem" className="flex items-center gap-1">
            <span className="bg-surface-raised text-foreground shrink-0 rounded-md px-3 py-2 text-sm font-medium">
              {stage}
            </span>
            {index < FUTURE_PLATFORM_STAGES.length - 1 && (
              <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <Text variant="caption" className="font-medium">
            Byld Labs
          </Text>
          <Text variant="body" className="mt-2">
            Byld Labs — experiments, AI prototypes, and open research — isn&apos;t public yet.
            We&apos;d rather launch it with real work in it than a page of placeholders.
          </Text>
        </Card>

        <Card className="p-6">
          <Text variant="caption" className="font-medium">
            Careers
          </Text>
          <Text variant="body" className="mt-2">
            We&apos;re not publicly hiring right now. If the way we think about product and
            engineering resonates, tell Byld what you&apos;re interested in — we&apos;d rather hear
            from you directly than leave a fabricated job listing here.
          </Text>
          <Button variant="outline" size="sm" className="mt-4" onClick={handleCareersInterest}>
            Tell Byld you&apos;re interested
          </Button>
        </Card>
      </div>
    </section>
  );
}
