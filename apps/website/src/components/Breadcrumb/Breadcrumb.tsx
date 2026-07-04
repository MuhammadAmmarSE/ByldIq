import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { BreadcrumbProps } from "./Breadcrumb.types";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <Icon icon={ChevronRight} size="xs" className="text-muted" />}
              <li className="flex items-center">
                {isLast || !item.href ? (
                  <span
                    className={cn(isLast ? "text-foreground font-medium" : "text-muted")}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-muted hover:text-foreground">
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
