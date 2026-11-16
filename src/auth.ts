import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const ENTRA = "microsoft-entra-id";
const DEMO = "demo";

const issuer = process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER;

/** True once the Entra app registration's values are present in the environment. */
export const entraConfigured = Boolean(
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
    process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
    issuer,
);

/**
 * Local-only fallback so the site can be run before the Entra app registration
 * exists. Never available in a production build.
 */
export const demoMode =
  process.env.NODE_ENV !== "production" && !entraConfigured;

/** The BetterBag tenant ID, taken from the issuer URL. */
const tenantId = issuer?.match(/microsoftonline\.com\/([^/]+)\/v2\.0/)?.[1];

const providers: Provider[] = [
  // Client ID, secret and issuer are read from AUTH_MICROSOFT_ENTRA_ID_*.
  MicrosoftEntraID({}),
];

if (demoMode) {
  providers.push(
    Credentials({
      id: DEMO,
      name: "Demo employee",
      credentials: {},
      authorize: () => ({
        id: "demo-employee",
        name: "Dana Whitfield",
        email: "dana.whitfield@betterbag.xyz",
      }),
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret:
    process.env.AUTH_SECRET ??
    (demoMode ? "betterweb-local-demo-secret-not-for-production" : undefined),
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/signin", error: "/signin" },
  callbacks: {
    // Used by src/proxy.ts: every matched route requires a session.
    authorized: ({ auth }) => Boolean(auth?.user),

    signIn({ account, profile }) {
      if (account?.provider === DEMO) return demoMode;
      if (account?.provider !== ENTRA) return false;
      // Defense in depth on top of the single-tenant issuer: only accept
      // tokens issued for the BetterBag tenant.
      return Boolean(tenantId) && profile?.tid === tenantId;
    },

    jwt({ token, account, profile }) {
      if (account) {
        token.oid =
          account.provider === ENTRA && typeof profile?.oid === "string"
            ? profile.oid
            : token.sub;
        // Keep the session cookie small: no inline profile photo.
        delete token.picture;
      }
      return token;
    },

    session({ session, token }) {
      if (typeof token.oid === "string") session.user.id = token.oid;
      return session;
    },
  },
});
