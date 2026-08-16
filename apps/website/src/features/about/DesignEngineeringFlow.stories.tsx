import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DesignEngineeringFlow } from "./DesignEngineeringFlow";

const meta = {
  title: "About/DesignEngineeringFlow",
  component: DesignEngineeringFlow,
} satisfies Meta<typeof DesignEngineeringFlow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
