import Link from "next/link";

import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

import type { FooterProps } from "./Footer.types";

export function Footer({ columns = [], socialLinks = [], newsletter, className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-border bg-surface border-t", className)}>
      <Container className="flex flex-col gap-10 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="text-foreground text-lg font-semibold">
              Byld IQ
            </Link>
            <p className="text-muted mt-2 text-sm">
              Engineering intelligent products that create measurable business value.
            </p>
          </div>

          {columns.length > 0 && (
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
              {columns.map((column) => (
                <div key={column.heading}>
                  <p className="text-foreground text-sm font-medium">{column.heading}</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-muted hover:text-foreground text-sm">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {newsletter}

        <div className="border-border flex flex-col-reverse items-center gap-4 border-t pt-6 sm:flex-row sm:justify-between">
          <p className="text-muted text-sm">© {year} Byld IQ. All rights reserved.</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="text-muted hover:text-foreground"
                >
                  <Icon icon={link.icon} size="sm" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
