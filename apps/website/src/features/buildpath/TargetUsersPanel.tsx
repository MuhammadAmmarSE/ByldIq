"use client";

import { Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useBuildPathStore } from "@/providers/BuildPathStoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { USER_GROUP_TYPES, type UserGroupType } from "./types";
import type { TargetUsersPanelProps } from "./TargetUsersPanel.types";

const TYPE_LABELS: Record<UserGroupType, string> = {
  primary: "Primary user",
  secondary: "Secondary user",
  admin: "Admin",
  operator: "Operator",
  internal: "Internal team",
  customer: "Customer",
};

const TYPE_OPTIONS = USER_GROUP_TYPES.map((type) => ({ value: type, label: TYPE_LABELS[type] }));

const EMPTY_DRAFT = {
  type: "primary" as UserGroupType,
  role: "",
  needs: "",
  painPoints: "",
  goals: "",
};

/** CLAUDE.md Milestone 14 §9's Target User capture — who this product is actually for, beyond "everyone." */
export function TargetUsersPanel({ className }: TargetUsersPanelProps) {
  const targetUserGroups = useBuildPathStore((state) => state.targetUserGroups);
  const addTargetUserGroup = useBuildPathStore((state) => state.addTargetUserGroup);
  const removeTargetUserGroup = useBuildPathStore((state) => state.removeTargetUserGroup);
  const analytics = useAnalytics();

  const [draft, setDraft] = useState(EMPTY_DRAFT);

  function handleAdd() {
    if (!draft.role.trim()) return;
    addTargetUserGroup({ id: crypto.randomUUID(), ...draft });
    analytics.track("buildpath_target_user_added", { type: draft.type });
    setDraft(EMPTY_DRAFT);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Text variant="caption" className="text-muted font-medium">
        Who is this for?
      </Text>

      {targetUserGroups.length === 0 && (
        <Text variant="body" className="text-muted">
          No user groups yet — add the people (or roles) who&apos;ll actually use this.
        </Text>
      )}

      <div className="space-y-3">
        {targetUserGroups.map((group) => (
          <Card key={group.id} className="space-y-2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{TYPE_LABELS[group.type]}</Badge>
                  <Text variant="body" className="font-medium">
                    {group.role}
                  </Text>
                </div>
                {group.needs && <Text variant="caption">Needs: {group.needs}</Text>}
                {group.painPoints && <Text variant="caption">Pain points: {group.painPoints}</Text>}
                {group.goals && <Text variant="caption">Goals: {group.goals}</Text>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${group.role}`}
                onClick={() => removeTargetUserGroup(group.id)}
              >
                <Icon icon={Trash2} size="sm" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="space-y-3 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="target-user-type">Type</Label>
            <Select
              id="target-user-type"
              options={TYPE_OPTIONS}
              value={draft.type}
              onValueChange={(value) =>
                setDraft((current) => ({ ...current, type: value as UserGroupType }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="target-user-role">Role or description</Label>
            <Input
              id="target-user-role"
              value={draft.role}
              placeholder="e.g. Front-desk staff at a clinic"
              onChange={(event) =>
                setDraft((current) => ({ ...current, role: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="target-user-needs">What they need</Label>
            <Input
              id="target-user-needs"
              value={draft.needs}
              onChange={(event) =>
                setDraft((current) => ({ ...current, needs: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="target-user-pain">Pain points</Label>
            <Input
              id="target-user-pain"
              value={draft.painPoints}
              onChange={(event) =>
                setDraft((current) => ({ ...current, painPoints: event.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="target-user-goals">Goals</Label>
            <Input
              id="target-user-goals"
              value={draft.goals}
              onChange={(event) =>
                setDraft((current) => ({ ...current, goals: event.target.value }))
              }
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconLeft={UserPlus}
          disabled={!draft.role.trim()}
          onClick={handleAdd}
        >
          Add user group
        </Button>
      </Card>
    </div>
  );
}
