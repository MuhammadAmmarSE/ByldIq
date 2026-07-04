import type { ComponentPropsWithoutRef } from "react";

export interface BlueprintGridProps extends Omit<ComponentPropsWithoutRef<"svg">, "id"> {
  /**
   * Unique per rendered instance if more than one `BlueprintGrid` appears
   * on the same page — SVG `<pattern>` ids are global to the document, and
   * a collision would make every instance render whichever pattern mounted
   * first.
   */
  id?: string;
}
