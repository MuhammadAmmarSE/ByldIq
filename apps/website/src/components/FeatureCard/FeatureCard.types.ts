import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  /** Makes the whole card a link (e.g. to a technology or solution page) instead of a static informational card. */
  href?: string;
  className?: string;
}
