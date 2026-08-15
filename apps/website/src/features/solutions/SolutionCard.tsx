import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Cloud,
  Layers,
  Palette,
  Rocket,
  ShoppingBag,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { SolutionCardProps } from "./SolutionCard.types";

/** Exported so other solution-referencing UI (e.g. the homepage's "What We Build" grid) uses the same icon per slug — CLAUDE.md Part 5: "if two components perform the same action, they should behave identically." */
export const SOLUTION_ICONS: Record<string, LucideIcon> = {
  startup: Rocket,
  enterprise: Building2,
  commerce: ShoppingBag,
  "artificial-intelligence": BrainCircuit,
  "platform-engineering": Layers,
  "cloud-infrastructure": Cloud,
  automation: Workflow,
  "product-design": Palette,
  "custom-engineering": Wrench,
};

/**
 * A single Solution Selector card (CLAUDE.md Part 20): business problem,
 * business outcome, typical companies, example products, an architecture
 * preview, and technologies — a real navigable link to the solution page,
 * not a radio choice like the homepage's `JourneyCard` (visiting a
 * solution doesn't persist a site-wide preference the way choosing a
 * journey does).
 */
export function SolutionCard({
  solution,
  isRecommended,
  onSelect,
  onHover,
  className,
}: SolutionCardProps) {
  const icon = SOLUTION_ICONS[solution.slug] ?? Layers;
  const [primaryOutcome] = solution.businessOutcomes;
  const architecturePreview = solution.architecture
    .slice(0, 3)
    .map((node) => node.label)
    .join(" → ");

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      onClick={() => onSelect?.(solution.slug)}
      onPointerEnter={() => onHover?.(solution.slug)}
      className={cn(
        "border-border bg-surface relative flex flex-col gap-4 rounded-lg border p-6 shadow-sm transition",
        "hover:border-accent/50 hover:-translate-y-1 hover:shadow-md",
        "focus-visible:ring-focus-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isRecommended && "border-accent shadow-md",
        className,
      )}
    >
      {isRecommended && (
        <Badge variant="accent" className="absolute -top-3 left-5">
          Recommended for you
        </Badge>
      )}

      <span className="bg-accent/10 text-accent flex size-12 items-center justify-center rounded-full">
        <Icon icon={icon} size="lg" />
      </span>

      <div className="space-y-1.5">
        <Heading variant="h5" as="h2">
          {solution.navLabel}
        </Heading>
        <Text variant="caption">{solution.businessProblem}</Text>
      </div>

      {primaryOutcome && (
        <Text variant="body" className="text-foreground font-medium">
          {primaryOutcome}
        </Text>
      )}

      <div className="space-y-1">
        <Text variant="caption" className="font-medium">
          Typical companies
        </Text>
        <Text variant="caption">{solution.typicalCompanies.join(" · ")}</Text>
      </div>

      <div
        aria-hidden="true"
        className="text-muted border-border bg-surface-raised truncate rounded-md border px-3 py-2 font-mono text-xs"
      >
        {architecturePreview}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {solution.technologies.slice(0, 4).map((technology) => (
          <Badge key={technology.id} variant="outline">
            {technology.name}
          </Badge>
        ))}
      </div>

      <span className="text-accent mt-auto flex items-center gap-1 text-sm font-medium">
        Explore {solution.navLabel}
        <Icon icon={ArrowRight} size="sm" />
      </span>
    </Link>
  );
}
