import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyFinalCta } from "./CaseStudyFinalCta";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyFinalCta",
  component: CaseStudyFinalCta,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyFinalCta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
