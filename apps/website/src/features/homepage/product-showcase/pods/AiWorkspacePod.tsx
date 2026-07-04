"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";

export interface AiWorkspacePodProps {
  onInteraction?: (action: string) => void;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi — I'm Northwind AI's support assistant. Ask me anything about your account.",
  },
  { id: "2", role: "user", content: "Why was my last invoice higher than usual?" },
  {
    id: "3",
    role: "assistant",
    content:
      "Your usage crossed the 10,000 API call tier on March 3rd. Here's the breakdown from your billing page.",
  },
];

const CANNED_REPLY =
  "Based on your workspace's knowledge base, here's what I found — let me know if you'd like more detail.";

/** Northwind AI's support workspace — a real, working chat over mock data (CLAUDE.md Part 14). */
export function AiWorkspacePod({ onInteraction }: AiWorkspacePodProps) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ]);
    setDraft("");
    setIsThinking(true);
    onInteraction?.("message_sent");

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: CANNED_REPLY },
      ]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <Card className="flex h-[420px] flex-col">
      <Card.Header>
        <p className="text-foreground font-medium">Northwind AI — Support Workspace</p>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "bg-accent text-accent-foreground ml-auto max-w-[80%] rounded-lg px-3 py-2 text-sm"
                : "bg-surface-raised text-foreground mr-auto max-w-[80%] rounded-lg px-3 py-2 text-sm"
            }
          >
            {message.content}
          </div>
        ))}
        {isThinking && (
          <div className="text-muted flex items-center gap-2 text-sm">
            <Spinner size="xs" />
            Thinking…
          </div>
        )}
      </Card.Content>
      <Card.Footer>
        <Input
          aria-label="Ask the assistant"
          placeholder="Ask a question..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSend();
          }}
        />
        <Button size="icon" aria-label="Send message" onClick={handleSend}>
          <Icon icon={Send} size="sm" />
        </Button>
      </Card.Footer>
    </Card>
  );
}
