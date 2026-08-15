import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { AiCompanionStoreProvider } from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { GREETINGS, RESPONSES } from "./engine/responses";
import { useAiCompanion } from "./useAiCompanion";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AiCompanionStoreProvider>{children}</AiCompanionStoreProvider>
    </StoreProvider>
  );
}

describe("useAiCompanion", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    mockTrack.mockClear();
  });

  it("shows the default greeting on open when no journey is selected", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });

    act(() => result.current.open());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]?.content).toBe(GREETINGS.default.content);
    expect(mockTrack).toHaveBeenCalledWith("ai_companion_opened", { journey: null });
  });

  it("greets with the page context when one is set, taking priority over the journey", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });

    act(() =>
      result.current.setPageContext({ label: "Startup Product Engineering", slug: "startup" }),
    );
    act(() => result.current.open());

    expect(result.current.messages[0]?.content).toContain("Startup Product Engineering");
  });

  it("greets with a section-based greeting when currentSection is set but no pageContext is", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });

    act(() => result.current.setCurrentSection("technology-ecosystem"));
    act(() => result.current.open());

    expect(result.current.messages[0]?.content).toContain("our technology choices");
  });

  it("prioritizes pageContext over currentSection when both are set", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });

    act(() => result.current.setCurrentSection("technology-ecosystem"));
    act(() =>
      result.current.setPageContext({ label: "Startup Product Engineering", slug: "startup" }),
    );
    act(() => result.current.open());

    expect(result.current.messages[0]?.content).toContain("Startup Product Engineering");
  });

  it("references the most recently viewed page in a contextual fallback reply", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });
    act(() => result.current.open());
    act(() => result.current.setPageContext({ label: "Next.js", slug: "next-js" }));

    act(() => result.current.sendMessage("this doesn't match any canned intent"));
    act(() => vi.advanceTimersByTime(1000));

    expect(result.current.messages.at(-1)?.content).toContain("Next.js");
  });

  it("does not re-greet on a second open once a conversation exists", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });

    act(() => result.current.open());
    act(() => result.current.close());
    act(() => result.current.open());

    expect(result.current.messages).toHaveLength(1);
  });

  it("sends a message, shows thinking, then responds after the delay", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });
    act(() => result.current.open());

    act(() => result.current.sendMessage("What's an MVP scope?"));

    expect(result.current.isThinking).toBe(true);
    expect(result.current.messages.at(-1)?.content).toBe("What's an MVP scope?");

    act(() => vi.advanceTimersByTime(1000));

    expect(result.current.isThinking).toBe(false);
    expect(result.current.messages.at(-1)?.content).toBe(RESPONSES.startup.content);
  });

  it("clears the conversation", () => {
    const { result } = renderHook(() => useAiCompanion(), { wrapper });
    act(() => result.current.open());
    expect(result.current.messages.length).toBeGreaterThan(0);

    act(() => result.current.clearConversation());

    expect(result.current.messages).toHaveLength(0);
    expect(mockTrack).toHaveBeenCalledWith("ai_conversation_cleared", {});
  });
});
