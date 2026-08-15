import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";

import { FeaturedProjectStory } from "./FeaturedProjectStory";

const caseStudy = CASE_STUDIES.find((cs) => cs.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp fixture");

const company = FICTIONAL_COMPANIES.find((candidate) => candidate.id === caseStudy.companyId);
if (!company) throw new Error("Missing Fieldnote company fixture");

const meta = {
  title: "Homepage/ProofEngine/FeaturedProjectStory",
  component: FeaturedProjectStory,
  args: { caseStudy, company },
} satisfies Meta<typeof FeaturedProjectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
