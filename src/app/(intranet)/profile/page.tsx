import type { Metadata } from "next";
import { Suspense } from "react";
import { auth, demoMode } from "@/auth";
import { Avatar } from "@/components/avatar";
import { people } from "@/lib/data/people";

export const metadata: Metadata = { title: "My profile" };

export default function ProfilePage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-muted">Loading your profile…</p>}
    >
      <Profile />
    </Suspense>
  );
}

async function Profile() {
  const session = await auth();
  const user = session?.user;
  const name = user?.name ?? "Employee";
  const record = people.find((p) => p.email === user?.email?.toLowerCase());

  const rows: [string, string | undefined][] = [
    ["Email", user?.email ?? undefined],
    ["Title", record?.title],
    ["Department", record?.department],
    ["Location", record?.location],
    ["Entra object ID", user?.id],
    [
      "Session expires",
      session?.expires && new Date(session.expires).toUTCString(),
    ],
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">My profile</h1>
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center gap-4">
          <Avatar name={name} size="lg" />
          <div>
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-sm text-muted">
              {demoMode
                ? "Signed in with the local demo account"
                : "Signed in with Microsoft Entra ID"}
            </p>
          </div>
        </div>
        <dl className="mt-6 divide-y divide-line text-sm">
          {rows
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="truncate text-right">{v}</dd>
              </div>
            ))}
        </dl>
      </div>
      <p className="mt-4 text-xs text-muted">
        Name, email and ID come from your sign-in. To correct them, contact the
        IT help desk.
      </p>
    </div>
  );
}
