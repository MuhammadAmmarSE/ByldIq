"use client";

import { Sparkles } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Label } from "@/components/Label";
import { Text } from "@/components/Text";
import { Textarea } from "@/components/Textarea";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { ProblemDefinitionPanelProps } from "./ProblemDefinitionPanel.types";
import type { ProblemStatement } from "./types";

const FIELDS: {
  field: keyof Omit<ProblemStatement, "confirmed">;
  label: string;
  placeholder: string;
}[] = [
  {
    field: "problem",
    label: "The problem, in plain terms",
    placeholder: "What's actually going wrong?",
  },
  { field: "targetUsers", label: "Who it affects", placeholder: 'Be specific — not "everyone."' },
  {
    field: "currentSituation",
    label: "How it's handled today",
    placeholder: "Manually, with a workaround, or not at all.",
  },
  {
    field: "desiredOutcome",
    label: "What the desired outcome looks like",
    placeholder: "What changes if this works?",
  },
  {
    field: "businessMotivation",
    label: "Why it matters to the business",
    placeholder: "Revenue, retention, cost, risk...",
  },
  {
    field: "constraints",
    label: "Constraints to keep in mind (optional)",
    placeholder: "Budget, timeline, compliance, existing systems...",
  },
];

/**
 * CLAUDE.md Milestone 14 §8's structured, user-editable Problem
 * Definition. `draftProblemStatement` only ever runs when the visitor
 * clicks "Draft with Byld" — never automatically — and even then it only
 * fills the fields; `confirmed` stays false (enforced by
 * `updateProblemStatement` itself) until the visitor explicitly confirms.
 * Editing any field after confirming un-confirms it again, same rule.
 */
export function ProblemDefinitionPanel({ className }: ProblemDefinitionPanelProps) {
  const problemStatement = useBuildPathStore((state) => state.problemStatement);
  const updateProblemStatement = useBuildPathStore((state) => state.updateProblemStatement);
  const confirmProblemStatement = useBuildPathStore((state) => state.confirmProblemStatement);
  const answers = useBuildPathAnswers();
  const analytics = useAnalytics();

  const hasDraftMaterial = Boolean(answers.discovery.accomplish || answers.discovery.problem);
  const isEmpty = !problemStatement.problem;

  function handleDraft() {
    updateProblemStatement(mockAIProvider.draftProblemStatement(answers));
  }

  function handleConfirm() {
    confirmProblemStatement();
    analytics.track("buildpath_problem_confirmed", {});
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Text variant="caption" className="text-muted font-medium">
          Problem Definition
        </Text>
        <div className="flex items-center gap-2">
          <Badge variant={problemStatement.confirmed ? "success" : "outline"}>
            {problemStatement.confirmed ? "Confirmed" : "Needs your review"}
          </Badge>
          {isEmpty && hasDraftMaterial && (
            <Button variant="outline" size="sm" iconLeft={Sparkles} onClick={handleDraft}>
              Draft with Byld
            </Button>
          )}
        </div>
      </div>

      {isEmpty && !hasDraftMaterial && (
        <Text variant="body" className="text-muted">
          Answer a few questions in the conversation above and Byld can draft this for you to
          review.
        </Text>
      )}

      {!isEmpty && (
        <div className="flex items-center gap-2">
          <Icon icon={Sparkles} size="sm" className="text-muted" />
          <Text variant="caption" className="text-muted">
            Drafted from your answers above — every field here is yours to edit.
          </Text>
        </div>
      )}

      {(!isEmpty || hasDraftMaterial) && (
        <div className="space-y-4">
          {FIELDS.map(({ field, label, placeholder }) => (
            <div key={field} className="space-y-1.5">
              <Label htmlFor={`problem-${field}`}>{label}</Label>
              <Textarea
                id={`problem-${field}`}
                value={problemStatement[field]}
                placeholder={placeholder}
                rows={field === "targetUsers" ? 1 : 2}
                onChange={(event) => updateProblemStatement({ [field]: event.target.value })}
              />
            </div>
          ))}

          <Button
            variant={problemStatement.confirmed ? "outline" : "primary"}
            disabled={!problemStatement.problem || problemStatement.confirmed}
            onClick={handleConfirm}
          >
            {problemStatement.confirmed ? "You've confirmed this" : "This looks right"}
          </Button>
        </div>
      )}
    </div>
  );
}
