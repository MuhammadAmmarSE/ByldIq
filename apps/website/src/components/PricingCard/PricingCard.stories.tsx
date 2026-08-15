import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PricingCard } from "./PricingCard";

const meta = {
  title: "Foundation/PricingCard",
  component: PricingCard,
  args: {
    tier: "Growth",
    price: "$4,500/mo",
    description: "For teams shipping regularly and scaling their architecture.",
    features: [
      "Weekly architecture reviews",
      "Priority support",
      "Dedicated Slack channel",
      "Quarterly roadmap planning",
    ],
    ctaLabel: "Talk to Byld",
  },
} satisfies Meta<typeof PricingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Featured: Story = {
  args: { featured: true },
};

export const AsLink: Story = {
  args: { ctaHref: "/contact", ctaLabel: "Contact Sales" },
};

export const Row: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-6 sm:grid-cols-3">
      <PricingCard
        tier="Starter"
        price="$1,500/mo"
        description="For early validation."
        features={["Async support", "Monthly check-ins"]}
        ctaLabel="Get Started"
      />
      <PricingCard
        tier="Growth"
        price="$4,500/mo"
        description="For teams scaling their architecture."
        features={["Weekly architecture reviews", "Priority support", "Dedicated Slack channel"]}
        ctaLabel="Talk to Byld"
        featured
      />
      <PricingCard
        tier="Enterprise"
        price="Custom"
        description="For complex, multi-team engagements."
        features={["Dedicated architecture team", "Custom SLAs", "On-site workshops"]}
        ctaLabel="Contact Sales"
        ctaHref="/contact"
      />
    </div>
  ),
};
