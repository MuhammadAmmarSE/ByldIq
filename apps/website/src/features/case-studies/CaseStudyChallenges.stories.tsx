import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyChallenges",
  component: CaseStudyChallenges,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyChallenges>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
