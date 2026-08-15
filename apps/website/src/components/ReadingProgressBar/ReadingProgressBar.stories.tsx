import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ReadingProgressBar } from "./ReadingProgressBar";

const meta = {
  title: "Foundation/ReadingProgressBar",
  component: ReadingProgressBar,
} satisfies Meta<typeof ReadingProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
