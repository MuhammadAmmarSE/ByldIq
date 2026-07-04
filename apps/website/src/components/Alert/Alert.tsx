import { AlertCircle, AlertTriangle, CheckCircle2, Info, type LucideIcon } from "lucide-react";
import { cva } from "class-variance-authority";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import { type AlertProps, type AlertVariant } from "./Alert.types";

const VARIANT_ICON: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

/** `alert` interrupts assistive tech immediately; `status` waits politely — reserved for variants that need urgent attention. */
const VARIANT_ROLE: Record<AlertVariant, "status" | "alert"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
};

const VARIANT_ICON_COLOR: Record<AlertVariant, string> = {
  info: "text-muted",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const alertStyles = cva("flex gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "border-border bg-surface-raised",
      success: "border-success/30 bg-success/10",
      warning: "border-warning/30 bg-warning/10",
      danger: "border-danger/30 bg-danger/10",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export function Alert({ variant = "info", title, children, className, ...props }: AlertProps) {
  return (
    <div
      role={VARIANT_ROLE[variant]}
      className={cn(alertStyles({ variant }), className)}
      {...props}
    >
      <Icon icon={VARIANT_ICON[variant]} className={cn("mt-0.5", VARIANT_ICON_COLOR[variant])} />
      <div className="space-y-1">
        <p className="text-foreground font-medium">{title}</p>
        {/* `text-muted` doesn't reliably hit 4.5:1 against every tinted variant
            background (e.g. the danger tint), so the body always uses full
            `text-foreground` instead. */}
        {children && <div className="text-foreground text-sm">{children}</div>}
      </div>
    </div>
  );
}
