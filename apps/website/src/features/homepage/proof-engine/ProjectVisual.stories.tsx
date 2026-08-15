import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProjectVisual } from "./ProjectVisual";

const meta = {
  title: "Homepage/ProofEngine/ProjectVisual",
  component: ProjectVisual,
  args: {
    id: "project-visual-story",
  },
} satisfies Meta<typeof ProjectVisual>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="group w-full max-w-sm">
      <ProjectVisual {...args} className="h-32 w-full rounded-t-lg" />
    </div>
  ),
};

export const FeaturedBand: Story = {
  args: { id: "project-visual-story-featured" },
  render: (args) => (
    <div className="group w-full max-w-2xl">
      <ProjectVisual {...args} className="h-48 w-full rounded-t-lg" />
    </div>
  ),
};
