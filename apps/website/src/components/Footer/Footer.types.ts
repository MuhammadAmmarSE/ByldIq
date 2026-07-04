import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import type { NavItem } from "@/types/navigation";

export interface FooterColumn {
  heading: string;
  items: NavItem[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterProps {
  /** Empty by default — per CLAUDE.md Part 8 ("Footer is a navigation hub"), populated once the IA exists. */
  columns?: FooterColumn[];
  socialLinks?: FooterSocialLink[];
  /** Optional newsletter signup slot — content/behavior is a later milestone's decision. */
  newsletter?: ReactNode;
  className?: string;
}
