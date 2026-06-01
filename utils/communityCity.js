const CITY_ALIASES = {
  delhi: ["Delhi", "New Delhi"],
  gurgaon: ["Gurgaon", "Gurugram"],
  gurugram: ["Gurugram", "Gurgaon"],
};

export const prettyCityFromSlug = (slug = "") =>
  String(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

export const getCityCandidatesFromSlug = (slug = "") => {
  const normalizedSlug = String(slug || "").trim().toLowerCase();
  const aliases = CITY_ALIASES[normalizedSlug] || [];
  const pretty = prettyCityFromSlug(normalizedSlug);

  const candidates = [...aliases, pretty].map((city) => String(city || "").trim()).filter(Boolean);

  return Array.from(new Set(candidates));
};

export const mergeUniqueProperties = (groups = []) => {
  const items = groups.flat().filter(Boolean);
  const seen = new Set();

  return items.filter((item) => {
    const key = item?._id || item?.id || JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
