"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { MegaMenuProps } from "./MegaMenu.types";

/**
 * Click-to-open (Radix Popover's default), not hover-to-open — keyboard
 * users get identical behavior to mouse users this way (`Enter`/`Space` to
 * open, `Escape` to close, `Tab` through the panel), and hover-intent
 * timing is a polish decision deferred until there's real navigation
 * content to tune it against.
 */
export function MegaMenu({ item, className }: MegaMenuProps) {
  const children = item.children ?? [];

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        className={cn(
          "text-muted hover:text-foreground data-[state=open]:text-foreground flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors [&[data-state=open]>svg]:rotate-180",
          className,
        )}
      >
        {item.label}
        <Icon icon={ChevronDown} size="xs" className="transition-transform duration-200" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          className="bg-surface border-border z-dropdown grid w-[min(90vw,32rem)] grid-cols-2 gap-1 rounded-lg border p-3 shadow-lg"
        >
          {children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="hover:bg-surface-raised text-foreground rounded-md p-3 text-sm font-medium"
            >
              {child.label}
            </Link>
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
