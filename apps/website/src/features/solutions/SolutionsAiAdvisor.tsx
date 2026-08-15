"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { GREETINGS, RESPONSES, useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { SolutionsAiAdvisorProps } from "./SolutionsAiAdvisor.types";

/**
 * Milestone 10's AI Advisor moment on the Solutions landing page — the
 * same pattern as the homepage's `AiCompanionHighlight` (Milestone 9):
 * an inline preview of a real Byld exchange, plus a second entry point
 * into the same global panel the floating trigger opens, not a
 * duplicate companion instance.
 *
 * The demo exchange is read inside the component body, not at module
 * scope — `@/features/solutions`' barrel export is imported widely
 * across the codebase, including by test files that partially mock
 * `@/features/homepage/ai-companion` (only `useAiCompanion`, no
 * `GREETINGS`/`RESPONSES`); a module-level read would throw as soon as
 * anything imports the solutions barrel under one of those mocks.
 */
export function SolutionsAiAdvisor({ className }: SolutionsAiAdvisorProps) {
  const { open } = useAiCompanion();
  const analytics = useAnalytics();

  // A representative exchange, not fabricated demo copy — pulled
  // directly from the real response engine. "I'm building a startup" is
  // GREETINGS.default's first quick reply and genuinely matches the
  // "startup" intent, whose real reply is about scoping an MVP —
  // directly relevant to choosing a Solutions path.
  const demoUserMessage = GREETINGS.default.quickReplies[0] ?? "I'm building a startup";
  const demoAssistantReply = RESPONSES.startup.content;

  function handleOpen() {
    open();
    analytics.track("solutions_ai_advisor_opened", {});
  }

  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center",
        className,
      )}
    >
      <div className="space-y-4">
        <Heading variant="h2">Not sure which solution fits?</Heading>
        <Text variant="subtitle">
          Ask Byld. It&apos;s a product consultant built into the site, not a sales bot — it&apos;ll
          walk through your goals and explain the trade-offs, the same way it would for anyone on
          the team.
        </Text>
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
            {demoUserMessage}
          </div>

          <div className="bg-surface text-foreground mr-auto max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm">
            {demoAssistantReply}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
