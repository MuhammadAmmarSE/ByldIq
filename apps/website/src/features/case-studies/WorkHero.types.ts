import type { CaseStudy } from "./data/case-study.schema";

export interface WorkHeroIndustry {
  slug: string;
  label: string;
}

export interface WorkHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  industries: WorkHeroIndustry[];
  industryFilter: string | null;
  onIndustryQuickFilter: (industry: string | null) => void;
  featured?: CaseStudy;
  /** Overrides the default "Engineering Stories, Not Portfolios." headline. */
  headline?: string;
  /** Overrides the default supporting copy below the headline. */
  supportingCopy?: string;
  className?: string;
}
