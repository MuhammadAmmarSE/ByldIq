import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProblemDefinitionPanel } from "./ProblemDefinitionPanel";

const meta = {
  title: "BuildPath/ProblemDefinitionPanel",
  component: ProblemDefinitionPanel,
} satisfies Meta<typeof ProblemDefinitionPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
