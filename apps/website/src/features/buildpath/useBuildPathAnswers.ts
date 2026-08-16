import { useMemo } from "react";

import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import type { BuildPathAnswers } from "./types";

/**
 * Assembles the persisted slices of the store into a plain `BuildPathAnswers`
 * object — the shape every `AIProvider` method expects. Each field is its
 * own `useBuildPathStore` subscription (so an unrelated store change, like
 * `hasHydrated` flipping, doesn't re-render every stage that reads this),
 * and `useMemo` keeps the assembled object's reference stable unless one of
 * those fields actually changed.
 */
export function useBuildPathAnswers(): BuildPathAnswers {
  const stage = useBuildPathStore((state) => state.stage);
  const entryContext = useBuildPathStore((state) => state.entryContext);
  const projectTypes = useBuildPathStore((state) => state.projectTypes);
  const conversation = useBuildPathStore((state) => state.conversation);
  const discovery = useBuildPathStore((state) => state.discovery);
  const problemStatement = useBuildPathStore((state) => state.problemStatement);
  const targetUserGroups = useBuildPathStore((state) => state.targetUserGroups);
  const features = useBuildPathStore((state) => state.features);
  const aiSuggestions = useBuildPathStore((state) => state.aiSuggestions);
  const integrations = useBuildPathStore((state) => state.integrations);
  const canvasExtras = useBuildPathStore((state) => state.canvasExtras);
  const startedAt = useBuildPathStore((state) => state.startedAt);
  const completedAt = useBuildPathStore((state) => state.completedAt);

  return useMemo<BuildPathAnswers>(
    () => ({
      stage,
      entryContext,
      projectTypes,
      conversation,
      discovery,
      problemStatement,
      targetUserGroups,
      features,
      aiSuggestions,
      integrations,
      canvasExtras,
      startedAt,
      completedAt,
    }),
    [
      stage,
      entryContext,
      projectTypes,
      conversation,
      discovery,
      problemStatement,
      targetUserGroups,
      features,
      aiSuggestions,
      integrations,
      canvasExtras,
      startedAt,
      completedAt,
    ],
  );
}
