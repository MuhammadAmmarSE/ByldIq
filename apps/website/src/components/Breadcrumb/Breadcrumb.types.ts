export interface BreadcrumbItem {
  label: string;
  /** Omit on the last item — it renders as the current page, not a link. */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}
