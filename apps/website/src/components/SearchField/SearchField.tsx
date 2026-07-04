import { forwardRef } from "react";
import { Search, X } from "lucide-react";

import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { SearchFieldProps } from "./SearchField.types";

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { className, onClear, value, ...props },
  ref,
) {
  const showClear = Boolean(onClear && value);

  return (
    <div className="relative flex items-center">
      <Icon icon={Search} size="sm" className="text-muted pointer-events-none absolute left-3" />
      <input
        ref={ref}
        type="search"
        value={value}
        className={cn(
          "border-border bg-surface text-foreground placeholder:text-muted h-10 w-full rounded-md border py-2 pr-3 pl-9 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden",
          showClear && "pr-9",
          className,
        )}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="text-muted hover:text-foreground absolute right-2 inline-flex size-6 items-center justify-center rounded-sm"
        >
          <Icon icon={X} size="sm" />
        </button>
      )}
    </div>
  );
});
