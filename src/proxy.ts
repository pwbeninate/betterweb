// Every route requires a signed-in BetterBag account. Unauthenticated
// requests are redirected to /signin by the `authorized` callback in auth.ts.
export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
