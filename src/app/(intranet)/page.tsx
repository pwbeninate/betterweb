import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { Avatar } from "@/components/avatar";
import { Card, Tag } from "@/components/card";
import { events, quickLinks, spotlight } from "@/lib/data/home";
import { sortedNews } from "@/lib/data/news";
import { newHires } from "@/lib/data/people";
import { dateParts, formatDate } from "@/lib/format";

async function FirstName() {
  const session = await auth();
  return <>, {session?.user?.name?.split(" ")[0] ?? "there"}</>;
}

export default function HomePage() {
  const pinned = sortedNews.find((n) => n.pinned);
  const latest = sortedNews.filter((n) => n !== pinned).slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
          <Suspense>
            <FirstName />
          </Suspense>
        </h1>
        <p className="mt-1 text-muted">
          Here&apos;s what&apos;s happening at BetterBag.
        </p>
      </div>

      {pinned && (
        <Link
          href={`/news/${pinned.slug}`}
          className="block rounded-2xl bg-brand p-5 text-on-brand transition hover:opacity-95"
        >
          <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
            Pinned announcement
          </p>
          <p className="mt-1 text-lg font-semibold">{pinned.title}</p>
          <p className="mt-1 text-sm opacity-90">{pinned.summary}</p>
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Quick links">
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block h-full rounded-xl border border-line p-3 transition hover:border-brand hover:bg-brand-soft"
                  >
                    <span className="block text-sm font-medium">{l.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {l.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Latest news"
            action={{ href: "/news", label: "All news" }}
          >
            <ul className="divide-y divide-line">
              {latest.map((n) => (
                <li key={n.slug} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Tag>{n.category}</Tag>
                    <time dateTime={n.date}>{formatDate(n.date)}</time>
                  </div>
                  <Link
                    href={`/news/${n.slug}`}
                    className="mt-1.5 block font-medium hover:text-brand"
                  >
                    {n.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{n.summary}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Coming up">
            <ul className="space-y-4">
              {events.map((e) => {
                const { month, day } = dateParts(e.date);
                return (
                  <li key={e.title} className="flex gap-3">
                    <div className="w-11 shrink-0 rounded-lg bg-brand-soft py-1 text-center text-brand">
                      <div className="text-[10px] font-semibold uppercase">
                        {month}
                      </div>
                      <div className="text-base leading-tight font-semibold">
                        {day}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted">{e.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card
            title="New faces"
            action={{ href: "/directory", label: "Directory" }}
          >
            <ul className="space-y-3">
              {newHires.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <Avatar name={p.name} />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted">
                      {p.title} · {p.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">
              {spotlight.tagline}
            </p>
            <p className="mt-1 text-lg font-semibold">{spotlight.name}</p>
            <p className="mt-1 text-sm text-muted">{spotlight.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {spotlight.facts.map((f) => (
                <li key={f}>
                  <Tag>{f}</Tag>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
