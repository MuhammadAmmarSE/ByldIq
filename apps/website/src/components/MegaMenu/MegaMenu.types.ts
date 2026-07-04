import type { NavItem } from "@/types/navigation";

export interface MegaMenuProps {
  /** Must have at least one entry in `children` — render a plain link instead when there are none. */
  item: NavItem;
  className?: string;
}
