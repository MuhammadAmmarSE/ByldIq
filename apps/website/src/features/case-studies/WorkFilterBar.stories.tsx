import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WorkFilterBar } from "./WorkFilterBar";

const meta = {
  title: "CaseStudies/WorkFilterBar",
  component: WorkFilterBar,
  args: {
    industries: [
      { slug: "field-services", label: "Field Services" },
      { slug: "logistics", label: "Logistics" },
      { slug: "retail", label: "Retail" },
    ],
    industryFilter: null,
    onIndustryFilterChange: () => {},
    technologies: [
      { slug: "next-js", label: "Next.js" },
      { slug: "kubernetes", label: "Kubernetes" },
    ],
    technologyFilter: null,
    onTechnologyFilterChange: () => {},
    businessProblems: [
      { slug: "mvp-validation", label: "MVP Validation" },
      { slug: "legacy-modernization", label: "Legacy Modernization" },
    ],
    businessProblemFilter: null,
    onBusinessProblemFilterChange: () => {},
    aiOnly: false,
    onAiOnlyChange: () => {},
  },
} satisfies Meta<typeof WorkFilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
