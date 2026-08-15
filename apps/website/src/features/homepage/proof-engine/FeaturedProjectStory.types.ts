import type { CaseStudy, FictionalCompany } from "@/features/case-studies";

export interface FeaturedProjectStoryProps {
  caseStudy: CaseStudy;
  company: FictionalCompany;
  /** Called with the case study's slug when "Read the full story" is clicked — e.g. for click analytics. */
  onSelect?: (slug: string) => void;
  className?: string;
}
