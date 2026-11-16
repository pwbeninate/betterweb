export type QuickLink = { label: string; description: string; href: string };

export const quickLinks: QuickLink[] = [
  { label: "Time off", description: "Request PTO and view balances", href: "/resources#people" },
  { label: "IT help desk", description: "Open a ticket or reset a password", href: "/resources#it" },
  { label: "Expenses", description: "Submit receipts and mileage", href: "/resources#finance" },
  { label: "Benefits", description: "Plans, enrollment and contacts", href: "/resources#people" },
  { label: "Brand kit", description: "Logos, colors and templates", href: "/resources#marketing" },
  { label: "Staff store", description: "Employee pricing and pre-orders", href: "/resources#company" },
];

export type CalendarEvent = {
  date: string; // ISO date
  title: string;
  detail: string;
};

export const events: CalendarEvent[] = [
  { date: "2026-11-17", title: "Benefits drop-in session", detail: "11:00 AM · Canvas Room and Teams" },
  { date: "2026-11-19", title: "All-hands: holiday readiness", detail: "9:30 AM · Main floor and Teams" },
  { date: "2026-11-20", title: "Transit Pack 2 staff pre-order opens", detail: "Staff store" },
  { date: "2026-11-26", title: "Thanksgiving: offices closed", detail: "Thursday and Friday" },
  { date: "2026-11-30", title: "Open enrollment deadline", detail: "5:00 PM Pacific" },
  { date: "2026-12-11", title: "Winter party", detail: "6:00 PM · Portland HQ" },
];

export const spotlight = {
  name: "Transit Pack 2",
  tagline: "Bag of the month",
  description:
    "22 liters, recycled sailcloth, and a suspended sleeve for 16-inch laptops. On sale December 1.",
  facts: ["180 g lighter", "Lifetime repairs", "3 colorways"],
};
