"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fade } from "@/lib/motion-variants";
import { useAppStore } from "@/providers/StoreProvider";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { setCookie } from "@/utils/cookies";

import "./analytics";

import { ARRIVAL_STAGES, useArrivalSequence, type ArrivalStage } from "./useArrivalSequence";
import { BlueprintBackdrop } from "./BlueprintBackdrop";
import { LogoAssembly } from "./LogoAssembly";
import type { ArrivalExperienceProps } from "./ArrivalExperience.types";

export const INTRO_SEEN_COOKIE = "byld_intro_seen";
const TAGLINE = "Engineering Intelligent Products.";

function stageIndex(stage: ArrivalStage): number {
  return ARRIVAL_STAGES.indexOf(stage);
}

/**
 * CLAUDE.md Part 9's full arrival sequence: a fixed overlay that assembles
 * the logo, reveals the wordmark and tagline, then dissolves to reveal the
 * real page (including the navbar, already mounted underneath) — "the
 * navigation feels earned." Returning visitors and `prefers-reduced-motion`
 * skip straight to `complete` and never see the overlay at all.
 */
export function ArrivalExperience({ initialHasSeenIntro = false }: ArrivalExperienceProps) {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const analytics = useAnalytics();
  const markIntroSeen = useAppStore((state) => state.markIntroSeen);

  const skipIntro = initialHasSeenIntro || reducedMotion;
  const mountedAtRef = useRef<number | null>(null);
  const startedTrackedRef = useRef(false);
  mountedAtRef.current ??= typeof performance !== "undefined" ? performance.now() : 0;

  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  useEffect(() => {
    setDevice(window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop");
  }, []);

  const handleComplete = useCallback(
    (reason: "finished" | "skipped" | "bypassed") => {
      const elapsed =
        (typeof performance !== "undefined" ? performance.now() : 0) - (mountedAtRef.current ?? 0);
      analytics.track("intro_time_to_interaction", { milliseconds: Math.round(elapsed), reason });

      if (reason === "finished") {
        analytics.track("intro_completed", { reducedMotion, theme: resolvedTheme });
      }

      if (reason !== "bypassed") {
        markIntroSeen();
        setCookie(INTRO_SEEN_COOKIE, "1", 365);
      }
    },
    [analytics, reducedMotion, resolvedTheme, markIntroSeen],
  );

  const { stage, skip } = useArrivalSequence({ skipIntro, onComplete: handleComplete });

  useEffect(() => {
    if (!skipIntro && !startedTrackedRef.current) {
      startedTrackedRef.current = true;
      analytics.track("intro_started", { reducedMotion, device });
    }
    // `device` intentionally excluded — it settles a tick after mount and
    // shouldn't retrigger this once-only event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipIntro, reducedMotion, analytics]);

  const handleSkip = useCallback(() => {
    analytics.track("intro_skipped", { stageAtSkip: stage });
    skip();
  }, [analytics, stage, skip]);

  if (stage === "complete") return null;

  const index = stageIndex(stage);
  const showLogo = index >= stageIndex("logo");
  const showWordmark = index >= stageIndex("wordmark");
  const showTagline = index >= stageIndex("tagline");
  const dissolving = index >= stageIndex("navigation");

  return (
    <motion.div
      role="presentation"
      className="bg-background z-modal fixed inset-0 flex flex-col items-center justify-center"
      variants={fade}
      initial="visible"
      animate={dissolving ? "hidden" : "visible"}
    >
      <BlueprintBackdrop />

      <div aria-hidden="true" className="relative flex flex-col items-center gap-6 text-center">
        <LogoAssembly assembled={showLogo} />

        {showWordmark && (
          <motion.div variants={fade} initial="hidden" animate="visible">
            <Heading variant="h2">Byld IQ</Heading>
          </motion.div>
        )}

        {showTagline && (
          <motion.div variants={fade} initial="hidden" animate="visible">
            <Text variant="subtitle">{TAGLINE}</Text>
          </motion.div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        autoFocus
        onClick={handleSkip}
        className="absolute bottom-8"
        iconLeft={X}
      >
        Skip intro
      </Button>
    </motion.div>
  );
}
