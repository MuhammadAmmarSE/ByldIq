"use client";

import { Fragment } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";

import { Icon } from "@/components/Icon";

import type { CommandPaletteProps } from "./CommandPalette.types";

/**
 * Structural only, per Milestone 2 scope — real pages/articles/technologies
 * are supplied by `groups` once those platforms exist (CLAUDE.md Part 8's
 * "searches Pages, Projects, Articles, Technologies, Commands, BuildPath,
 * AI"). `CommandPaletteProvider` wires the global Cmd/Ctrl+K shortcut and
 * lazy-loads this component; render it directly only in tests/stories.
 */
export function CommandPalette({
  groups,
  open,
  onOpenChange,
  placeholder = "Search pages, articles, technologies...",
}: CommandPaletteProps) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command Palette"
      overlayClassName="bg-foreground/[var(--opacity-overlay)] fixed inset-0 z-modal data-[state=open]:animate-[command-palette-in_var(--duration-base)_var(--ease-decelerate)]"
      contentClassName="bg-surface border-border fixed top-[20%] left-1/2 z-modal w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border shadow-xl focus:outline-none data-[state=open]:animate-[command-palette-in_var(--duration-base)_var(--ease-decelerate)]"
    >
      <CommandInput
        placeholder={placeholder}
        className="border-border placeholder:text-muted text-foreground w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
      />
      <CommandList className="max-h-80 overflow-y-auto p-2">
        <CommandEmpty className="text-muted py-6 text-center text-sm">
          No results found.
        </CommandEmpty>
        {groups.map((group, index) => (
          <Fragment key={group.heading}>
            {index > 0 && (
              // cmdk hardcodes `role="separator"` here, which isn't a valid
              // direct child of the listbox's `role="listbox"` per ARIA —
              // it's purely a visual divider, so hide it from the a11y tree.
              <CommandSeparator aria-hidden="true" className="bg-border my-2 h-px" />
            )}
            <CommandGroup
              heading={group.heading}
              className="[&_[cmdk-group-heading]]:text-muted px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
            >
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => {
                    item.onSelect();
                    onOpenChange(false);
                  }}
                  className="text-foreground data-[selected=true]:bg-surface-raised flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm"
                >
                  {item.icon && <Icon icon={item.icon} size="sm" className="text-muted" />}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && <span className="text-muted text-xs">{item.shortcut}</span>}
                </CommandItem>
              ))}
            </CommandGroup>
          </Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
