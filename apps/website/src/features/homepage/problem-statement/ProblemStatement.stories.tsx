import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProblemStatement } from "./ProblemStatement";

const meta = {
  title: "Homepage/ProblemStatement",
  component: ProblemStatement,
} satisfies Meta<typeof ProblemStatement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
