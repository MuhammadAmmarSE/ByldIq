"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { CalendarPreview } from "./CalendarPreview";
import { getRecommendedCardId, type DecisionCardDefinition } from "./data/decision-cards";
import { DecisionCards } from "./DecisionCards";
import { FaqAccordion } from "./FaqAccordion";
import { NewsletterSignup } from "./NewsletterSignup";
import type { ConversionExperienceProps } from "./ConversionExperience.types";

/**
 * CLAUDE.md Part 19's Conversion Experience: a decision engine with
 * several next steps (never one forced CTA), a calendar preview, FAQ, and
 * newsletter signup.
 */
export function ConversionExperience({ className }: ConversionExperienceProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const journey = useAppStore((state) => state.journey);
  const analytics = useAnalytics();
  const { toast } = useToast();
  const { open: openAiCompanion } = useAiCompanion();
  const router = useRouter();

  function handleSelect(card: DecisionCardDefinition) {
    const wasRecommended = card.id === getRecommendedCardId(journey);
    analytics.track("conversion_decision_selected", { decision: card.id, wasRecommended });

    switch (card.id) {
      case "book-discovery":
        setShowCalendar(true);
        break;
      case "buildpath":
        router.push("/buildpath");
        break;
      case "talk-to-byld":
        openAiCompanion();
        break;
      case "explore-knowledge":
        router.push("/knowledge");
        break;
      case "download-resources":
        toast({
          title: "Resources are coming soon",
          description: "Planning checklists and templates aren't published yet.",
        });
        break;
    }
  }

  return (
    <div className={cn("space-y-10", className)}>
      <div className="space-y-2 text-center">
        <Heading variant="h2">What&apos;s your next step?</Heading>
        <Text variant="subtitle">
          Every product starts with a conversation. Choose what fits today.
        </Text>
      </div>

      <DecisionCards onSelect={handleSelect} />

      {showCalendar && <CalendarPreview className="mx-auto max-w-md" />}

      <div className="mx-auto max-w-2xl space-y-3">
        <Heading variant="h4" as="h3">
          Frequently asked questions
        </Heading>
        <FaqAccordion />
      </div>

      <div className="mx-auto max-w-md space-y-2 text-center">
        <Heading variant="h5" as="h3">
          Weekly engineering insights
        </Heading>
        <Text variant="caption">No discounts, no spam — just what we&apos;re learning.</Text>
        <NewsletterSignup className="justify-center" />
      </div>
    </div>
  );
}
