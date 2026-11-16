import type { Metadata } from "next";
import { Tag } from "@/components/card";
import { resourceGroups } from "@/lib/data/resources";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
      <p className="mt-1 text-muted">
        Policies, guides and forms, grouped by the team that owns them.
      </p>

      <nav aria-label="Resource sections" className="mt-5 flex flex-wrap gap-2">
        {resourceGroups.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-full border border-line bg-surface px-3 py-1 text-sm hover:border-brand"
          >
            {g.name}
          </a>
        ))}
      </nav>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {resourceGroups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            className="scroll-mt-32 rounded-2xl border border-line bg-surface p-5"
          >
            <h2 className="text-lg font-semibold">{g.name}</h2>
            <p className="text-xs text-muted">Owned by {g.owner}</p>
            <ul className="mt-3 divide-y divide-line">
              {g.items.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted">
                      Updated {formatDate(item.updated)}
                    </p>
                  </div>
                  <Tag>{item.kind}</Tag>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">
        Sample content: in this example the documents are listed but not linked
        to files.
      </p>
    </div>
  );
}
