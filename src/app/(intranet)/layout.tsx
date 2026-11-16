import { Header } from "@/components/header";

export default function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-line py-6 text-center text-xs text-muted">
        BetterWeb · Internal use only · Need help? Contact the IT help desk
      </footer>
    </>
  );
}
