"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/cn";

import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./Tabs.types";

export function Tabs(props: TabsProps) {
  return <TabsPrimitive.Root {...props} />;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn("border-border inline-flex items-center gap-1 border-b", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "text-muted data-[state=active]:text-foreground data-[state=active]:border-accent -mb-px border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content className={cn("pt-4", className)} {...props} />;
}
