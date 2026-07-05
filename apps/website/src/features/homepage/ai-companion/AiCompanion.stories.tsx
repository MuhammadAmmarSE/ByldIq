import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AiCompanionProvider } from "./AiCompanionProvider";

/**
 * Unlike most homepage feature stories, this doesn't wrap a single
 * component — `AiCompanionProvider` mounts the floating trigger and its
 * panel together, since the trigger's only job is to open the panel.
 * Deliberately not part of the global Storybook provider stack (unlike
 * `CommandPaletteProvider`) since the trigger is a persistently visible
 * floating button that would otherwise appear on every unrelated story.
 */
const meta = {
  title: "Homepage/AiCompanion",
  component: AiCompanionProvider,
  args: { children: null },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AiCompanionProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AiCompanionProvider>
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted text-sm">Click the floating button in the corner to open Byld.</p>
      </div>
    </AiCompanionProvider>
  ),
};
