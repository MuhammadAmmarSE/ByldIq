"use client";

import { useCallback } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import type { Journey } from "@/types/journey";
import { cn } from "@/utils/cn";

import "./analytics";

import { JOURNEY_DEFINITIONS } from "./data/journeys";
import { JourneyCard } from "./JourneyCard";
import type { JourneySelectorProps } from "./JourneySelector.types";

/**
 * CLAUDE.md Part 10's Journey Selection Engine: five cards, one choice,
 * instant homepage personalization. Radix's `RadioGroup` gives us arrow-key
 * roving focus and native radio ARIA semantics for free — every requirement
 * in "Accessibility" (keyboard, focus, screen reader announcement) falls out
 * of using the primitive correctly rather than needing bespoke handling.
 */
export function JourneySelector({ className }: JourneySelectorProps) {
  const journey = useAppStore((state) => state.journey);
  const setJourney = useAppStore((state) => state.setJourney);
  const analytics = useAnalytics();

  const handleSelect = useCallback(
    (value: string) => {
      const nextJourney = value as Journey;
      analytics.track("journey_selected", { journey: nextJourney, previousJourney: journey });
      setJourney(nextJourney);
    },
    [analytics, journey, setJourney],
  );

  const handleHover = useCallback(
    (hovered: Journey) => {
      analytics.track("journey_hovered", { journey: hovered });
    },
    [analytics],
  );

  const handleReset = useCallback(() => {
    analytics.track("journey_reset", { previousJourney: journey });
    setJourney(null);
  }, [analytics, journey, setJourney]);

  return (
    <div className={cn(className)}>
      <RadioGroupPrimitive.Root
        value={journey ?? ""}
        onValueChange={handleSelect}
        aria-label="Choose the journey that matches what you're building"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {JOURNEY_DEFINITIONS.map((definition, index) => (
          <Reveal key={definition.id} delay={index * 0.06}>
            <JourneyCard
              journey={definition}
              isSelected={journey === definition.id}
              isAnySelected={journey !== null}
              onHover={handleHover}
            />
          </Reveal>
        ))}
      </RadioGroupPrimitive.Root>

      {journey && (
        <div className="mt-6 flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Change journey
          </Button>
        </div>
      )}
    </div>
  );
}
