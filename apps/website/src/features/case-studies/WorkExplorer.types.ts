export interface WorkExplorerProps {
  className?: string;
  /** Prefills the search box — used by `/work/search?q=`. */
  initialQuery?: string;
  /** Preselects an industry filter — used by `/work/industry/[industry]`. */
  initialIndustryFilter?: string;
  /** Preselects a technology filter — used by `/work/technology/[technology]`. */
  initialTechnologyFilter?: string;
  /** Preselects a business-problem filter — used by `/work/business-problem/[problem]`. */
  initialBusinessProblemFilter?: string;
  /** Overrides the hero's default headline for facet-specific landing pages. */
  headline?: string;
  /** Overrides the hero's default supporting copy for facet-specific landing pages. */
  supportingCopy?: string;
}
