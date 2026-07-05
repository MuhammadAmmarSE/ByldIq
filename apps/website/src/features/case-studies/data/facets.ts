import { slugify } from "@/utils/slugify";

import { CASE_STUDIES } from "./case-studies";
import { FICTIONAL_COMPANIES } from "./fictional-companies";

export interface WorkFacet {
  slug: string;
  label: string;
}

/**
 * Derived filter facets shared by `/work`, `/work/industry/[industry]`,
 * and `/work/technology/[technology]` (CLAUDE.md Part 21's required
 * routes) — computed once here instead of duplicated in `WorkExplorer`
 * and each route's `generateStaticParams`, since both need the exact same
 * slug↔label mapping to stay in sync.
 */
export const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

export const INDUSTRIES: WorkFacet[] = Array.from(
  new Map(
    CASE_STUDIES.map((caseStudy) => COMPANIES_BY_ID.get(caseStudy.companyId)?.industry)
      .filter((industry): industry is string => Boolean(industry))
      .map((industry) => [slugify(industry), industry]),
  ),
).map(([slug, label]) => ({ slug, label }));

export const TECHNOLOGIES: WorkFacet[] = Array.from(
  new Map(
    CASE_STUDIES.flatMap((caseStudy) => caseStudy.technologies).map((technology) => [
      slugify(technology),
      technology,
    ]),
  ),
).map(([slug, label]) => ({ slug, label }));
