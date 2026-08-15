import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TestimonialCard } from "./TestimonialCard";

const meta = {
  title: "Foundation/TestimonialCard",
  component: TestimonialCard,
  // Fictional example content, matching the same "fictional but realistic"
  // precedent CLAUDE.md Part 21 sets for case study companies — not real
  // client attribution.
  args: {
    quote: "BuildPath turned a vague idea into a roadmap we actually trusted.",
    authorName: "Priya Shah",
    authorRole: "CTO, Nova Commerce",
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
      <TestimonialCard
        quote="BuildPath turned a vague idea into a roadmap we actually trusted."
        authorName="Priya Shah"
        authorRole="CTO, Nova Commerce"
      />
      <TestimonialCard
        quote="They explained every architecture trade-off instead of just picking one for us."
        authorName="Marcus Webb"
        authorRole="Founder, Fieldnote"
      />
    </div>
  ),
};
