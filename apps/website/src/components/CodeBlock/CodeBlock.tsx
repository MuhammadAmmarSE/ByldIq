"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { splitTokensIntoLines, tokenizeCode, type Token } from "./tokenize";
import type { CodeBlockProps } from "./CodeBlock.types";

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Shell",
  typescript: "TypeScript",
  tsx: "TSX",
  json: "JSON",
  text: "Text",
};

const TOKEN_CLASS: Record<Token["type"], string> = {
  plain: "text-foreground",
  keyword: "text-accent",
  string: "text-success",
  comment: "text-muted italic",
  number: "text-foreground",
};

const DEFAULT_COLLAPSE_AFTER_LINES = 16;
const COPY_RESET_MS = 1500;

/**
 * CLAUDE.md Part 18/19's code block requirements: syntax highlighting,
 * copy button, line numbers, line highlighting, filename, language
 * label, expand/collapse. Highlighting is a small custom tokenizer
 * (`tokenize.ts`), not a grammar-based library — see that file's doc
 * comment for why. A single client component (not a server/client
 * split) since the tokenizer itself is tiny; there's no large bundle to
 * avoid shipping by splitting it further.
 */
export function CodeBlock({
  code,
  language,
  filename,
  highlightLines = [],
  collapseAfterLines = DEFAULT_COLLAPSE_AFTER_LINES,
  className,
}: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [expanded, setExpanded] = useState(false);

  const lines = splitTokensIntoLines(tokenizeCode(code, language));
  const canCollapse = lines.length > collapseAfterLines;
  const visibleLines = canCollapse && !expanded ? lines.slice(0, collapseAfterLines) : lines;
  const hiddenLineCount = lines.length - visibleLines.length;
  const highlighted = new Set(highlightLines);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), COPY_RESET_MS);
    } catch {
      // Clipboard access can be denied (permissions, insecure context) — the
      // button simply doesn't confirm; there's nothing else safe to do.
    }
  }

  return (
    <div className={cn("bg-surface-raised overflow-hidden rounded-lg border", className)}>
      <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-2">
        <div className="flex items-center gap-2 overflow-hidden">
          {filename && (
            <Text variant="code" className="truncate bg-transparent px-0 py-0">
              {filename}
            </Text>
          )}
          <Text variant="caption">{LANGUAGE_LABELS[language] ?? language}</Text>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted hover:text-foreground flex shrink-0 items-center gap-1.5 text-sm transition-colors"
        >
          <Icon icon={copyState === "copied" ? Check : Copy} size="sm" />
          {copyState === "copied" ? "Copied" : "Copy"}
        </button>
      </div>

      <div
        className="overflow-x-auto"
        tabIndex={0}
        aria-label={filename ? `Code: ${filename}, scrollable` : "Code, scrollable"}
      >
        <pre className="p-4 font-mono text-sm leading-relaxed">
          <code>
            {visibleLines.map((lineTokens, index) => {
              const lineNumber = index + 1;
              return (
                <span
                  key={lineNumber}
                  data-line-number={lineNumber}
                  className={cn(
                    "-mx-2 flex gap-4 px-2",
                    highlighted.has(lineNumber) && "bg-accent/10 border-accent border-l-2",
                  )}
                >
                  <span className="text-muted w-6 shrink-0 text-right select-none" aria-hidden>
                    {lineNumber}
                  </span>
                  <span className="whitespace-pre">
                    {lineTokens.length === 0
                      ? " "
                      : lineTokens.map((token, tokenIndex) => (
                          <span key={tokenIndex} className={TOKEN_CLASS[token.type]}>
                            {token.text}
                          </span>
                        ))}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      {canCollapse && (
        <div className="border-border border-t px-4 py-2">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="text-muted hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          >
            <Icon icon={expanded ? ChevronUp : ChevronDown} size="sm" />
            {expanded ? "Show less" : `Show ${hiddenLineCount} more lines`}
          </button>
        </div>
      )}
    </div>
  );
}
