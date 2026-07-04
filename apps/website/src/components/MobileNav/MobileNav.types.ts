import type { NavItem } from "@/types/navigation";

export interface MobileNavProps {
  /** Empty by default — see Navbar's doc comment; real IA lands in a later milestone. */
  items?: NavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
