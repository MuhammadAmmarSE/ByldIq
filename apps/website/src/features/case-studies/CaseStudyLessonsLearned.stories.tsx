import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyLessonsLearned } from "./CaseStudyLessonsLearned";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyLessonsLearned",
  component: CaseStudyLessonsLearned,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyLessonsLearned>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
