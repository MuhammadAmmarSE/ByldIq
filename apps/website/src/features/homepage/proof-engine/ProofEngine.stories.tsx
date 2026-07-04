import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProofEngine } from "./ProofEngine";

const meta = {
  title: "Homepage/ProofEngine",
  component: ProofEngine,
} satisfies Meta<typeof ProofEngine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
