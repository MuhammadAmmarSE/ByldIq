import { Cloud, Rocket, ShieldCheck } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeatureCard } from "./FeatureCard";

const meta = {
  title: "Foundation/FeatureCard",
  component: FeatureCard,
  args: {
    icon: Rocket,
    title: "Fast Deployment",
    description: "Ship to production in minutes, not days.",
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Linked: Story = {
  args: {
    href: "/solutions/startup",
    title: "Startup Solutions",
    description: "MVPs built to validate fast, architecture built to scale.",
    ctaLabel: "Explore Startup Solutions",
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
      <FeatureCard icon={Rocket} title="Fast Deployment" description="Ship in minutes, not days." />
      <FeatureCard
        icon={ShieldCheck}
        title="Secure by Default"
        description="Authentication and authorization built in from day one."
      />
      <FeatureCard
        icon={Cloud}
        title="Cloud Native"
        description="Infrastructure that scales with real traffic, not guesses."
      />
    </div>
  ),
};
