import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologyEcosystem } from "./TechnologyEcosystem";

const meta = {
  title: "Homepage/TechnologyEcosystem",
  component: TechnologyEcosystem,
} satisfies Meta<typeof TechnologyEcosystem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
