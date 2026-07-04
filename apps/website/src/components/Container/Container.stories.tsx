import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CONTAINER_SIZES } from "./Container.types";
import { Container } from "./Container";

const meta = {
  title: "Foundation/Container",
  component: Container,
  argTypes: {
    size: { control: "select", options: CONTAINER_SIZES },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container {...args} className="bg-surface-raised py-4">
      <div className="bg-accent/20 h-12 rounded-md" />
    </Container>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {CONTAINER_SIZES.map((size) => (
        <Container key={size} size={size} className="bg-surface-raised py-4">
          <p className="text-muted font-mono text-xs">size=&quot;{size}&quot;</p>
        </Container>
      ))}
    </div>
  ),
};
