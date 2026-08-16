import type { EntryContext, ProjectType } from "./types";

export interface BuildPathShellProps {
  /** Where the visitor entered BuildPath from, resolved server-side from query params — null for a direct visit. */
  entryContext: EntryContext | null;
  /** Project types to prefill when this is a genuinely fresh session — see `applyEntryContext`. */
  prefillProjectTypes: ProjectType[];
  className?: string;
}
