import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EcosystemSection } from "./EcosystemSection";

const meta = {
  title: "About/EcosystemSection",
  component: EcosystemSection,
} satisfies Meta<typeof EcosystemSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
