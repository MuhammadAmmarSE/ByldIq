import { describe, expect, it } from "vitest";

import { splitTokensIntoLines, tokenizeCode } from "./tokenize";

function textOf(tokens: { text: string }[]): string {
  return tokens.map((token) => token.text).join("");
}

describe("tokenizeCode", () => {
  it("returns the code as a single plain token for 'text'", () => {
    const code = "just some text";
    expect(tokenizeCode(code, "text")).toEqual([{ type: "plain", text: code }]);
  });

  it("reassembles to the exact original code for every supported language", () => {
    const samples: Record<string, string> = {
      typescript: `const x = 1; // comment\nfunction f() { return "hi"; }`,
      tsx: `export const A = () => <div className="a">{1}</div>;`,
      json: `{"a": 1, "b": true, "c": null}`,
      bash: `# a comment\necho "hello world"`,
    };

    for (const [language, code] of Object.entries(samples)) {
      const tokens = tokenizeCode(code, language as never);
      expect(textOf(tokens)).toBe(code);
    }
  });

  it("classifies a TypeScript comment, string, keyword, and number", () => {
    const tokens = tokenizeCode('const n = 42; // note\nconst s = "hi";', "typescript");
    expect(tokens.some((t) => t.type === "keyword" && t.text === "const")).toBe(true);
    expect(tokens.some((t) => t.type === "number" && t.text === "42")).toBe(true);
    expect(tokens.some((t) => t.type === "comment" && t.text === "// note")).toBe(true);
    expect(tokens.some((t) => t.type === "string" && t.text === '"hi"')).toBe(true);
  });

  it("does not classify a non-keyword identifier as a keyword", () => {
    const tokens = tokenizeCode("myVariable", "typescript");
    expect(tokens).toEqual([{ type: "plain", text: "myVariable" }]);
  });

  it("classifies a bash comment and string", () => {
    const tokens = tokenizeCode('# say hi\necho "hi"', "bash");
    expect(tokens.some((t) => t.type === "comment" && t.text === "# say hi")).toBe(true);
    expect(tokens.some((t) => t.type === "string" && t.text === '"hi"')).toBe(true);
  });

  it("classifies JSON strings, numbers, and literal keywords", () => {
    const tokens = tokenizeCode('{"ok": true, "n": 1}', "json");
    expect(tokens.some((t) => t.type === "string" && t.text === '"ok"')).toBe(true);
    expect(tokens.some((t) => t.type === "keyword" && t.text === "true")).toBe(true);
    expect(tokens.some((t) => t.type === "number" && t.text === "1")).toBe(true);
  });
});

describe("splitTokensIntoLines", () => {
  it("splits a single-line token stream into one line", () => {
    const lines = splitTokensIntoLines(tokenizeCode("const a = 1;", "typescript"));
    expect(lines).toHaveLength(1);
  });

  it("produces one array per source line", () => {
    const lines = splitTokensIntoLines(tokenizeCode("const a = 1;\nconst b = 2;\n", "typescript"));
    expect(lines).toHaveLength(3);
    expect(lines[2]).toEqual([]);
  });

  it("splits a multi-line comment token across the lines it spans", () => {
    const lines = splitTokensIntoLines(
      tokenizeCode("/* line one\nline two */\nconst a = 1;", "typescript"),
    );
    expect(lines).toHaveLength(3);
    expect(lines[0]?.[0]).toEqual({ type: "comment", text: "/* line one" });
    expect(lines[1]?.[0]).toEqual({ type: "comment", text: "line two */" });
    expect(lines[2]?.some((token) => token.type === "keyword" && token.text === "const")).toBe(
      true,
    );
  });

  it("every line rejoins to the exact original source line", () => {
    const code = "const a = 1; // comment\nfunction f() {\n  return a;\n}";
    const lines = splitTokensIntoLines(tokenizeCode(code, "typescript"));
    const rejoined = lines.map((line) => line.map((token) => token.text).join("")).join("\n");
    expect(rejoined).toBe(code);
  });
});
