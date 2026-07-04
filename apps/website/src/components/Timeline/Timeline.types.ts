import type { ReactNode } from "react";

export const TIMELINE_STATUSES = ["complete", "current", "upcoming"] as const;

export type TimelineStatus = (typeof TIMELINE_STATUSES)[number];

export interface TimelineItem {
  title: ReactNode;
  description?: ReactNode;
  status?: TimelineStatus;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}
