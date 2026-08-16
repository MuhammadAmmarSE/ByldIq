"use client";

import { useMemo } from "react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { EffortStageProps } from "./EffortStage.types";
import type { Risk } from "./types";

const RISK_BADGE_VARIANT: Record<Risk["impact"], "outline" | "warning" | "danger"> = {
  Low: "outline",
  Medium: "warning",
  High: "danger",
};

/**
 * CLAUDE.md Milestone 14 §§20-23's Estimated Effort stage: a ranged
 * effort estimate (never a fabricated exact number), the recommended
 * team, and the risk assessment — grouped here because they're all part
 * of the same question: "what would this actually take?"
 */
export function EffortStage({ className }: EffortStageProps) {
  const answers = useBuildPathAnswers();
  const effort = useMemo(() => mockAIProvider.generateEffortEstimate(answers), [answers]);
  const team = useMemo(() => mockAIProvider.generateTeamRecommendation(answers), [answers]);
  const risks = useMemo(() => mockAIProvider.generateRisks(answers), [answers]);

  return (
    <div className={cn("space-y-8", className)}>
      <Card className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Text variant="caption" className="text-muted font-medium">
            Estimated effort
          </Text>
          <Badge variant="accent">{effort.complexity} complexity</Badge>
        </div>
        <Text variant="body">{effort.effortRangeLabel}</Text>
        <div className="flex flex-wrap gap-4">
          <Text variant="caption">Team size: {effort.teamSizeRange}</Text>
          <Text variant="caption">Duration: {effort.durationRange}</Text>
        </div>
        <Text variant="caption" className="text-muted">
          This is an estimated range, not a fixed quote — it will sharpen once real technical spikes
          are done.
        </Text>
      </Card>

      <div className="space-y-3">
        <Text variant="caption" className="text-muted font-medium">
          Recommended team
        </Text>
        <div className="grid gap-3 sm:grid-cols-2">
          {team.map((role) => (
            <Card key={role.role} className="space-y-1 p-4">
              <Text variant="body" className="font-medium">
                {role.role}
              </Text>
              <Text variant="caption">{role.responsibility}</Text>
              <Text variant="caption" className="text-muted">
                {role.involvement}
              </Text>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Text variant="caption" className="text-muted font-medium">
          Risks worth planning for
        </Text>
        <div className="space-y-3">
          {risks.map((risk) => (
            <Card key={risk.id} className="space-y-2 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{risk.category}</Badge>
                <Badge variant={RISK_BADGE_VARIANT[risk.impact]}>Impact: {risk.impact}</Badge>
                <Badge variant="outline">Likelihood: {risk.probability}</Badge>
              </div>
              <Text variant="body">{risk.risk}</Text>
              <Text variant="caption" className="text-muted">
                Mitigation: {risk.mitigation}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
