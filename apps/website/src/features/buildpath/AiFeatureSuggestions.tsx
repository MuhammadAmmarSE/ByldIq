"use client";

import { HelpCircle, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { AiFeatureSuggestionsProps } from "./AiFeatureSuggestions.types";

/**
 * CLAUDE.md Milestone 14 §11's transparent AI Feature Suggestions:
 * Add / Ignore / Ask Why. Suggestions never become real features on
 * their own — "Add" is the only path from `AiFeatureSuggestion` to
 * `ProductFeature`, and it's always a deliberate click.
 */
export function AiFeatureSuggestions({ className }: AiFeatureSuggestionsProps) {
  const aiSuggestions = useBuildPathStore((state) => state.aiSuggestions);
  const setAiSuggestions = useBuildPathStore((state) => state.setAiSuggestions);
  const acceptAiSuggestion = useBuildPathStore((state) => state.acceptAiSuggestion);
  const ignoreAiSuggestion = useBuildPathStore((state) => state.ignoreAiSuggestion);
  const addFeature = useBuildPathStore((state) => state.addFeature);
  const answers = useBuildPathAnswers();
  const analytics = useAnalytics();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pending = aiSuggestions.filter((suggestion) => suggestion.status === "pending");

  function handleAskByld() {
    setAiSuggestions(mockAIProvider.suggestFeatures(answers));
  }

  function handleAdd(suggestionId: string) {
    const suggestion = aiSuggestions.find((candidate) => candidate.id === suggestionId);
    if (!suggestion) return;
    addFeature({
      id: crypto.randomUUID(),
      name: suggestion.name,
      description: suggestion.description,
      forUser: "",
      priority: "should",
      complexity: "medium",
      dependencies: [],
      source: "ai",
    });
    acceptAiSuggestion(suggestionId);
    analytics.track("buildpath_feature_added", { source: "ai", priority: "should" });
  }

  function handleIgnore(suggestionId: string) {
    ignoreAiSuggestion(suggestionId);
    analytics.track("buildpath_ai_suggestion_ignored", {});
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Text variant="caption" className="text-muted font-medium">
          AI Feature Suggestions
        </Text>
        <Button variant="outline" size="sm" iconLeft={Sparkles} onClick={handleAskByld}>
          Ask Byld for suggestions
        </Button>
      </div>

      {pending.length === 0 && (
        <Text variant="body" className="text-muted">
          No pending suggestions. Ask Byld for a few based on what you&apos;ve shared.
        </Text>
      )}

      <div className="space-y-3">
        {pending.map((suggestion) => (
          <Card key={suggestion.id} className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <Text variant="body" className="font-medium">
                  {suggestion.name}
                </Text>
                <Text variant="caption" className="text-muted">
                  {suggestion.description}
                </Text>
              </div>
            </div>

            {expandedId === suggestion.id && (
              <Text variant="caption" className="border-border border-t pt-2">
                {suggestion.reason}
              </Text>
            )}

            <div className="flex flex-wrap gap-2">
              <Button size="sm" iconLeft={Plus} onClick={() => handleAdd(suggestion.id)}>
                Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconLeft={HelpCircle}
                onClick={() =>
                  setExpandedId((current) => (current === suggestion.id ? null : suggestion.id))
                }
              >
                {expandedId === suggestion.id ? "Hide reason" : "Ask why"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={X}
                onClick={() => handleIgnore(suggestion.id)}
              >
                Ignore
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
