import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyFaqSection } from "./CaseStudyFaqSection";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyFaqSection",
  component: CaseStudyFaqSection,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyFaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
