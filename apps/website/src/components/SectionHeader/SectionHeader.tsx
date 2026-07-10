import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { SectionHeaderProps } from "./SectionHeader.types";

/**
 * The eyebrow + heading + supporting-copy pattern repeated (with slightly
 * different markup each time) across roughly eighteen landing/section
 * headers before this component existed — extracted as a reusable
 * primitive per Milestone 8's design system audit, rather than left as
 * ad hoc JSX in every feature. Existing pages that already work aren't
 * retrofitted onto this component; it's here for pages built from now on.
 */
export function SectionHeader({
  eyebrow,
  heading,
  headingVariant = "h2",
  headingAs,
  description,
  actions,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && !actions && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl space-y-3", align === "center" && "mx-auto")}>
        {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
        <Heading variant={headingVariant} as={headingAs}>
          {heading}
        </Heading>
        {description && <Text variant="subtitle">{description}</Text>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
