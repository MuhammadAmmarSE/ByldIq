import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AiCompanionHighlight } from "./AiCompanionHighlight";

const meta = {
  title: "Homepage/AiCompanionHighlight",
  component: AiCompanionHighlight,
} satisfies Meta<typeof AiCompanionHighlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
