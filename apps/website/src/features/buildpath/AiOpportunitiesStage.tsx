"use client";

import { useMemo } from "react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { AiOpportunitiesStageProps } from "./AiOpportunitiesStage.types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Text variant="caption" className="text-muted font-medium">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </div>
  );
}

/**
 * CLAUDE.md Milestone 14 §17's AI Opportunity assessment — the one stage
 * `MockAIProvider` is designed to say "no" in (`relevant: false`), rather
 * than always finding an AI angle. "Don't recommend AI merely because it
 * is fashionable."
 */
export function AiOpportunitiesStage({ className }: AiOpportunitiesStageProps) {
  const answers = useBuildPathAnswers();
  const opportunities = useMemo(() => mockAIProvider.generateAiOpportunities(answers), [answers]);

  if (!opportunities.relevant) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card className="space-y-2 p-5">
          <Badge variant="outline">No AI recommended</Badge>
          <Text variant="body">{opportunities.summary}</Text>
        </Card>
      </div>
    );
  }

  const capabilityBadges: { label: string; enabled: boolean }[] = [
    { label: "Retrieval (RAG)", enabled: opportunities.needsRag },
    { label: "Agents", enabled: opportunities.needsAgents },
    { label: "Tool calling", enabled: opportunities.needsToolCalling },
    { label: "Vector search", enabled: opportunities.needsVectorSearch },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="space-y-3 p-5">
        <Badge variant="accent">AI is relevant here</Badge>
        <Text variant="body">{opportunities.summary}</Text>
        {opportunities.useCases.length > 0 && (
          <ul className="list-inside list-disc space-y-1">
            {opportunities.useCases.map((useCase) => (
              <li key={useCase}>
                <Text variant="body" as="span">
                  {useCase}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="space-y-3 p-5">
        <Text variant="caption" className="text-muted font-medium">
          What this would need
        </Text>
        <Field label="Model requirements" value={opportunities.modelRequirements} />
        <div className="flex flex-wrap gap-2">
          {capabilityBadges
            .filter((capability) => capability.enabled)
            .map((capability) => (
              <Badge key={capability.label} variant="outline">
                {capability.label}
              </Badge>
            ))}
        </div>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <Field label="Evaluation" value={opportunities.evaluation} />
        <Field label="Guardrails" value={opportunities.guardrails} />
        <Field label="Data privacy" value={opportunities.dataPrivacy} />
        <Field label="Human review" value={opportunities.humanReview} />
      </Card>
    </div>
  );
}
