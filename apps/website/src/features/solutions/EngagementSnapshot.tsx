import { Clock, Compass, Users } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { EngagementSnapshotProps } from "./EngagementSnapshot.types";

/**
 * Milestone 10's "Timeline / Team composition / Estimated investment" —
 * three quick facts distinct from `DeliveryFramework` (the shared
 * nine-stage engineering *process*, not a duration) and from
 * `SuccessMetrics` (outcomes, not engagement logistics).
 */
export function EngagementSnapshot({ solution, className }: EngagementSnapshotProps) {
  return (
    <section id="engagement-snapshot" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        What to expect
      </Heading>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-border bg-surface-raised space-y-2 rounded-lg border p-4">
          <div className="text-muted flex items-center gap-2 text-sm font-medium">
            <Icon icon={Clock} size="sm" />
            Timeline
          </div>
          <Text variant="body">{solution.deliveryTimeline}</Text>
        </div>

        <div className="border-border bg-surface-raised space-y-2 rounded-lg border p-4">
          <div className="text-muted flex items-center gap-2 text-sm font-medium">
            <Icon icon={Users} size="sm" />
            Team
          </div>
          <ul className="space-y-1">
            {solution.teamComposition.map((role) => (
              <Text key={role} variant="body" as="li">
                {role}
              </Text>
            ))}
          </ul>
        </div>

        <div className="border-border bg-surface-raised space-y-2 rounded-lg border p-4">
          <div className="text-muted flex items-center gap-2 text-sm font-medium">
            <Icon icon={Compass} size="sm" />
            Investment
          </div>
          <Text variant="body">{solution.investmentGuidance}</Text>
        </div>
      </div>
    </section>
  );
}
