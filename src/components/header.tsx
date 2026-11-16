import Link from "next/link";
import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { Avatar } from "./avatar";
import { NavLinks } from "./nav-links";
import { Wordmark } from "./wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="BetterWeb home">
          <Wordmark />
        </Link>

        <div className="order-3 w-full md:order-none md:w-auto">
          <NavLinks />
        </div>

        <form
          action="/directory"
          role="search"
          className="ml-auto hidden sm:block"
        >
          <input
            type="search"
            name="q"
            aria-label="Search people"
            placeholder="Search people…"
            className="w-48 rounded-lg border border-line bg-canvas px-3 py-1.5 text-sm outline-none placeholder:text-muted focus:border-brand lg:w-64"
          />
        </form>

        <Suspense
          fallback={
            <span className="ml-auto size-8 rounded-full bg-brand-soft sm:ml-0" />
          }
        >
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}

async function UserMenu() {
  const session = await auth();
  const name = session?.user?.name ?? "Employee";

  return (
    <details className="relative ml-auto sm:ml-0">
      <summary
        aria-label={`Account menu for ${name}`}
        className="flex cursor-pointer list-none items-center gap-2 rounded-full [&::-webkit-details-marker]:hidden"
      >
        <Avatar name={name} size="sm" />
        <span className="hidden text-sm font-medium lg:inline">{name}</span>
      </summary>
      <div className="absolute right-0 mt-2 w-60 rounded-xl border border-line bg-surface p-2 shadow-lg">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted">{session?.user?.email}</p>
        </div>
        <Link
          href="/profile"
          className="block rounded-md px-3 py-2 text-sm hover:bg-brand-soft"
        >
          My profile
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/signin" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-brand-soft"
          >
            Sign out
          </button>
        </form>
      </div>
    </details>
  );
}
