import { ArrowRight, Sparkles } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ICON_SIZES } from "./Icon.types";
import { Icon } from "./Icon";

const meta = {
  title: "Foundation/Icon",
  component: Icon,
  args: { icon: ArrowRight },
  argTypes: {
    size: { control: "select", options: Object.keys(ICON_SIZES) },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(Object.keys(ICON_SIZES) as Array<keyof typeof ICON_SIZES>).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={Sparkles} size={size} />
          <span className="text-muted font-mono text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Labelled: Story = {
  args: { icon: Sparkles, label: "Suggestions available" },
};
