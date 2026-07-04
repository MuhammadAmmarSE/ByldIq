import type { NavItem } from "@/types/navigation";

export interface NavbarProps {
  /** Empty by default — real IA is a content decision, not this milestone's (see config/site.ts). */
  items?: NavItem[];
  className?: string;
  /** Called when the mobile menu trigger is pressed. `PageShell` wires this to `MobileNav`'s open state. */
  onMobileMenuToggle?: () => void;
}
