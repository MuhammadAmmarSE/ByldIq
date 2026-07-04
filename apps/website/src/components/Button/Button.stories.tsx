import { ArrowRight, Download } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.types";
import { Button } from "./Button";

const meta = {
  title: "Foundation/Button",
  component: Button,
  args: { children: "Book Discovery" },
  argTypes: {
    variant: { control: "select", options: BUTTON_VARIANTS },
    size: { control: "select", options: BUTTON_SIZES },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {BUTTON_SIZES.filter((size) => size !== "icon").map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
      <Button size="icon" aria-label="Download">
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconRight={ArrowRight}>Explore Our Process</Button>
      <Button variant="secondary" iconLeft={Download}>
        Download Resources
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, children: "Generating Roadmap" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">Explore Startup Projects</a>
    </Button>
  ),
};
