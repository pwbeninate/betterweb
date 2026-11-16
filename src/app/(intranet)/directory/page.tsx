import type { Metadata } from "next";
import { Suspense } from "react";
import { DirectoryBrowser } from "@/components/directory-browser";
import { departments, locations, people } from "@/lib/data/people";

export const metadata: Metadata = { title: "Directory" };

const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));

async function Results({
  searchParams,
}: Pick<PageProps<"/directory">, "searchParams">) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";
  return (
    <DirectoryBrowser
      key={initialQuery}
      people={sorted}
      departments={departments}
      locations={locations}
      initialQuery={initialQuery}
    />
  );
}

export default function DirectoryPage({
  searchParams,
}: PageProps<"/directory">) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Directory</h1>
      <p className="mt-1 text-muted">
        Find a colleague by name, team or location.
      </p>
      <Suspense
        fallback={<p className="mt-6 text-sm text-muted">Loading directory…</p>}
      >
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
