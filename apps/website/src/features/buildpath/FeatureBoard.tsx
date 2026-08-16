"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { Textarea } from "@/components/Textarea";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import {
  COMPLEXITY_LABELS,
  COMPLEXITY_OPTIONS,
  PRIORITY_LABELS,
  PRIORITY_OPTIONS,
} from "./data/feature-labels";
import { FEATURE_PRIORITIES, type FeatureComplexity, type FeaturePriority } from "./types";
import type { FeatureBoardProps } from "./FeatureBoard.types";

const EMPTY_DRAFT = {
  name: "",
  description: "",
  forUser: "",
  priority: "should" as FeaturePriority,
  complexity: "medium" as FeatureComplexity,
};

/**
 * CLAUDE.md Milestone 14 §10's Feature Discovery: manual add, plus the
 * MVP / V1 / Later / Future board (`FEATURE_PRIORITIES` — see
 * `data/feature-labels.ts` for why the real 4 priority values are kept
 * rather than collapsed into exactly "MVP/V1/Future").
 */
export function FeatureBoard({ className }: FeatureBoardProps) {
  const features = useBuildPathStore((state) => state.features);
  const addFeature = useBuildPathStore((state) => state.addFeature);
  const updateFeature = useBuildPathStore((state) => state.updateFeature);
  const removeFeature = useBuildPathStore((state) => state.removeFeature);
  const analytics = useAnalytics();

  const [draft, setDraft] = useState(EMPTY_DRAFT);

  function handleAdd() {
    if (!draft.name.trim()) return;
    addFeature({ id: crypto.randomUUID(), ...draft, dependencies: [], source: "user" });
    analytics.track("buildpath_feature_added", { source: "user", priority: draft.priority });
    setDraft(EMPTY_DRAFT);
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="space-y-3 p-4">
        <Text variant="caption" className="text-muted font-medium">
          Add a feature
        </Text>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="feature-name">Name</Label>
            <Input
              id="feature-name"
              value={draft.name}
              placeholder="e.g. Online booking calendar"
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="feature-for-user">Who it&apos;s for</Label>
            <Input
              id="feature-for-user"
              value={draft.forUser}
              onChange={(event) =>
                setDraft((current) => ({ ...current, forUser: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="feature-description">Description</Label>
            <Textarea
              id="feature-description"
              value={draft.description}
              rows={2}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="feature-priority">Priority</Label>
            <Select
              id="feature-priority"
              options={PRIORITY_OPTIONS}
              value={draft.priority}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, priority: value as FeaturePriority }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="feature-complexity">Complexity</Label>
            <Select
              id="feature-complexity"
              options={COMPLEXITY_OPTIONS}
              value={draft.complexity}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, complexity: value as FeatureComplexity }))
              }
            />
          </div>
        </div>
        <Button size="sm" iconLeft={Plus} disabled={!draft.name.trim()} onClick={handleAdd}>
          Add feature
        </Button>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURE_PRIORITIES.map((priority) => {
          const columnFeatures = features.filter((feature) => feature.priority === priority);
          return (
            <div key={priority} className="space-y-3">
              <Text variant="caption" className="text-muted font-medium">
                {PRIORITY_LABELS[priority]} ({columnFeatures.length})
              </Text>
              <div className="space-y-3">
                {columnFeatures.map((feature) => (
                  <Card key={feature.id} className="space-y-2 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <Text variant="body" className="font-medium">
                        {feature.name}
                      </Text>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${feature.name}`}
                        onClick={() => removeFeature(feature.id)}
                      >
                        <Icon icon={Trash2} size="sm" />
                      </Button>
                    </div>
                    {feature.description && (
                      <Text variant="caption" className="text-muted">
                        {feature.description}
                      </Text>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{COMPLEXITY_LABELS[feature.complexity]}</Badge>
                      {feature.source === "ai" && <Badge variant="accent">AI suggested</Badge>}
                    </div>
                    <Select
                      aria-label={`Change priority for ${feature.name}`}
                      options={PRIORITY_OPTIONS}
                      value={feature.priority}
                      onValueChange={(value) =>
                        updateFeature(feature.id, { priority: value as FeaturePriority })
                      }
                    />
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
