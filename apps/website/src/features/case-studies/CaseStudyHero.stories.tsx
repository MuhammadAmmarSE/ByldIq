import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyHero } from "./CaseStudyHero";
import { CASE_STUDIES } from "./data/case-studies";
import { FICTIONAL_COMPANIES } from "./data/fictional-companies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");
const company = FICTIONAL_COMPANIES.find((candidate) => candidate.id === caseStudy.companyId);
if (!company) throw new Error("Missing fieldnote company fixture");

const meta = {
  title: "CaseStudies/CaseStudyHero",
  component: CaseStudyHero,
  args: { caseStudy, company },
} satisfies Meta<typeof CaseStudyHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
