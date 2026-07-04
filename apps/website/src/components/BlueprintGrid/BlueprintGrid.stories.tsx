import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BlueprintGrid } from "./BlueprintGrid";

const meta = {
  title: "Foundation/BlueprintGrid",
  component: BlueprintGrid,
} satisfies Meta<typeof BlueprintGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="border-border bg-surface relative h-64 w-full overflow-hidden rounded-lg border">
      <BlueprintGrid />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="border-border bg-surface relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border">
      <BlueprintGrid />
      <div className="relative text-center">
        <p className="text-foreground font-medium">No results found.</p>
        <p className="text-muted mt-1 text-sm">
          Try exploring Product Engineering or AI Architecture.
        </p>
      </div>
    </div>
  ),
};
