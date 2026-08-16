export type CodeLanguage = "bash" | "typescript" | "tsx" | "json" | "text";

export type TokenType = "plain" | "keyword" | "string" | "comment" | "number";

export interface Token {
  type: TokenType;
  text: string;
}

/**
 * A small, dependency-free tokenizer for the handful of languages this
 * site's tutorials actually use — not a real grammar-based highlighter
 * (Shiki, Prism). CLAUDE.md Part 10 explicitly asks code blocks to "avoid
 * unnecessarily shipping large client-side bundles"; a full highlighter's
 * language grammars would cost far more than the four languages here
 * need. Every rule is a plain regex over comments/strings/numbers/
 * keywords — good enough to read at a glance, not a claim of
 * professional-grade highlighting accuracy for arbitrary code.
 */
const JS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "import",
  "export",
  "from",
  "default",
  "interface",
  "type",
  "if",
  "else",
  "for",
  "while",
  "new",
  "class",
  "extends",
  "implements",
  "async",
  "await",
  "try",
  "catch",
  "throw",
  "switch",
  "case",
  "break",
  "continue",
  "typeof",
  "instanceof",
  "in",
  "of",
  "this",
  "super",
  "null",
  "undefined",
  "true",
  "false",
  "void",
  "as",
]);

function jsStringPattern(): string {
  return String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|` + "`(?:[^`\\\\]|\\\\.)*`";
}

const LANGUAGE_PATTERNS: Partial<Record<CodeLanguage, RegExp>> = {
  json: new RegExp(
    `(?<string>"(?:[^"\\\\]|\\\\.)*")|(?<number>-?\\b\\d+(?:\\.\\d+)?\\b)|(?<keyword>\\btrue\\b|\\bfalse\\b|\\bnull\\b)`,
    "g",
  ),
  bash: new RegExp(`(?<comment>#[^\\n]*)|(?<string>${jsStringPattern()})`, "g"),
  typescript: new RegExp(
    `(?<comment>//[^\\n]*|/\\*[\\s\\S]*?\\*/)|(?<string>${jsStringPattern()})|(?<number>\\b\\d+(?:\\.\\d+)?\\b)|(?<word>[A-Za-z_$][A-Za-z0-9_$]*)`,
    "g",
  ),
};
LANGUAGE_PATTERNS.tsx = LANGUAGE_PATTERNS.typescript;

/** Tokenizes `code` for the given language, or returns it as a single plain token when no pattern is defined (`"text"`, or a future language not yet worth a pattern). */
export function tokenizeCode(code: string, language: CodeLanguage): Token[] {
  const pattern = LANGUAGE_PATTERNS[language];
  if (!pattern) return [{ type: "plain", text: code }];

  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      tokens.push({ type: "plain", text: code.slice(lastIndex, index) });
    }

    const groups = match.groups ?? {};
    if (groups.comment) {
      tokens.push({ type: "comment", text: groups.comment });
    } else if (groups.string) {
      tokens.push({ type: "string", text: groups.string });
    } else if (groups.number) {
      tokens.push({ type: "number", text: groups.number });
    } else if (groups.keyword) {
      tokens.push({ type: "keyword", text: groups.keyword });
    } else if (groups.word) {
      tokens.push({
        type: JS_KEYWORDS.has(groups.word) ? "keyword" : "plain",
        text: groups.word,
      });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "plain", text: code.slice(lastIndex) });
  }

  return tokens;
}

/**
 * Regroups a flat token stream (which may include multi-line tokens,
 * e.g. a `/* ... *\/` comment) into one array of tokens per source line,
 * so a caller can render accurate per-line line numbers without
 * re-tokenizing line by line (which would lose cross-line comment
 * context).
 */
export function splitTokensIntoLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];

  for (const token of tokens) {
    const parts = token.text.split("\n");
    parts.forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part.length > 0) lines[lines.length - 1]?.push({ type: token.type, text: part });
    });
  }

  return lines;
}
