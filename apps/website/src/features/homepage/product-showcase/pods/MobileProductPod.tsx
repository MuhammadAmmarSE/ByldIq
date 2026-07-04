"use client";

import { useState } from "react";
import { Home, Search, User, type LucideIcon } from "lucide-react";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

export interface MobileProductPodProps {
  onInteraction?: (action: string) => void;
}

interface MobileTab {
  id: string;
  label: string;
  icon: LucideIcon;
  content: string;
}

const TABS: MobileTab[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    content: "Your recent activity appears here, synced in real time.",
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    content: "Search across every project, technician, and job site.",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    content: "Manage your certifications and availability.",
  },
];

/** A phone-frame mockup with a real, tappable bottom nav (CLAUDE.md Part 14: "Mobile Experience"). */
export function MobileProductPod({ onInteraction }: MobileProductPodProps) {
  const [activeTabId, setActiveTabId] = useState("home");
  const activeTab = TABS.find((tab) => tab.id === activeTabId) ?? TABS[0];

  return (
    <div className="flex justify-center py-4">
      <div className="border-border bg-surface flex h-[480px] w-64 flex-col overflow-hidden rounded-[2rem] border-8 shadow-lg">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
          {activeTab && (
            <>
              <Icon icon={activeTab.icon} size="xl" className="text-accent" />
              <Text variant="caption">{activeTab.content}</Text>
            </>
          )}
        </div>

        <nav aria-label="Mobile preview navigation" className="border-border flex border-t">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTabId(tab.id);
                onInteraction?.("switch_tab");
              }}
              aria-current={activeTabId === tab.id ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
                activeTabId === tab.id ? "text-accent" : "text-muted",
              )}
            >
              <Icon icon={tab.icon} size="sm" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
