export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function itemSlug(title: string, platform: string, variant = "") {
  const base = [title, platform, variant].filter(Boolean).join("-");
  return slugify(base);
}

export function sortTitle(title: string) {
  return title.replace(/^(the|a|an)\s+/i, "").toLowerCase();
}
