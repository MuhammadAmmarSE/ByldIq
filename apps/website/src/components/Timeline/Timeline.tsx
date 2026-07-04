import { Check } from "lucide-react";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { TimelineProps, TimelineStatus } from "./Timeline.types";

const DOT_STYLES: Record<TimelineStatus, string> = {
  complete: "bg-accent border-accent",
  current: "bg-surface border-accent",
  upcoming: "bg-surface border-border",
};

function TimelineDot({ status }: { status: TimelineStatus }) {
  return (
    <span
      className={cn(
        "z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2",
        DOT_STYLES[status],
      )}
    >
      {status === "complete" && <Icon icon={Check} size="xs" className="text-accent-foreground" />}
    </span>
  );
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const status = item.status ?? "upcoming";
        const isLast = index === items.length - 1;
        return (
          <li key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className="bg-border absolute top-6 left-3 h-[calc(100%-1.5rem)] w-0.5 -translate-x-1/2"
              />
            )}
            <TimelineDot status={status} />
            <div className="pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  status === "upcoming" ? "text-muted" : "text-foreground",
                )}
              >
                {item.title}
              </p>
              {item.description && <p className="text-muted mt-1 text-sm">{item.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
