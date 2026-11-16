export type NewsPost = {
  slug: string;
  title: string;
  category: "Company" | "Product" | "People" | "IT";
  date: string; // ISO date
  author: string;
  summary: string;
  body: string[];
  pinned?: boolean;
};

export const news: NewsPost[] = [
  {
    slug: "open-enrollment-2027",
    title: "Open enrollment for 2027 benefits closes November 30",
    category: "People",
    date: "2026-11-12",
    author: "Dana Whitfield",
    pinned: true,
    summary:
      "Review your medical, dental and vision elections before the end of the month. New this year: an expanded commuter benefit.",
    body: [
      "Open enrollment for the 2027 plan year is under way and closes at 5 p.m. Pacific on Monday, November 30. If you take no action, your current medical, dental and vision elections roll over, but flexible spending contributions do not.",
      "New for 2027, the commuter benefit now covers bike share memberships and e-bike maintenance in addition to transit passes. Premiums for the standard medical plan are unchanged.",
      "People Operations is hosting drop-in sessions on Tuesdays and Thursdays at 11 a.m. in the Canvas Room and on Teams. Bring your questions.",
    ],
  },
  {
    slug: "transit-pack-launch",
    title: "The Transit Pack 2 ships to customers on December 1",
    category: "Product",
    date: "2026-11-10",
    author: "Priya Raman",
    summary:
      "Two years of feedback went into the redesign: a lighter frame sheet, recycled sailcloth, and a laptop sleeve that finally fits 16-inch machines.",
    body: [
      "The Transit Pack 2 goes on sale December 1. The redesign started with more than 900 customer care tickets and repair requests, which told us exactly where the original wore out.",
      "The new pack is 180 grams lighter, uses recycled sailcloth across the main body, and moves the laptop sleeve off the floor of the bag. Employee pre-orders open this Friday through the staff store.",
      "Thank you to the Reno team for turning around three rounds of samples in six weeks.",
    ],
  },
  {
    slug: "reno-warehouse-expansion",
    title: "Reno warehouse expansion finishes ahead of the holiday peak",
    category: "Company",
    date: "2026-11-05",
    author: "Wei Chen",
    summary:
      "The new mezzanine adds 40% more pick locations, just in time for our busiest six weeks of the year.",
    body: [
      "Construction on the Reno mezzanine wrapped a week early. The added pick locations mean same-day shipping cutoffs move from noon to 2 p.m. Pacific starting November 20.",
      "If you are visiting Reno this quarter, note that the visitor entrance has moved to the north side of the building.",
    ],
  },
  {
    slug: "mfa-number-matching",
    title: "Number matching is now required for all Microsoft sign-ins",
    category: "IT",
    date: "2026-10-28",
    author: "Sam Kowalczyk",
    summary:
      "Approving a sign-in now means typing the two-digit number shown on screen into Authenticator. Here is what to expect.",
    body: [
      "To protect against accidental approvals, every Microsoft sign-in prompt, including the one for BetterWeb, now asks you to type a two-digit number into the Authenticator app.",
      "If you get a prompt you did not start, do not approve it. Report it to the IT help desk right away.",
    ],
  },
  {
    slug: "repair-program-milestone",
    title: "Our repair program just fixed its 25,000th bag",
    category: "Company",
    date: "2026-10-16",
    author: "Marguerite Oyelaran",
    summary:
      "A fifteen-year-old messenger bag from Minneapolis was the milestone repair. It went home with a new strap and a handwritten note.",
    body: [
      "When we started the repair program, the goal was simple: a BetterBag should outlast its warranty by decades. Last week the team in Reno completed repair number 25,000.",
      "Repairs keep bags out of landfill, and they are also the best product research we have. Thank you to everyone who makes it work.",
    ],
  },
];

export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));
