"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Progress } from "@/components/Progress";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { AiOpportunitiesStage } from "./AiOpportunitiesStage";
import { ArchitectureStage } from "./ArchitectureStage";
import { groupForStage, PROGRESS_GROUPS, STAGE_TITLES } from "./data/progress-steps";
import { DiscoveryStage } from "./DiscoveryStage";
import { EffortStage } from "./EffortStage";
import { IdeaStage } from "./IdeaStage";
import { PrioritizationStage } from "./PrioritizationStage";
import { ProductDefinitionStage } from "./ProductDefinitionStage";
import { RoadmapStage } from "./RoadmapStage";
import { SummaryStage } from "./SummaryStage";
import { TechnologyStage } from "./TechnologyStage";
import { BUILDPATH_STAGES, type BuildPathStage } from "./types";
import type { BuildPathShellProps } from "./BuildPathShell.types";

function isBuildPathStage(value: string | null): value is BuildPathStage {
  return value !== null && (BUILDPATH_STAGES as readonly string[]).includes(value);
}

/**
 * CLAUDE.md Milestone 14: the wizard shell — stage routing, the 7-group
 * progress indicator (§33), and back/forward navigation. `renderStage`
 * dispatches to each stage's real component as it ships (Idea/Discovery
 * as of Phase 2); remaining stages fall through to `StagePlaceholder`
 * until Phases 3–8 add a `case` for them, without touching this file's
 * navigation, persistence, or entry-context logic.
 *
 * Single route, `?stage=` query param (CLAUDE.md §5's "don't unnecessarily
 * create separate browser routes") — the store is the source of truth for
 * the current stage; the URL is kept in sync so refresh/back/forward and
 * bookmarking a specific stage all work.
 */
export function BuildPathShell({
  entryContext,
  prefillProjectTypes,
  className,
}: BuildPathShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();

  const stage = useBuildPathStore((state) => state.stage);
  const setStage = useBuildPathStore((state) => state.setStage);
  const applyEntryContext = useBuildPathStore((state) => state.applyEntryContext);
  const reset = useBuildPathStore((state) => state.reset);
  const hasHydrated = useBuildPathStore((state) => state.hasHydrated);
  const startedAt = useBuildPathStore((state) => state.startedAt);
  const storedEntryContext = useBuildPathStore((state) => state.entryContext);

  const didSyncFromUrl = useRef(false);

  // URL -> store, once, on mount. A bookmarked/shared "?stage=..." link
  // wins over whatever stage a previous session left off at.
  useEffect(() => {
    if (didSyncFromUrl.current) return;
    didSyncFromUrl.current = true;
    const stageParam = searchParams.get("stage");
    if (isBuildPathStage(stageParam)) setStage(stageParam);
  }, [searchParams, setStage]);

  // store -> URL, whenever the stage changes.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("stage") !== stage) {
      params.set("stage", stage);
      router.replace(`/buildpath?${params.toString()}`, { scroll: false });
    }
  }, [stage, router, searchParams]);

  // Apply entry context exactly once, after rehydration confirms whether
  // this is genuinely a fresh session (see BuildPathStoreProvider's
  // `hasHydrated` doc comment for why this can't run before that).
  useEffect(() => {
    if (!hasHydrated || startedAt) return;
    applyEntryContext(entryContext ?? { source: "direct" }, prefillProjectTypes);
    analytics.track("buildpath_started", { source: entryContext?.source ?? "direct" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, startedAt]);

  useEffect(() => {
    analytics.track("buildpath_stage_viewed", { stage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const currentIndex = BUILDPATH_STAGES.indexOf(stage);
  const currentGroup = groupForStage(stage);
  const progressPercent = (currentGroup.index / PROGRESS_GROUPS.length) * 100;

  function goBack() {
    const previous = BUILDPATH_STAGES[currentIndex - 1];
    if (previous) setStage(previous);
  }

  function goNext() {
    const next = BUILDPATH_STAGES[currentIndex + 1];
    if (next) setStage(next);
  }

  return (
    <Container size="content" className={cn("space-y-8 py-12 md:py-16", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Text variant="caption" className="text-muted font-medium">
            Step {currentGroup.index} of {PROGRESS_GROUPS.length} — {currentGroup.label}
          </Text>
          {startedAt && (
            <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={reset}>
              Start over
            </Button>
          )}
        </div>
        <Progress value={progressPercent} label={`BuildPath progress — ${currentGroup.label}`} />
      </div>

      {storedEntryContext?.label && currentIndex === 0 && (
        <Badge variant="accent">Continuing from {storedEntryContext.label}</Badge>
      )}

      <div className="space-y-6">
        <Heading variant="h2" as="h1">
          {STAGE_TITLES[stage]}
        </Heading>
        {renderStage(stage)}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          variant="outline"
          iconLeft={ArrowLeft}
          onClick={goBack}
          disabled={currentIndex === 0}
        >
          Back
        </Button>
        {currentIndex < BUILDPATH_STAGES.length - 1 && (
          <Button iconRight={ArrowRight} onClick={goNext}>
            Continue
          </Button>
        )}
      </div>
    </Container>
  );
}

function renderStage(stage: BuildPathStage) {
  switch (stage) {
    case "idea":
      return <IdeaStage />;
    case "discovery":
      return <DiscoveryStage />;
    case "product":
      return <ProductDefinitionStage />;
    case "prioritization":
      return <PrioritizationStage />;
    case "architecture":
      return <ArchitectureStage />;
    case "technology":
      return <TechnologyStage />;
    case "ai-opportunities":
      return <AiOpportunitiesStage />;
    case "roadmap":
      return <RoadmapStage />;
    case "effort":
      return <EffortStage />;
    case "summary":
      return <SummaryStage />;
    default:
      return <StagePlaceholder />;
  }
}

function StagePlaceholder() {
  return (
    <div className="border-border bg-surface-raised space-y-3 rounded-lg border p-6">
      <Text variant="body">
        This step of BuildPath is still being built — the wizard shell, progress tracking, and your
        answers so far already carry through as each stage ships.
      </Text>
      <div className="flex items-center gap-2 pt-2">
        <Icon icon={ArrowRight} size="sm" className="text-muted" />
        <Text variant="caption" className="text-muted">
          Use Continue and Back below to preview the full flow.
        </Text>
      </div>
    </div>
  );
}
