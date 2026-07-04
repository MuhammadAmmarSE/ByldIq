import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { Card } from "./Card";

const meta = {
  title: "Foundation/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <h3 className="text-foreground text-lg font-semibold">Startup Product Engineering</h3>
        <p className="text-muted text-sm">Validate, build, and launch with confidence.</p>
      </Card.Header>
      <Card.Content>
        <p className="text-foreground text-sm">
          From MVP validation to production launch, we help startups reduce engineering risk.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Explore Startup Projects</Button>
      </Card.Footer>
    </Card>
  ),
};

export const HeaderAndContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <h3 className="text-foreground text-lg font-semibold">Engineering Excellence</h3>
      </Card.Header>
      <Card.Content>
        <p className="text-foreground text-sm">No footer needed for every card.</p>
      </Card.Content>
    </Card>
  ),
};
