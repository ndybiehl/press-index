export function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function kindLabel(kind: string) {
  if (kind === "game") return "Game";
  if (kind === "system") return "System";
  if (kind === "accessory") return "Accessory";
  return kind;
}

export function conditionLabel(value: string) {
  const map: Record<string, string> = {
    new: "Brand new",
    mint: "Mint",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "For parts",
  };
  return map[value] ?? value;
}

export function completenessLabel(value: string) {
  const map: Record<string, string> = {
    cib: "Complete in box",
    complete: "Game + manual",
    game: "Game only",
    box: "Box only",
    manual: "Manual only",
  };
  return map[value] ?? value;
}

export function archiveSearchUrl(title: string, platformName: string) {
  const q = `title:(${title}) AND (${platformName} OR manual) AND (collection:videogamemanuals OR mediatype:texts)`;
  return `https://archive.org/search?query=${encodeURIComponent(q)}`;
}

export function archiveEmbedUrl(identifier: string) {
  return `https://archive.org/embed/${encodeURIComponent(identifier)}`;
}

export function archiveDetailsUrl(identifier: string) {
  return `https://archive.org/details/${encodeURIComponent(identifier)}`;
}
