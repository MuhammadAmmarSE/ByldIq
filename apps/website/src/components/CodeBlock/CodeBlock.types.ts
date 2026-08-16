import type { CodeLanguage } from "./tokenize";

export type { CodeLanguage };

export interface CodeBlockProps {
  code: string;
  language: CodeLanguage;
  /** Shown in the header bar next to the language label, e.g. `next.config.ts`. */
  filename?: string;
  /** 1-indexed line numbers to visually emphasize, e.g. the lines a tutorial step just changed. */
  highlightLines?: number[];
  /** Above this many lines, the block collapses behind a "Show N more lines" toggle. Set to `Infinity` to disable collapsing. Defaults to 16. */
  collapseAfterLines?: number;
  className?: string;
}
