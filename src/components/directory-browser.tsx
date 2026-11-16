"use client";

import { useMemo, useState } from "react";
import type { Person } from "@/lib/data/people";
import { Avatar } from "./avatar";

const selectClass =
  "rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-brand";

export function DirectoryBrowser({
  people,
  departments,
  locations,
  initialQuery,
}: {
  people: Person[];
  departments: string[];
  locations: string[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter(
      (p) =>
        (!department || p.department === department) &&
        (!location || p.location === location) &&
        (!q ||
          [p.name, p.title, p.department, p.location, p.email].some((v) =>
            v.toLowerCase().includes(q),
          )),
    );
  }, [people, query, department, location]);

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search by name, title or team"
          placeholder="Search by name, title or team…"
          className={`${selectClass} flex-1 placeholder:text-muted`}
        />
        <select
          aria-label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className={selectClass}
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          aria-label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={selectClass}
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {results.length} {results.length === 1 ? "person" : "people"}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
          No one matches that search. Try a different name or clear the filters.
        </p>
      ) : (
        <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar name={p.name} />
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="truncate text-sm text-muted">{p.title}</p>
                </div>
              </div>
              <dl className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Team</dt>
                  <dd>{p.department}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Location</dt>
                  <dd>{p.location}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Phone</dt>
                  <dd>{p.phone}</dd>
                </div>
              </dl>
              <a
                href={`mailto:${p.email}`}
                className="mt-3 block truncate text-sm font-medium text-brand hover:underline"
              >
                {p.email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
