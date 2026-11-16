# BetterWeb

Example company intranet for BetterBag. Next.js (App Router) + Tailwind CSS, with every page behind Microsoft Entra ID single sign-on via Auth.js. Built to be hosted on Vercel at `betterweb.betterbag.xyz`.

All content (news, directory, events, resources) is sample data in `src/lib/data/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no Entra variables set, the sign-in page offers **Continue as demo employee** so you can look around. That option only exists in development when Entra is not configured; it is never registered in a production build.

## How sign-in works

| File | Role |
| --- | --- |
| `src/auth.ts` | Auth.js config: Entra ID provider, tenant check, session callbacks, dev-only demo provider |
| `src/proxy.ts` | Runs before every route; redirects signed-out visitors to `/signin` |
| `src/app/api/auth/[...nextauth]/route.ts` | OAuth callback and session endpoints |
| `src/app/signin/page.tsx` | Sign-in page |

Access is limited to the BetterBag tenant twice over: the issuer URL is tenant-specific, and the `signIn` callback rejects any token whose `tid` claim is not that tenant. Sessions are encrypted JWT cookies that last 8 hours.

## Set up Microsoft Entra SSO

1. In the [Entra admin center](https://entra.microsoft.com), go to **Entra ID → App registrations → New registration**.
   - Name: `BetterWeb`
   - Supported account types: **Accounts in this organizational directory only** (single tenant)
   - Redirect URI (platform **Web**): `https://betterweb.betterbag.xyz/api/auth/callback/microsoft-entra-id`
2. Under **Authentication**, add a second Web redirect URI for local development: `http://localhost:3000/api/auth/callback/microsoft-entra-id`
3. Under **Certificates & secrets**, create a client secret and copy its **Value**.
4. From **Overview**, copy the **Application (client) ID** and **Directory (tenant) ID**.
5. Optional: under **Enterprise applications → BetterWeb → Properties**, set **Assignment required** to *Yes* and assign a group to limit who can sign in.

Then fill in the variables from `.env.example`:

| Variable | Value |
| --- | --- |
| `AUTH_SECRET` | Output of `npx auth secret` |
| `AUTH_MICROSOFT_ENTRA_ID_ID` | Application (client) ID |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Client secret value |
| `AUTH_MICROSOFT_ENTRA_ID_ISSUER` | `https://login.microsoftonline.com/<tenant-id>/v2.0` |

The app requests the `openid profile email User.Read` scopes, which need no admin consent in a default tenant.

## Deploy to Vercel

1. Push this repository to GitHub and import it at https://vercel.com/new (framework preset: Next.js, no build settings to change).
2. In **Project → Settings → Environment Variables**, add the four variables above for **Production**.
3. In **Project → Settings → Domains**, add `betterweb.betterbag.xyz`.
4. At the DNS host for `betterbag.xyz`, create the `CNAME` record for `betterweb` with the target Vercel shows on the Domains page. Vercel issues the TLS certificate once the record resolves.
5. Redeploy, then visit https://betterweb.betterbag.xyz and sign in.

Notes:

- Preview deployments get a different hostname per deploy, and Entra requires exact redirect URIs, so SSO works on the production domain and on localhost only. Preview deployments stay protected (nobody can sign in) unless you add their URLs to the app registration.
- When the client secret expires, create a new one in Entra and update `AUTH_MICROSOFT_ENTRA_ID_SECRET` in Vercel.
- To run a production build outside Vercel (`npm run build && npm start`), also set `AUTH_TRUST_HOST=true`.
