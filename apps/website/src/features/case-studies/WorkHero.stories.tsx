import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CASE_STUDIES } from "./data/case-studies";
import { WorkHero } from "./WorkHero";

const featured = CASE_STUDIES.find((caseStudy) => caseStudy.featured);

const meta = {
  title: "CaseStudies/WorkHero",
  component: WorkHero,
  args: {
    query: "",
    onQueryChange: () => {},
    industries: [
      { slug: "field-services", label: "Field Services" },
      { slug: "logistics", label: "Logistics" },
      { slug: "retail", label: "Retail" },
      { slug: "artificial-intelligence", label: "Artificial Intelligence" },
      { slug: "developer-tools", label: "Developer Tools" },
    ],
    industryFilter: null,
    onIndustryQuickFilter: () => {},
    featured,
  },
} satisfies Meta<typeof WorkHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
