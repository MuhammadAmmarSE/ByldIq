import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyQuote } from "./CaseStudyQuote";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudyWithQuote = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudyWithQuote) throw new Error("Missing fieldnote-mvp case study fixture");

const caseStudyWithoutQuote = CASE_STUDIES.find(
  (candidate) => candidate.slug === "atlas-logistics-modernization",
);
if (!caseStudyWithoutQuote)
  throw new Error("Missing atlas-logistics-modernization case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyQuote",
  component: CaseStudyQuote,
  args: { caseStudy: caseStudyWithQuote },
} satisfies Meta<typeof CaseStudyQuote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Renders nothing — this case study has no testimonial, and one isn't fabricated to fill the gap. */
export const NoTestimonial: Story = {
  args: { caseStudy: caseStudyWithoutQuote },
};
