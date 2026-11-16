const opts = { timeZone: "UTC" } as const;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    ...opts,
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const dateParts = (iso: string) => {
  const d = new Date(iso);
  return {
    month: d.toLocaleDateString("en-US", { ...opts, month: "short" }),
    day: d.toLocaleDateString("en-US", { ...opts, day: "numeric" }),
  };
};
