import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SearchField } from "./SearchField";

const meta = {
  title: "Foundation/SearchField",
  component: SearchField,
  args: {
    "aria-label": "Search knowledge center",
    placeholder: "Search articles, technologies...",
  },
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Clearable: Story = {
  render: (args) => {
    function ClearableSearchField() {
      const [value, setValue] = useState("event-driven architecture");
      return (
        <SearchField
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onClear={() => setValue("")}
        />
      );
    }
    return <ClearableSearchField />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
