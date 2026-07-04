import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { PaginationProps } from "./Pagination.types";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

/** Always shows first/last page plus a window of siblings around the current page, collapsing the rest into ellipses. */
function getPageItems(page: number, pageCount: number): PageItem[] {
  const siblingCount = 1;
  const totalVisible = siblingCount * 2 + 5;

  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  const items: PageItem[] = [1];
  if (showLeftEllipsis) items.push("ellipsis-start");
  for (let i = Math.max(leftSibling, 2); i <= Math.min(rightSibling, pageCount - 1); i++) {
    items.push(i);
  }
  if (showRightEllipsis) items.push("ellipsis-end");
  items.push(pageCount);
  return items;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const items = getPageItems(page, pageCount);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Icon icon={ChevronLeft} />
      </Button>
      {items.map((item, index) =>
        typeof item === "number" ? (
          <Button
            key={item}
            variant={item === page ? "secondary" : "ghost"}
            size="icon"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ) : (
          <span
            key={`${item}-${index}`}
            aria-hidden="true"
            className="text-muted flex size-10 items-center justify-center"
          >
            <Icon icon={MoreHorizontal} size="sm" />
          </span>
        ),
      )}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <Icon icon={ChevronRight} />
      </Button>
    </nav>
  );
}
