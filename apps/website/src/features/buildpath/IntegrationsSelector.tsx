"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { INTEGRATION_LABELS } from "./data/integration-labels";
import { INTEGRATION_CATEGORIES } from "./types";
import type { IntegrationsSelectorProps } from "./IntegrationsSelector.types";

/**
 * CLAUDE.md Milestone 14 §14's Integrations selection — toggling one here
 * changes `MockAIProvider.generateArchitecture`'s output immediately
 * (`ArchitectureDiagram` reads the same `integrations` array), since
 * architecture is recomputed on every render rather than cached.
 */
export function IntegrationsSelector({ className }: IntegrationsSelectorProps) {
  const integrations = useBuildPathStore((state) => state.integrations);
  const toggleIntegration = useBuildPathStore((state) => state.toggleIntegration);
  const analytics = useAnalytics();

  function handleToggle(category: (typeof INTEGRATION_CATEGORIES)[number]) {
    const enabled = !integrations.includes(category);
    toggleIntegration(category);
    analytics.track("buildpath_integration_toggled", { category, enabled });
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Text variant="caption" className="text-muted font-medium">
        Integrations
      </Text>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Integrations">
        {INTEGRATION_CATEGORIES.map((category) => {
          const selected = integrations.includes(category);
          return (
            <Button
              key={category}
              type="button"
              size="sm"
              variant={selected ? "primary" : "outline"}
              aria-pressed={selected}
              onClick={() => handleToggle(category)}
            >
              {INTEGRATION_LABELS[category]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
