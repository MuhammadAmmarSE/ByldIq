import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";

import { ProjectGrid } from "./ProjectGrid";

const companiesById = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

const meta = {
  title: "Homepage/ProofEngine/ProjectGrid",
  component: ProjectGrid,
  args: {
    caseStudies: CASE_STUDIES,
    companiesById,
  },
} satisfies Meta<typeof ProjectGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { caseStudies: [] },
};
