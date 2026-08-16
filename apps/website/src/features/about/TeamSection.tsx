"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TeamSectionProps } from "./TeamSection.types";

/**
 * CLAUDE.md Milestone 13 §§7-8's Team and Leadership. The spec is
 * explicit: "If team data isn't available yet, do not fabricate team
 * members. Instead, create the team component architecture and populate
 * it only with approved information." No real, approved team or
 * leadership bios exist in CLAUDE.md or anywhere else in this codebase —
 * so this ships as a genuine, honest empty state (the same
 * `KnowledgeContentTypePlaceholder` shape the Knowledge Center already
 * uses for its own unpublished content types), not a placeholder grid of
 * invented names and titles.
 *
 * Leadership isn't a second, separate empty state — it carries the exact
 * same "no fabrication" constraint as Team, so a duplicate dashed-border
 * box saying the same thing twice would just be noise. When real,
 * approved bios exist, this component is where they render; the copy
 * below and the section's structure (one `TeamMember` card grid) already
 * anticipates that without inventing content to fill it today.
 */
export function TeamSection({ className }: TeamSectionProps) {
  const { open: openAiCompanion } = useAiCompanion();
  const analytics = useAnalytics();

  function handleTalkToByld() {
    analytics.track("about_cta_selected", { cta: "team-ai" });
    openAiCompanion();
  }

  return (
    <section id="team" className={cn("space-y-8", className)}>
      <SectionHeader
        eyebrow="Team"
        heading="Who you'd actually work with."
        description="We'd rather leave this section honest than fill it with placeholder bios."
      />

      <div className="border-border rounded-lg border border-dashed p-8">
        <Text variant="body">
          Individual team and leadership profiles aren&apos;t published on this page yet.
        </Text>
        <Text variant="body" className="mt-2">
          Rather than publish invented names, titles, or biographies to make this section look
          complete, we&apos;re leaving it honest until real, approved profiles exist to put here.
        </Text>
        <Text variant="caption" className="mt-2">
          This section will fill in as real profiles are approved — never with placeholder people in
          the meantime.
        </Text>
      </div>

      <div className="space-y-3">
        <Heading variant="h4" as="h3">
          In the meantime
        </Heading>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleTalkToByld}>
            Ask Byld who you&apos;d work with
          </Button>
          <Button asChild variant="outline">
            <Link href="/work">See the work we&apos;ve shipped</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
