import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ALERT_VARIANTS } from "./Alert.types";
import { Alert } from "./Alert";

const meta = {
  title: "Foundation/Alert",
  component: Alert,
  args: {
    title: "Roadmap ready",
    children: "Let's review the next steps together.",
  },
  argTypes: {
    variant: { control: "select", options: ALERT_VARIANTS },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <Alert variant="info" title="Autosaved">
        Your progress is saved automatically as you go.
      </Alert>
      <Alert variant="success" title="Roadmap ready">
        Let&apos;s review the next steps together.
      </Alert>
      <Alert variant="warning" title="Missing information">
        We couldn&apos;t verify that email address. Please check the spelling and try again.
      </Alert>
      <Alert variant="danger" title="Something went wrong">
        We couldn&apos;t generate your roadmap. Please try again.
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { children: undefined },
};
