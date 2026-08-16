"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Label } from "@/components/Label";
import { Text } from "@/components/Text";
import { Textarea } from "@/components/Textarea";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import { PLATFORM_OPTIONS } from "./data/platforms";
import type { ProductDefinitionStageProps } from "./ProductDefinitionStage.types";

function CanvasCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="space-y-2 p-5">
      <Text variant="caption" className="text-muted font-medium">
        {title}
      </Text>
      {children}
    </Card>
  );
}

/**
 * CLAUDE.md Milestone 14's Product Definition canvas — mostly a read-only
 * recap of what Discovery, Problem Definition, and Target Users already
 * captured (nothing re-asked), plus two things captured directly here:
 * Platforms and Constraints. Key Features is deliberately empty at this
 * point in the flow — Prioritization (the next stage) is where those get
 * added — rather than faking content that doesn't exist yet.
 */
export function ProductDefinitionStage({ className }: ProductDefinitionStageProps) {
  const accomplish = useBuildPathStore((state) => state.discovery.accomplish);
  const problemStatement = useBuildPathStore((state) => state.problemStatement);
  const targetUserGroups = useBuildPathStore((state) => state.targetUserGroups);
  const featureCount = useBuildPathStore((state) => state.features.length);
  const platforms = useBuildPathStore((state) => state.canvasExtras.platforms);
  const constraints = useBuildPathStore((state) => state.canvasExtras.constraints);
  const updateCanvasExtras = useBuildPathStore((state) => state.updateCanvasExtras);

  function togglePlatform(platform: string) {
    const next = platforms.includes(platform)
      ? platforms.filter((candidate) => candidate !== platform)
      : [...platforms, platform];
    updateCanvasExtras({ platforms: next });
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Text variant="body" className="text-muted">
        Here&apos;s what&apos;s been captured so far, and two things to add directly.
      </Text>

      <div className="grid gap-4 sm:grid-cols-2">
        <CanvasCard title="Vision">
          <Text variant="body">
            {accomplish || "Not captured yet — head back to Discovery to add this."}
          </Text>
        </CanvasCard>

        <CanvasCard title="Problem">
          <Text variant="body">
            {problemStatement.problem || "Not captured yet — head back to Discovery to add this."}
          </Text>
          {problemStatement.problem && (
            <Badge variant={problemStatement.confirmed ? "success" : "outline"}>
              {problemStatement.confirmed ? "Confirmed" : "Needs your review"}
            </Badge>
          )}
        </CanvasCard>

        <CanvasCard title="Target users">
          {targetUserGroups.length === 0 ? (
            <Text variant="body" className="text-muted">
              None added yet — head back to Discovery to add who this is for.
            </Text>
          ) : (
            <ul className="space-y-1">
              {targetUserGroups.map((group) => (
                <li key={group.id}>
                  <Text variant="body">{group.role}</Text>
                </li>
              ))}
            </ul>
          )}
        </CanvasCard>

        <CanvasCard title="Key features">
          <Text variant="body" className="text-muted">
            {featureCount === 0
              ? "You'll add features in the next step, Prioritization."
              : `${featureCount} feature${featureCount === 1 ? "" : "s"} added so far.`}
          </Text>
        </CanvasCard>

        <Card className="space-y-3 p-5 sm:col-span-2">
          <Text variant="caption" className="text-muted font-medium">
            Platforms
          </Text>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Platforms">
            {PLATFORM_OPTIONS.map((platform) => {
              const selected = platforms.includes(platform);
              return (
                <Button
                  key={platform}
                  type="button"
                  size="sm"
                  variant={selected ? "primary" : "outline"}
                  aria-pressed={selected}
                  onClick={() => togglePlatform(platform)}
                >
                  {platform}
                </Button>
              );
            })}
          </div>
        </Card>

        <Card className="space-y-2 p-5 sm:col-span-2">
          <Label htmlFor="product-constraints">Constraints</Label>
          <Textarea
            id="product-constraints"
            value={constraints}
            placeholder="Budget, timeline, existing systems, compliance requirements..."
            rows={3}
            onChange={(event) => updateCanvasExtras({ constraints: event.target.value })}
          />
        </Card>
      </div>
    </div>
  );
}
