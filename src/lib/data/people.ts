export type Person = {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  startDate: string; // ISO date
};

const p = (
  name: string,
  title: string,
  department: string,
  location: string,
  ext: string,
  startDate: string,
): Person => {
  const handle = name.toLowerCase().replace(/[^a-z ]/g, "").replace(/ /g, ".");
  return {
    id: handle,
    name,
    title,
    department,
    location,
    email: `${handle}@betterbag.xyz`,
    phone: `(503) 555-01${ext}`,
    startDate,
  };
};

export const people: Person[] = [
  p("Marguerite Oyelaran", "Chief Executive Officer", "Leadership", "Portland HQ", "01", "2017-03-06"),
  p("Tomas Lindqvist", "Chief Operating Officer", "Leadership", "Portland HQ", "02", "2018-01-15"),
  p("Dana Whitfield", "People Operations Manager", "People", "Portland HQ", "10", "2020-09-01"),
  p("Rafael Ibarra", "Benefits Specialist", "People", "Remote", "11", "2023-04-17"),
  p("Priya Raman", "Head of Design", "Design", "Portland HQ", "20", "2019-06-10"),
  p("Oskar Brandt", "Senior Soft Goods Designer", "Design", "Portland HQ", "21", "2021-02-22"),
  p("Lucia Ferreira", "Materials Researcher", "Design", "Lisbon Studio", "22", "2026-11-02"),
  p("Kenji Watanabe", "Director of Engineering", "Engineering", "Remote", "30", "2019-11-04"),
  p("Amara Nwosu", "Staff Software Engineer", "Engineering", "Remote", "31", "2022-08-08"),
  p("Sam Kowalczyk", "IT Systems Administrator", "IT", "Portland HQ", "40", "2021-10-11"),
  p("Noor Haddad", "Help Desk Technician", "IT", "Portland HQ", "41", "2026-10-19"),
  p("Beatrix Hollis", "VP of Marketing", "Marketing", "Portland HQ", "50", "2020-01-13"),
  p("Jonah Achterberg", "Content Lead", "Marketing", "Lisbon Studio", "51", "2024-05-06"),
  p("Imani Clarke", "Controller", "Finance", "Portland HQ", "60", "2018-07-23"),
  p("Wei Chen", "Supply Chain Manager", "Operations", "Reno Warehouse", "70", "2019-03-18"),
  p("Delia Marsh", "Warehouse Lead", "Operations", "Reno Warehouse", "71", "2022-01-31"),
  p("Arjun Mehta", "Customer Care Manager", "Customer Care", "Remote", "80", "2021-06-14"),
  p("Sofia Petrakis", "Customer Care Specialist", "Customer Care", "Remote", "81", "2026-11-09"),
];

export const departments = [...new Set(people.map((x) => x.department))].sort();
export const locations = [...new Set(people.map((x) => x.location))].sort();

export const newHires = [...people]
  .sort((a, b) => b.startDate.localeCompare(a.startDate))
  .slice(0, 3);

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
