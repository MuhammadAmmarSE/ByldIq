"use client";

import { useCallback, useState } from "react";

import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAiCompanionStore } from "@/providers/AiCompanionStoreProvider";
import { useAppStore } from "@/providers/StoreProvider";

import "./analytics";

import { matchIntent } from "./engine/intents";
import { GREETINGS, RESPONSES } from "./engine/responses";

const REPLY_DELAY_MS = 700;

/**
 * Orchestrates the AI Companion's store (Phase 0) and the rule-based
 * response engine. "Streaming" is simulated as a short thinking delay
 * (`REPLY_DELAY_MS`), not real token streaming — there's no LLM backend.
 */
export function useAiCompanion() {
  const isOpen = useAiCompanionStore((state) => state.isOpen);
  const messages = useAiCompanionStore((state) => state.messages);
  const open = useAiCompanionStore((state) => state.open);
  const close = useAiCompanionStore((state) => state.close);
  const toggle = useAiCompanionStore((state) => state.toggle);
  const addMessage = useAiCompanionStore((state) => state.addMessage);
  const clearConversation = useAiCompanionStore((state) => state.clearConversation);
  const journey = useAppStore((state) => state.journey);
  const analytics = useAnalytics();
  const [isThinking, setIsThinking] = useState(false);

  const ensureGreeting = useCallback(() => {
    if (messages.length > 0) return;
    const greeting = journey ? GREETINGS[journey] : GREETINGS.default;
    addMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: greeting.content,
      quickReplies: greeting.quickReplies,
    });
  }, [messages.length, journey, addMessage]);

  const handleOpen = useCallback(() => {
    open();
    analytics.track("ai_companion_opened", { journey });
    ensureGreeting();
  }, [open, analytics, journey, ensureGreeting]);

  const handleClose = useCallback(() => {
    close();
    analytics.track("ai_companion_closed", {});
  }, [close, analytics]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      toggle();
      analytics.track("ai_companion_opened", { journey });
      ensureGreeting();
    }
  }, [isOpen, handleClose, toggle, analytics, journey, ensureGreeting]);

  const sendMessage = useCallback(
    (text: string, { viaQuickReply = false }: { viaQuickReply?: boolean } = {}) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      addMessage({ id: crypto.randomUUID(), role: "user", content: trimmed });
      analytics.track("ai_message_sent", { journey, viaQuickReply });
      setIsThinking(true);

      const intent = matchIntent(trimmed);
      const response = RESPONSES[intent];

      setTimeout(() => {
        addMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.content,
          quickReplies: response.quickReplies,
        });
        setIsThinking(false);
      }, REPLY_DELAY_MS);
    },
    [addMessage, analytics, journey],
  );

  const handleClearConversation = useCallback(() => {
    clearConversation();
    analytics.track("ai_conversation_cleared", {});
  }, [clearConversation, analytics]);

  return {
    isOpen,
    messages,
    isThinking,
    open: handleOpen,
    close: handleClose,
    toggle: handleToggle,
    sendMessage,
    clearConversation: handleClearConversation,
  };
}
