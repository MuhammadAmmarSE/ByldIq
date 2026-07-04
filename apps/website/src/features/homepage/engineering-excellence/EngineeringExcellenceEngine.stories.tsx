import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EngineeringExcellenceEngine } from "./EngineeringExcellenceEngine";

const meta = {
  title: "Homepage/EngineeringExcellenceEngine",
  component: EngineeringExcellenceEngine,
} satisfies Meta<typeof EngineeringExcellenceEngine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
