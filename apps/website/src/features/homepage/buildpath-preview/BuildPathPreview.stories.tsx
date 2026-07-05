import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BuildPathPreview } from "./BuildPathPreview";

const meta = {
  title: "Homepage/BuildPathPreview",
  component: BuildPathPreview,
} satisfies Meta<typeof BuildPathPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
