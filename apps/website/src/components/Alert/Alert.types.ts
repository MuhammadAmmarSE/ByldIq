import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const ALERT_VARIANTS = ["info", "success", "warning", "danger"] as const;

export type AlertVariant = (typeof ALERT_VARIANTS)[number];

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  variant?: AlertVariant;
  title: ReactNode;
  children?: ReactNode;
}
