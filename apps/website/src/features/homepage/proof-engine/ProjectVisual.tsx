import { BlueprintGrid } from "@/components/BlueprintGrid";
import { cn } from "@/utils/cn";

import type { ProjectVisualProps } from "./ProjectVisual.types";

/**
 * A geometric stand-in for a project photo (CLAUDE.md Part 11's "Project
 * Image" slot on `ProjectCard` and the Featured Project presentation) —
 * no real product photography exists for the fictional companies in
 * `data/case-studies.ts`, and Part 5's photography philosophy rules out
 * generic stock imagery as a substitute ("Avoid generic office photos...
 * whenever possible, create original imagery"). An accent gradient plus
 * `BlueprintGrid` reads as "engineered," per Part 5's illustration
 * philosophy (blueprint/wireframe/minimal geometric), rather than as an
 * empty placeholder.
 *
 * One consistent treatment everywhere it's used, not per-project color
 * variation — Part 20's visual direction explicitly warns against "random
 * gradients." The parent is expected to apply `group` (for the
 * hover-responsive grid opacity below) and control the visual's size via
 * `className`.
 */
export function ProjectVisual({ id, className }: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "from-accent/15 via-surface-raised to-surface relative overflow-hidden bg-gradient-to-br",
        className,
      )}
    >
      <BlueprintGrid
        id={id}
        className="opacity-60 transition-[opacity,transform] duration-300 group-hover:scale-105 group-hover:opacity-90"
      />
    </div>
  );
}
