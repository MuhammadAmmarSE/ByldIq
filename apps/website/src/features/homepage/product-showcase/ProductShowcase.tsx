"use client";

import { useEffect } from "react";
import type { ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { AiWorkspacePod } from "./pods/AiWorkspacePod";
import { AutomationBuilderPod } from "./pods/AutomationBuilderPod";
import { CommerceDashboardPod } from "./pods/CommerceDashboardPod";
import { DeveloperPlatformPod } from "./pods/DeveloperPlatformPod";
import { EnterpriseOperationsPod } from "./pods/EnterpriseOperationsPod";
import { HealthcarePlatformPod } from "./pods/HealthcarePlatformPod";
import { MobileProductPod } from "./pods/MobileProductPod";
import type { ProductShowcaseProps } from "./ProductShowcase.types";

interface PodDefinition {
  id: string;
  label: string;
  Component: ComponentType<{ onInteraction?: (action: string) => void }>;
}

const PODS: PodDefinition[] = [
  { id: "ai-workspace", label: "AI Workspace", Component: AiWorkspacePod },
  { id: "commerce", label: "Commerce Dashboard", Component: CommerceDashboardPod },
  { id: "enterprise", label: "Enterprise Operations", Component: EnterpriseOperationsPod },
  { id: "automation", label: "Automation Builder", Component: AutomationBuilderPod },
  { id: "developer", label: "Developer Platform", Component: DeveloperPlatformPod },
  { id: "mobile", label: "Mobile Product", Component: MobileProductPod },
  { id: "healthcare", label: "Healthcare Platform", Component: HealthcarePlatformPod },
];

/**
 * CLAUDE.md Part 14's Interactive Product Showcase: seven "Experience
 * Pods," each a genuinely interactive mini-product over local mock state —
 * no fake screenshots. Every pod uses a fictional company from the shared
 * roster (`@/features/homepage/shared`), the same one Phase 5's Proof
 * Engine case studies use.
 */
export function ProductShowcase({ className }: ProductShowcaseProps) {
  const analytics = useAnalytics();
  const [firstPod] = PODS;

  useEffect(() => {
    if (firstPod) analytics.track("showcase_pod_viewed", { pod: firstPod.id });
    // Only the initial pod on mount — subsequent views are tracked by onValueChange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      <Tabs
        defaultValue={firstPod?.id}
        onValueChange={(pod) => analytics.track("showcase_pod_viewed", { pod })}
      >
        <TabsList
          aria-label="Product showcase experiences"
          className="w-full flex-nowrap overflow-x-auto border-b-0"
        >
          {PODS.map((pod) => (
            <TabsTrigger key={pod.id} value={pod.id} className="shrink-0">
              {pod.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PODS.map(({ id, Component }) => (
          <TabsContent key={id} value={id} className="pt-6">
            <Component
              onInteraction={(action) =>
                analytics.track("showcase_interaction", { pod: id, action })
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
