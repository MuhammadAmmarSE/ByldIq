import type { Tutorial } from "./data/tutorial.schema";

export interface KnowledgeTutorialDetailProps {
  tutorial: Tutorial;
  categoryLabel?: string;
  className?: string;
}
