import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyBeforeAfter } from "./CaseStudyBeforeAfter";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudyWithComparison = CASE_STUDIES.find(
  (candidate) => candidate.slug === "harborline-developer-platform",
);
if (!caseStudyWithComparison) {
  throw new Error("Missing harborline-developer-platform case study fixture");
}

const caseStudyWithoutComparison = CASE_STUDIES.find(
  (candidate) => candidate.slug === "fieldnote-mvp",
);
if (!caseStudyWithoutComparison) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyBeforeAfter",
  component: CaseStudyBeforeAfter,
  args: { caseStudy: caseStudyWithComparison },
} satisfies Meta<typeof CaseStudyBeforeAfter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Renders nothing — this case study has no metric encoding a before/after pair, and one isn't fabricated. */
export const NoComparison: Story = {
  args: { caseStudy: caseStudyWithoutComparison },
};
