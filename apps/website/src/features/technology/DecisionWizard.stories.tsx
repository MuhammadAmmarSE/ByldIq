import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DecisionWizard } from "./DecisionWizard";

const meta = {
  title: "Technology/DecisionWizard",
  component: DecisionWizard,
} satisfies Meta<typeof DecisionWizard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
