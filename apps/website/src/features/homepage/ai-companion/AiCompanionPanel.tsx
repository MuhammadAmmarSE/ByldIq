"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";

import { useAiCompanion } from "./useAiCompanion";

/**
 * The Byld AI Companion's conversation panel (CLAUDE.md Part 16). Built on
 * the design system's `Drawer` for both desktop and mobile — a simpler,
 * honest reuse rather than a bespoke corner-docked panel plus a separate
 * bottom-sheet component.
 */
export function AiCompanionPanel() {
  const { isOpen, messages, isThinking, close, sendMessage, clearConversation } = useAiCompanion();
  const [draft, setDraft] = useState("");

  function handleSend() {
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft("");
  }

  const lastMessage = messages.at(-1);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
      title="Byld"
      description="A product consultant, not a sales bot — ask about your product, technology trade-offs, or your roadmap."
      footer={
        <div className="flex w-full items-center gap-2">
          <Input
            aria-label="Message Byld"
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
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={
                message.role === "user"
                  ? "bg-accent text-accent-foreground ml-auto max-w-[85%] rounded-lg px-3 py-2 text-sm"
                  : "bg-surface-raised text-foreground mr-auto max-w-[85%] rounded-lg px-3 py-2 text-sm"
              }
            >
              {message.content}
            </div>
            {message.id === lastMessage?.id &&
              message.role === "assistant" &&
              message.quickReplies && (
                <div className="flex flex-wrap gap-2">
                  {message.quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => sendMessage(reply, { viaQuickReply: true })}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              )}
          </div>
        ))}

        {isThinking && (
          <div className="text-muted flex items-center gap-2 text-sm">
            <Spinner size="xs" />
            Byld is thinking…
          </div>
        )}

        {messages.length > 0 && (
          <Button variant="ghost" size="sm" className="mt-2 self-start" onClick={clearConversation}>
            Clear conversation
          </Button>
        )}
      </div>
    </Drawer>
  );
}
