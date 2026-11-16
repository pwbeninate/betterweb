import Link from "next/link";
import type { Route } from "next";

export function Card({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: { href: Route; label: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-line bg-surface p-5 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
            {title}
          </h2>
          {action && (
            <Link
              href={action.href}
              className="text-sm font-medium text-brand hover:underline"
            >
              {action.label}
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
      {children}
    </span>
  );
}
