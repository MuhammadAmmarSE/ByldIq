import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyEngineeringProcess } from "./CaseStudyEngineeringProcess";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyEngineeringProcess",
  component: CaseStudyEngineeringProcess,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyEngineeringProcess>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
