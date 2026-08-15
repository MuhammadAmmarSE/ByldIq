"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { GREETINGS, RESPONSES, useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { AiCompanionHighlightProps } from "./AiCompanionHighlight.types";

// A representative exchange, not fabricated demo copy — pulled directly
// from the real response engine (`GREETINGS`/`RESPONSES`) so this preview
// never drifts from what the actual AI Companion says.
const DEMO_USER_MESSAGE = GREETINGS.default.quickReplies[2] ?? "I want to use AI";
const DEMO_ASSISTANT_REPLY = RESPONSES.ai.content;

/**
 * Milestone 9's AI Companion Highlight: an inline, always-visible preview
 * of a real Byld conversation, plus a second entry point into the same
 * global panel the floating trigger opens (CLAUDE.md Part 16 — Byld
 * "quietly appears," so this section demonstrates value before asking a
 * visitor to click an icon they may not have noticed).
 */
export function AiCompanionHighlight({ className }: AiCompanionHighlightProps) {
  const { open } = useAiCompanion();
  const analytics = useAnalytics();

  function handleOpen() {
    open();
    analytics.track("ai_companion_highlight_opened", {});
  }

  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center",
        className,
      )}
    >
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Byld AI"
          heading="Ask Byld before you build."
          description="A product consultant built into the site — not a sales bot. Ask about technology trade-offs, architecture, or your roadmap, and Byld explains its reasoning instead of just answering."
        />
        <Button onClick={handleOpen} iconLeft={Sparkles}>
          Ask Byld a question
        </Button>
      </div>

      <Card className="bg-surface-raised/50 mx-auto w-full max-w-md">
        <Card.Content className="flex flex-col gap-3 p-4">
          <div className="text-muted flex items-center gap-2 text-sm font-medium">
            <span className="bg-accent/10 text-accent flex size-6 items-center justify-center rounded-full">
              <Icon icon={Sparkles} size="xs" />
            </span>
            Byld
          </div>

          <div className="bg-surface text-foreground mr-auto max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm">
            {GREETINGS.default.content}
          </div>

          <div className="bg-accent text-accent-foreground ml-auto max-w-[85%] rounded-lg px-3 py-2 text-sm">
            {DEMO_USER_MESSAGE}
          </div>

          <div className="bg-surface text-foreground mr-auto max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm">
            {DEMO_ASSISTANT_REPLY}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
