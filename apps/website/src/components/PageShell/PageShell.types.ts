import type { ReactNode } from "react";

import type { NavItem } from "@/types/navigation";

export interface PageShellProps {
  children: ReactNode;
  /** Composed by `app/layout.tsx` (Pages layer) since real nav content needs feature data — kept out of this Shared-layer component per CLAUDE.md Part 27's dependency direction. Defaults to none. */
  navItems?: NavItem[];
}
