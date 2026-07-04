import type { LucideIcon } from "lucide-react";

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteGroup {
  heading: string;
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  groups: CommandPaletteGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
}
