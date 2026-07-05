import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WorkExplorer } from "./WorkExplorer";

const meta = {
  title: "CaseStudies/WorkExplorer",
  component: WorkExplorer,
} satisfies Meta<typeof WorkExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
