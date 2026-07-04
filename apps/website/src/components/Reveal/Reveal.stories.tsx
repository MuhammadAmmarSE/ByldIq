import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Reveal } from "./Reveal";

const meta = {
  title: "Foundation/Reveal",
  component: Reveal,
  args: { children: null },
  parameters: {
    // whileInView needs room to scroll into view — fullscreen gives it that.
    layout: "fullscreen",
  },
} satisfies Meta<typeof Reveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-[60vh] p-8">
      <p className="text-muted">Scroll down — the card below reveals on entry.</p>
      <Reveal className="border-border bg-surface-raised rounded-lg border p-6">
        <p className="text-foreground">I fade and slide up when I enter the viewport.</p>
      </Reveal>
    </div>
  ),
};

export const Staggered: Story = {
  render: () => (
    <div className="space-y-[40vh] p-8">
      <p className="text-muted">Scroll down — these reveal in sequence.</p>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className="border-border bg-surface-raised rounded-lg border p-4"
          >
            <p className="text-foreground">Item {i + 1}</p>
          </Reveal>
        ))}
      </div>
    </div>
  ),
};
