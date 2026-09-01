export type ArchiveHit = {
  identifier: string;
  title: string;
};

function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !["the", "and", "for", "game"].includes(word));
}

function looksLikeManual(hit: ArchiveHit, title: string, platformName: string) {
  const hay = `${hit.identifier} ${hit.title}`.toLowerCase();
  if (/backup|podcast|press start|dlc|mayhem|macintosh/.test(hay)) return false;
  const words = tokens(title);
  const matched = words.filter((word) => hay.includes(word)).length;
  if (matched < Math.min(2, words.length)) return false;
  const platformBit = tokens(platformName)[0];
  const hasManualWord = /manual|instruction|booklet|spielanleitung|instrucciones|scan/.test(hay);
  const hasPlatform = platformBit ? hay.includes(platformBit) : true;
  return hasManualWord || hasPlatform;
}

export async function searchArchiveManuals(
  title: string,
  platformName: string,
): Promise<ArchiveHit[]> {
  const q = `"${title}" AND (manual OR booklet OR instructions OR spielanleitung)`;
  const request =
    "https://archive.org/advancedsearch.php?" +
    `q=${encodeURIComponent(q)}&fl[]=identifier&fl[]=title&output=json&rows=12`;
  const res = await fetch(request, {
    headers: { "user-agent": "PressIndex/1.0 (catalog; r@ndybiehl.com)" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    response?: { docs?: { identifier?: string; title?: string }[] };
  };
  const docs = data.response?.docs ?? [];
  return docs
    .map((doc) => ({
      identifier: doc.identifier ?? "",
      title: Array.isArray(doc.title) ? doc.title[0] : doc.title ?? "",
    }))
    .filter((hit) => hit.identifier && looksLikeManual(hit, title, platformName));
}

export async function findArchiveManual(title: string, platformName: string) {
  const hits = await searchArchiveManuals(title, platformName);
  const english = hits.find((hit) =>
    /usa|us|english|en\b|snes|nes|nintendo/i.test(`${hit.identifier} ${hit.title}`),
  );
  return english ?? hits[0] ?? null;
}

export function archiveSearchUrl(title: string, platformName: string) {
  const q = `"${title}" (${platformName}) (manual OR booklet OR instructions)`;
  return `https://archive.org/search?query=${encodeURIComponent(q)}`;
}

export function archiveEmbedUrl(identifier: string) {
  return `https://archive.org/embed/${encodeURIComponent(identifier)}`;
}

export function archiveDetailsUrl(identifier: string) {
  return `https://archive.org/details/${encodeURIComponent(identifier)}`;
}
