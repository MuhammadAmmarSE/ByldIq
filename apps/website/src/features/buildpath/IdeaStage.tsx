"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import { Text } from "@/components/Text";
import { Textarea } from "@/components/Textarea";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import { PROJECT_TYPES } from "./types";
import type { IdeaStageProps } from "./IdeaStage.types";

/**
 * CLAUDE.md Milestone 14 §§4, 6: the Welcome Experience — deliberately not
 * a form. One open question ("what are you building?") and a multi-select
 * of project types, both optional here and revisited in Discovery, so
 * there's nothing to get "wrong" before moving on.
 */
export function IdeaStage({ className }: IdeaStageProps) {
  const projectTypes = useBuildPathStore((state) => state.projectTypes);
  const toggleProjectType = useBuildPathStore((state) => state.toggleProjectType);
  const accomplish = useBuildPathStore((state) => state.discovery.accomplish);
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);

  return (
    <div className={cn("space-y-8", className)}>
      <Text variant="body">
        There&apos;s no wrong answer here — this just gives Byld a starting point. You can change
        anything as you go.
      </Text>

      <div className="space-y-2">
        <Label htmlFor="idea-accomplish">In a sentence or two, what are you building?</Label>
        <Textarea
          id="idea-accomplish"
          value={accomplish}
          onChange={(event) => updateDiscovery({ accomplish: event.target.value })}
          placeholder="e.g. A booking tool for independent physiotherapists to manage appointments and patient notes."
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Text variant="caption" className="text-muted font-medium">
          Which of these sound like what you&apos;re building? (Choose as many as apply.)
        </Text>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Project type">
          {PROJECT_TYPES.map((type) => {
            const selected = projectTypes.includes(type);
            return (
              <Button
                key={type}
                type="button"
                size="sm"
                variant={selected ? "primary" : "outline"}
                aria-pressed={selected}
                onClick={() => toggleProjectType(type)}
              >
                {type}
              </Button>
            );
          })}
        </div>
        {projectTypes.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {projectTypes.map((type) => (
              <Badge key={type} variant="accent">
                {type}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
