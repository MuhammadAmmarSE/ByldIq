import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudyDiscovery } from "./CaseStudyDiscovery";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

const meta = {
  title: "CaseStudies/CaseStudyDiscovery",
  component: CaseStudyDiscovery,
  args: { caseStudy },
} satisfies Meta<typeof CaseStudyDiscovery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
