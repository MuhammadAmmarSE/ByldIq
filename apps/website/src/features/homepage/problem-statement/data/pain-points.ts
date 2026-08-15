import { AlertTriangle, GitBranch, Puzzle, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PainPoint {
  id: string;
  icon: LucideIcon;
  title: string;
  /** The pain, described honestly rather than as a sales pitch. */
  description: string;
  /** How Byld IQ's process addresses it — the section's transition into the solution. */
  response: string;
}

/**
 * Four well-documented, industry-standard failure modes — not invented
 * for this site. They map directly onto the top failure factors research
 * on IT project outcomes repeatedly identifies (incomplete requirements,
 * lack of user involvement, changing requirements, and technology chosen
 * without evaluating trade-offs) — see `ProblemStatement.docs.md` for the
 * sourcing.
 */
export const PAIN_POINTS: PainPoint[] = [
  {
    id: "moving-requirements",
    icon: GitBranch,
    title: "Requirements that keep moving",
    description:
      "Scope grows quietly after work has already started, because nobody stopped to validate the plan before engineering began.",
    response:
      "BuildPath front-loads discovery — business goals, users, and platform are locked into a phased roadmap before a single line of code is written.",
  },
  {
    id: "technical-debt",
    icon: AlertTriangle,
    title: "Technical debt paid for twice",
    description:
      "Shortcuts taken under deadline pressure compound quietly, until the eventual rewrite costs more than doing it right the first time would have.",
    response:
      "Architecture review, testing, and CI/CD are part of the delivery process from day one, not a cleanup phase scheduled for later.",
  },
  {
    id: "late-stakeholders",
    icon: Users,
    title: "Stakeholders who see it too late",
    description:
      "The first time real users or decision-makers see the product is close to launch, when changing course is expensive.",
    response:
      "Staged demos and continuous validation surface misalignment early, when a course correction is still cheap.",
  },
  {
    id: "hype-driven-technology",
    icon: Puzzle,
    title: "Technology chosen for hype, not fit",
    description:
      "A framework or platform gets picked because it's trending, not because anyone evaluated whether it fits the team, timeline, or problem.",
    response:
      "Every technology recommendation explains its trade-offs — strengths, weaknesses, and when it isn't the right choice.",
  },
];
