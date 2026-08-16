"use client";

import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { IntegrationsSelector } from "./IntegrationsSelector";
import type { ArchitectureStageProps } from "./ArchitectureStage.types";

/** CLAUDE.md Milestone 14 §§12, 14's Architecture stage: integrations first, since they change the diagram below. */
export function ArchitectureStage({ className }: ArchitectureStageProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <Text variant="body" className="text-muted">
        This is a starting point based on what you&apos;ve shared, not a final decision — every node
        explains what it is, why it&apos;s here, and what the alternative would look like.
      </Text>
      <IntegrationsSelector />
      <ArchitectureDiagram />
    </div>
  );
}
