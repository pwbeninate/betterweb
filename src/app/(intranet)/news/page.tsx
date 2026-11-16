import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/card";
import { sortedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">News</h1>
      <p className="mt-1 text-muted">
        Announcements and stories from across BetterBag.
      </p>
      <ul className="mt-6 space-y-4">
        {sortedNews.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/news/${n.slug}`}
              className="block rounded-2xl border border-line bg-surface p-5 transition hover:border-brand"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <Tag>{n.category}</Tag>
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <span>· {n.author}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{n.title}</h2>
              <p className="mt-1 text-sm text-muted">{n.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
