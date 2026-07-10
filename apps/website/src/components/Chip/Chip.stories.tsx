import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CHIP_VARIANTS } from "./Chip.types";
import { Chip } from "./Chip";

const meta = {
  title: "Foundation/Chip",
  component: Chip,
  args: { children: "Frontend" },
  argTypes: {
    variant: { control: "select", options: CHIP_VARIANTS },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {CHIP_VARIANTS.map((variant) => (
        <Chip key={variant} variant={variant}>
          {variant}
        </Chip>
      ))}
    </div>
  ),
};

export const Selectable: Story = {
  render: function SelectableChips() {
    const options = ["Frontend", "Backend", "AI", "Cloud"];
    const [selected, setSelected] = useState<string[]>(["AI"]);

    function toggle(option: string) {
      setSelected((current) =>
        current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
      );
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <Chip key={option} selected={selected.includes(option)} onClick={() => toggle(option)}>
            {option}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Removable: Story = {
  render: function RemovableChips() {
    const [tags, setTags] = useState(["Next.js", "PostgreSQL", "Kubernetes"]);

    return (
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="outline"
            dismissLabel={`Remove ${tag}`}
            onDismiss={() => setTags((current) => current.filter((item) => item !== tag))}
          >
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};
