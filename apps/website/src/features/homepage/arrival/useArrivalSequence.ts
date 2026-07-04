"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const ARRIVAL_STAGES = [
  "initial",
  "background",
  "logo",
  "wordmark",
  "tagline",
  "navigation",
  "complete",
] as const;

export type ArrivalStage = (typeof ARRIVAL_STAGES)[number];

export type ArrivalCompletionReason = "finished" | "skipped" | "bypassed";

/** Milliseconds from mount, per CLAUDE.md Part 9's stage timeline (kept under the 2s budget). */
const STAGE_TIMINGS: Record<Exclude<ArrivalStage, "initial">, number> = {
  background: 200,
  logo: 600,
  wordmark: 1000,
  tagline: 1200,
  navigation: 1400,
  complete: 1800,
};

export interface UseArrivalSequenceOptions {
  /** Returning visitor or `prefers-reduced-motion` — resolve as already complete, per Part 9's "0 seconds" rule. */
  skipIntro: boolean;
  onComplete: (reason: ArrivalCompletionReason) => void;
}

export interface UseArrivalSequenceResult {
  stage: ArrivalStage;
  skip: () => void;
}

/**
 * Drives the Arrival Experience's stage timeline. Kept separate from
 * `ArrivalExperience` so the timing logic is unit-testable with fake timers
 * without needing to render the full visual sequence.
 */
export function useArrivalSequence({
  skipIntro,
  onComplete,
}: UseArrivalSequenceOptions): UseArrivalSequenceResult {
  const [stage, setStage] = useState<ArrivalStage>(skipIntro ? "complete" : "initial");
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompletedRef = useRef(skipIntro);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (skipIntro) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
      }
      onCompleteRef.current("bypassed");
      return;
    }

    const ids = (Object.entries(STAGE_TIMINGS) as [ArrivalStage, number][]).map(
      ([nextStage, delay]) => setTimeout(() => setStage(nextStage), delay),
    );
    const completeId = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current("finished");
      }
    }, STAGE_TIMINGS.complete);
    timeoutIdsRef.current = [...ids, completeId];

    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
  }, [skipIntro]);

  const skip = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    setStage("complete");
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current("skipped");
    }
  }, []);

  return { stage, skip };
}
