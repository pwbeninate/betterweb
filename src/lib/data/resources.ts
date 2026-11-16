export type Resource = { title: string; kind: "Policy" | "Guide" | "Form" | "Link"; updated: string };
export type ResourceGroup = { id: string; name: string; owner: string; items: Resource[] };

export const resourceGroups: ResourceGroup[] = [
  {
    id: "company",
    name: "Company",
    owner: "Leadership",
    items: [
      { title: "Employee handbook", kind: "Guide", updated: "2026-09-01" },
      { title: "Code of conduct", kind: "Policy", updated: "2026-01-15" },
      { title: "2026 holiday calendar", kind: "Guide", updated: "2025-12-10" },
      { title: "Staff store and employee pricing", kind: "Link", updated: "2026-11-10" },
    ],
  },
  {
    id: "people",
    name: "People Operations",
    owner: "People",
    items: [
      { title: "Time off and leave policy", kind: "Policy", updated: "2026-06-20" },
      { title: "Time off request", kind: "Form", updated: "2026-03-02" },
      { title: "2027 benefits guide", kind: "Guide", updated: "2026-11-02" },
      { title: "Remote and hybrid work policy", kind: "Policy", updated: "2026-02-11" },
    ],
  },
  {
    id: "it",
    name: "IT",
    owner: "IT",
    items: [
      { title: "Open a help desk ticket", kind: "Form", updated: "2026-08-14" },
      { title: "Acceptable use policy", kind: "Policy", updated: "2026-04-30" },
      { title: "Setting up a new Mac", kind: "Guide", updated: "2026-10-05" },
      { title: "Microsoft Authenticator and number matching", kind: "Guide", updated: "2026-10-28" },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    owner: "Finance",
    items: [
      { title: "Travel and expense policy", kind: "Policy", updated: "2026-05-18" },
      { title: "Expense report", kind: "Form", updated: "2026-05-18" },
      { title: "Purchase request", kind: "Form", updated: "2026-07-07" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing and Brand",
    owner: "Marketing",
    items: [
      { title: "Brand guidelines", kind: "Guide", updated: "2026-08-25" },
      { title: "Logo and color kit", kind: "Link", updated: "2026-08-25" },
      { title: "Presentation template", kind: "Link", updated: "2026-09-12" },
    ],
  },
];
