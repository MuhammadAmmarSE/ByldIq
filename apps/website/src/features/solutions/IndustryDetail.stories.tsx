import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { INDUSTRIES } from "./data/industries";
import { IndustryDetail } from "./IndustryDetail";

const logistics = INDUSTRIES.find((industry) => industry.slug === "logistics");
if (!logistics) throw new Error("Missing logistics industry fixture");

const fintech = INDUSTRIES.find((industry) => industry.slug === "fintech");
if (!fintech) throw new Error("Missing fintech industry fixture");

const meta = {
  title: "Solutions/IndustryDetail",
  component: IndustryDetail,
  args: { industry: logistics },
} satisfies Meta<typeof IndustryDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithCaseStudy: Story = {};

export const WithoutCaseStudy: Story = {
  args: { industry: fintech },
};
