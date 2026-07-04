import { useState } from "react";
import { FileText, Home, Layers, Moon, Sparkles } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { CommandPalette } from "./CommandPalette";
import type { CommandPaletteGroup } from "./CommandPalette.types";

const meta = {
  title: "Foundation/CommandPalette",
  component: CommandPalette,
  args: { open: false, onOpenChange: () => {}, groups: [] },
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

const exampleGroups: CommandPaletteGroup[] = [
  {
    heading: "Pages",
    items: [
      { id: "home", label: "Homepage", icon: Home, onSelect: () => {} },
      { id: "solutions", label: "Solutions", icon: Layers, onSelect: () => {} },
    ],
  },
  {
    heading: "Articles",
    items: [{ id: "article-1", label: "Choosing a database", icon: FileText, onSelect: () => {} }],
  },
  {
    heading: "Commands",
    items: [
      { id: "toggle-theme", label: "Toggle theme", icon: Moon, shortcut: "T", onSelect: () => {} },
      { id: "ask-ai", label: "Ask Byld", icon: Sparkles, shortcut: "A", onSelect: () => {} },
    ],
  },
];

export const Default: Story = {
  render: () => {
    function Interactive() {
      const [open, setOpen] = useState(true);
      return <CommandPalette open={open} onOpenChange={setOpen} groups={exampleGroups} />;
    }
    return <Interactive />;
  },
};

export const TriggeredFromButton: Story = {
  render: () => {
    function Interactive() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Command Palette (⌘K)</Button>
          <CommandPalette open={open} onOpenChange={setOpen} groups={exampleGroups} />
        </>
      );
    }
    return <Interactive />;
  },
};

export const Empty: Story = {
  parameters: {
    // A listbox with zero options (search matched nothing) is a real,
    // expected cmdk state — this project's Command Palette, VS Code's, and
    // Linear's all render it — but strict ARIA authoring rules require a
    // listbox to always contain at least one option/group, so axe flags it.
    a11y: { config: { rules: [{ id: "aria-required-children", enabled: false }] } },
  },
  render: () => {
    function Interactive() {
      const [open, setOpen] = useState(true);
      return <CommandPalette open={open} onOpenChange={setOpen} groups={[]} />;
    }
    return <Interactive />;
  },
};
