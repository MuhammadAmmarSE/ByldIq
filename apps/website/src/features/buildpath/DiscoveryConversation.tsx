"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { DiscoveryConversationProps } from "./DiscoveryConversation.types";
import type { DiscoveryAnswers } from "./types";

const REPLY_DELAY_MS = 500;

/**
 * CLAUDE.md Milestone 14 §7's "simulated AI conversation with dynamic
 * follow-ups" — a chat, not a giant questionnaire. Each reply is written
 * into the matching `DiscoveryAnswers` field (via `nextDiscoveryField`), so
 * the transcript below and the structured answers stay in sync — a
 * visitor editing a field directly further down doesn't fight with what
 * they typed here.
 */
export function DiscoveryConversation({ className }: DiscoveryConversationProps) {
  const conversation = useBuildPathStore((state) => state.conversation);
  const addConversationMessage = useBuildPathStore((state) => state.addConversationMessage);
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);
  const answers = useBuildPathAnswers();

  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const seededRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed Byld's opening question once, on first mount with an empty transcript.
  useEffect(() => {
    if (seededRef.current || conversation.length > 0) return;
    seededRef.current = true;
    addConversationMessage({
      id: crypto.randomUUID(),
      role: "byld",
      content: mockAIProvider.generateFollowUpQuestion(answers),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.length]);

  useEffect(() => {
    const node = scrollRef.current;
    // jsdom (unit tests) doesn't implement scrollTo — guard rather than crash.
    if (node && typeof node.scrollTo === "function") {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [conversation, isThinking]);

  function handleSend() {
    const message = draft.trim();
    if (!message) return;
    setDraft("");

    const field: keyof DiscoveryAnswers | null = mockAIProvider.nextDiscoveryField(answers);
    addConversationMessage({ id: crypto.randomUUID(), role: "user", content: message });

    const updatedDiscovery = field ? { ...answers.discovery, [field]: message } : answers.discovery;
    if (field) updateDiscovery({ [field]: message });

    const nextAnswers = { ...answers, discovery: updatedDiscovery };
    setIsThinking(true);
    window.setTimeout(() => {
      addConversationMessage({
        id: crypto.randomUUID(),
        role: "byld",
        content: mockAIProvider.generateFollowUpQuestion(nextAnswers),
      });
      setIsThinking(false);
    }, REPLY_DELAY_MS);
  }

  return (
    <div className={cn("border-border bg-surface-raised rounded-lg border", className)}>
      <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto p-4">
        {conversation.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "bg-accent text-accent-foreground ml-auto max-w-[85%] rounded-lg px-3 py-2 text-sm"
                : "bg-surface text-foreground mr-auto max-w-[85%] rounded-lg px-3 py-2 text-sm"
            }
          >
            {message.content}
          </div>
        ))}
        {isThinking && (
          <div className="text-muted flex items-center gap-2 text-sm">
            <Spinner size="xs" />
            Byld is thinking…
          </div>
        )}
      </div>
      <div className="border-border flex items-center gap-2 border-t p-3">
        <Input
          aria-label="Reply to Byld"
          placeholder="Type your answer..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
        />
        <Button size="icon" aria-label="Send reply" onClick={handleSend}>
          <Icon icon={Send} size="sm" />
        </Button>
      </div>
    </div>
  );
}
