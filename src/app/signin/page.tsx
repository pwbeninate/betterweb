import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth, demoMode, entraConfigured, signIn } from "@/auth";
import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = { title: "Sign in" };

const errors: Record<string, string> = {
  AccessDenied:
    "That account isn't part of the BetterBag organization. Sign in with your BetterBag work account.",
  Configuration:
    "Sign-in isn't configured correctly. Contact the IT help desk.",
};

export default function SignInPage({ searchParams }: PageProps<"/signin">) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <Wordmark />
        <h1 className="mt-8 text-xl font-semibold">Sign in to BetterWeb</h1>
        <p className="mt-2 text-sm text-muted">
          The BetterBag intranet is for employees. Use your BetterBag work
          account.
        </p>
        <Suspense>
          <SignInOptions searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function SignInOptions({
  searchParams,
}: Pick<PageProps<"/signin">, "searchParams">) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "/";
  const error = typeof params.error === "string" ? params.error : undefined;

  if (await auth()) redirect("/");

  return (
    <>
      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm"
        >
          {errors[error] ?? "Sign-in failed. Please try again."}
        </p>
      )}

      <form
        className="mt-6"
        action={async () => {
          "use server";
          await signIn("microsoft-entra-id", { redirectTo: callbackUrl });
        }}
      >
        <button
          type="submit"
          disabled={!entraConfigured}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-on-brand transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MicrosoftLogo />
          Sign in with Microsoft
        </button>
      </form>

      {demoMode && (
        <form
          className="mt-3"
          action={async () => {
            "use server";
            await signIn("demo", { redirectTo: callbackUrl });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-brand-soft"
          >
            Continue as demo employee
          </button>
          <p className="mt-3 text-xs text-muted">
            Local demo mode: Microsoft Entra isn&apos;t configured yet (see
            README). This option doesn&apos;t exist in production.
          </p>
        </form>
      )}

      {!entraConfigured && !demoMode && (
        <p className="mt-3 text-xs text-muted">
          Microsoft Entra sign-in hasn&apos;t been configured for this
          deployment.
        </p>
      )}
    </>
  );
}

function MicrosoftLogo() {
  return (
    <svg aria-hidden viewBox="0 0 21 21" className="size-4">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}
