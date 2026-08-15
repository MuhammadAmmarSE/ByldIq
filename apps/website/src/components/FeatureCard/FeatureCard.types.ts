import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  /** Makes the whole card a link (e.g. to a technology or solution page) instead of a static informational card. */
  href?: string;
  /** A visible "Learn more"-style CTA line at the bottom, e.g. "Explore Startup Solutions". Ignored without `href` — a static card has nowhere to send a click. */
  ctaLabel?: string;
  /** Fires alongside navigation, e.g. for analytics. Ignored without `href`. */
  onClick?: () => void;
  className?: string;
}
