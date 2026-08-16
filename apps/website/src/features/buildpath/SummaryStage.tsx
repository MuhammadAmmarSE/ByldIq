"use client";

import { Copy, Printer } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { ShareButton } from "@/components/ShareButton";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { encodeSharePayload } from "./share-encoding";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { SummaryStageProps } from "./SummaryStage.types";

function formatSummaryText(
  summary: ReturnType<typeof mockAIProvider.generateSummary>,
  projectTypes: string[],
): string {
  const lines = ["Your BuildPath Plan", ""];
  if (projectTypes.length > 0) lines.push(`Project type: ${projectTypes.join(", ")}`, "");
  lines.push(`Vision: ${summary.vision}`, "", `Problem: ${summary.problem}`, "");
  if (summary.mvpFeatureNames.length > 0) {
    lines.push("MVP features:", ...summary.mvpFeatureNames.map((name) => `- ${name}`), "");
  }
  lines.push("Next steps:", ...summary.nextSteps.map((step) => `- ${step}`));
  return lines.join("\n");
}

/**
 * CLAUDE.md Milestone 14 §§27-28's Final Plan: a polished summary plus
 * three genuinely working export paths, each honestly scoped (see
 * `docs/buildpath.md`): Print/PDF via a dedicated print view, a
 * shareable link whose ID *is* the payload (no backend to persist
 * against), and a plain-text copy.
 */
export function SummaryStage({ className }: SummaryStageProps) {
  const analytics = useAnalytics();
  const { toast } = useToast();
  const answers = useBuildPathAnswers();
  const projectTypes = useBuildPathStore((state) => state.projectTypes);
  const markCompleted = useBuildPathStore((state) => state.markCompleted);
  const completedAt = useBuildPathStore((state) => state.completedAt);

  const summary = useMemo(() => mockAIProvider.generateSummary(answers), [answers]);

  useEffect(() => {
    if (!completedAt) markCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedAt]);

  const shareUrl = useMemo(() => {
    const id = encodeSharePayload({
      projectTypes,
      vision: summary.vision,
      problem: summary.problem,
      mvpFeatureNames: summary.mvpFeatureNames,
      nextSteps: summary.nextSteps,
    });
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/buildpath/share/${id}`;
  }, [projectTypes, summary]);

  async function handleCopySummary() {
    try {
      await navigator.clipboard.writeText(formatSummaryText(summary, projectTypes));
      toast({ title: "Summary copied", description: "Paste it wherever you need it." });
      analytics.track("buildpath_summary_copied", {});
    } catch {
      toast({ title: "Couldn't copy the summary", variant: "danger" });
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {projectTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <Badge key={type} variant="outline">
              {type}
            </Badge>
          ))}
        </div>
      )}

      <Card className="space-y-4 p-6">
        <div>
          <Text variant="caption" className="text-muted font-medium">
            Vision
          </Text>
          <Text variant="body">{summary.vision}</Text>
        </div>
        <div>
          <Text variant="caption" className="text-muted font-medium">
            Problem
          </Text>
          <Text variant="body">{summary.problem}</Text>
        </div>
        {summary.mvpFeatureNames.length > 0 && (
          <div>
            <Text variant="caption" className="text-muted font-medium">
              MVP features
            </Text>
            <ul className="list-inside list-disc space-y-0.5">
              {summary.mvpFeatureNames.map((name) => (
                <li key={name}>
                  <Text variant="body" as="span">
                    {name}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <Text variant="caption" className="text-muted font-medium">
            Next steps
          </Text>
          <ul className="list-inside list-disc space-y-0.5">
            {summary.nextSteps.map((step) => (
              <li key={step}>
                <Text variant="body" as="span">
                  {step}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" size="sm">
          <Link
            href="/buildpath/print"
            target="_blank"
            onClick={() => analytics.track("buildpath_pdf_exported", {})}
          >
            <span className="inline-flex items-center gap-2">
              <Icon icon={Printer} size="sm" />
              Export as PDF
            </span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" iconLeft={Copy} onClick={handleCopySummary}>
          Copy summary
        </Button>
        <ShareButton
          title="My BuildPath plan"
          url={shareUrl}
          onShare={() => analytics.track("buildpath_plan_shared", {})}
        />
      </div>

      <Text variant="caption" className="text-muted">
        This plan is saved automatically in your browser — come back anytime and pick up where you
        left off.
      </Text>
    </div>
  );
}
