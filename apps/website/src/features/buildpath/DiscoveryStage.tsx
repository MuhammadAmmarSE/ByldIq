"use client";

import { Heading } from "@/components/Heading";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/Textarea";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import { DISCOVERY_FIELDS } from "./data/discovery-fields";
import { DiscoveryConversation } from "./DiscoveryConversation";
import { ProblemDefinitionPanel } from "./ProblemDefinitionPanel";
import { TargetUsersPanel } from "./TargetUsersPanel";
import type { DiscoveryStageProps } from "./DiscoveryStage.types";

/**
 * CLAUDE.md Milestone 14 §7's Discovery stage: the AI conversation, a
 * structured recap of the same answers for direct editing, the Problem
 * Definition draft, and Target User capture — composed from four
 * independently testable pieces rather than one large component.
 */
export function DiscoveryStage({ className }: DiscoveryStageProps) {
  const discovery = useBuildPathStore((state) => state.discovery);
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);

  return (
    <div className={cn("space-y-10", className)}>
      <DiscoveryConversation />

      <div className="space-y-4">
        <Heading variant="h5" as="h3">
          Or edit your answers directly
        </Heading>
        <div className="grid gap-4 sm:grid-cols-2">
          {DISCOVERY_FIELDS.map(({ field, label, placeholder, multiline }) => (
            <div key={field} className={cn("space-y-1.5", multiline && "sm:col-span-2")}>
              <Label htmlFor={`discovery-${field}`}>{label}</Label>
              <Textarea
                id={`discovery-${field}`}
                value={discovery[field]}
                placeholder={placeholder}
                rows={multiline ? 2 : 1}
                onChange={(event) => updateDiscovery({ [field]: event.target.value })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-border space-y-4 border-t pt-8">
        <Heading variant="h5" as="h3">
          Problem definition
        </Heading>
        <ProblemDefinitionPanel />
      </div>

      <div className="border-border space-y-4 border-t pt-8">
        <Heading variant="h5" as="h3">
          Target users
        </Heading>
        <TargetUsersPanel />
      </div>
    </div>
  );
}
