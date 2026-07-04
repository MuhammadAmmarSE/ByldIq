import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SPINNER_SIZES } from "./Spinner.types";
import { Spinner } from "./Spinner";

const meta = {
  title: "Foundation/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: SPINNER_SIZES },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {SPINNER_SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-muted font-mono text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const OnAccentBackground: Story = {
  render: () => (
    <div className="bg-accent text-accent-foreground inline-flex rounded-md p-3">
      <Spinner />
    </div>
  ),
};
