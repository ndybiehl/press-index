import "dotenv/config";
import { prisma } from "../src/lib/db";
import {
  LIBRETRO_SYSTEMS,
  libretroCandidates,
  libretroUrl,
} from "../src/lib/libretro";

const UA =
  "PressIndex/1.0 (video game catalog enrichment; r@ndybiehl.com)";
const force = process.argv.includes("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.slice("--limit=".length)) : undefined;

type WikiHit = {
  title: string;
  extract: string;
  image?: string;
  extraImage?: string;
  url: string;
};

function cleanImageUrl(url: string) {
  try {
    const parsed = new URL(url.startsWith("//") ? `https:${url}` : url);
    parsed.search = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function looksLikePersonPhoto(name: string) {
  return /cropped|GDC|portrait|Recording|cafe|interview|photo_of/i.test(name);
}

function looksLikeBox(name: string) {
  return /box|cover|cart|case|artwork|packaging/i.test(name);
}

async function wikiJson(url: string) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "application/json" },
    });
    if (res.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 4000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json() as Promise<Record<string, unknown>>;
  }
  throw new Error(`429 ${url}`);
}

async function searchWiki(query: string) {
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      srlimit: "6",
      format: "json",
      utf8: "1",
    });
  const data = (await wikiJson(url)) as {
    query?: { search?: { title: string }[] };
  };
  return data.query?.search?.map((row) => row.title) ?? [];
}

async function wikiSummaryImage(title: string) {
  try {
    const data = (await wikiJson(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`,
    )) as { originalimage?: { source?: string }; thumbnail?: { source?: string } };
    const src = data.originalimage?.source || data.thumbnail?.source;
    return src ? cleanImageUrl(src) : undefined;
  } catch {
    return undefined;
  }
}

async function wikiPage(title: string): Promise<WikiHit | null> {
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      redirects: "1",
      prop: "extracts|pageimages|info",
      exintro: "1",
      explaintext: "1",
      pithumbsize: "1200",
      piprop: "thumbnail|original|name",
      inprop: "url",
      format: "json",
      utf8: "1",
      titles: title,
    });
  const data = (await wikiJson(url)) as {
    query?: {
      pages?: Record<
        string,
        {
          missing?: boolean
          title?: string
          extract?: string
          thumbnail?: { source?: string }
          original?: { source?: string }
          pageimage?: string
          fullurl?: string
        }
      >;
    };
  };
  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page || page.missing || !page.extract) return null;
  if (/may refer to:/i.test(page.extract) || /disambiguation/i.test(page.title ?? "")) {
    return null;
  }
  let image = page.original?.source || page.thumbnail?.source;
  if (!image) image = await wikiSummaryImage(page.title ?? title);
  return {
    title: page.title ?? title,
    extract: page.extract.replace(/\n+/g, " ").trim(),
    image: image ? cleanImageUrl(image) : undefined,
    url: page.fullurl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
  };
}

async function wikiMediaExtra(title: string, currentFront?: string) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  try {
    const data = (await wikiJson(url)) as {
      items?: { title?: string; srcset?: { src?: string }[] }[];
    };
    const images = (data.items ?? [])
      .map((item) => {
        const src = item.srcset?.[item.srcset.length - 1]?.src;
        return {
          name: item.title ?? "",
          src: src ? cleanImageUrl(src.startsWith("//") ? `https:${src}` : src) : "",
        };
      })
      .filter((row) => row.src && !looksLikePersonPhoto(row.name));
    const back = images.find((row) => /back/i.test(row.name) && row.src !== currentFront);
    if (back) return back.src;
    const extra = images.find(
      (row) => looksLikeBox(row.name) && row.src !== currentFront,
    );
    return extra?.src;
  } catch {
    return undefined;
  }
}

async function headOk(url: string) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: { "user-agent": UA },
      redirect: "follow",
      signal: AbortSignal.timeout(1200),
    });
    const type = res.headers.get("content-type") ?? "";
    return res.ok && type.startsWith("image/");
  } catch {
    return false;
  }
}

async function firstExisting(urls: string[]) {
  for (const url of urls) {
    if (await headOk(url)) return url;
  }
  return undefined;
}

async function libretroArt(platformSlug: string, title: string) {
  const folder = LIBRETRO_SYSTEMS[platformSlug];
  if (!folder) return { front: undefined as string | undefined, snap: undefined as string | undefined };
  const files = libretroCandidates(title).slice(0, 3);
  const fronts = files.map((file) => libretroUrl(folder, "Named_Boxarts", file));
  const front = await firstExisting(fronts);
  const snap = front
    ? undefined
    : await firstExisting(files.map((file) => libretroUrl(folder, "Named_Snaps", file)));
  return { front, snap };
}

function wikiQueries(item: {
  kind: string;
  title: string;
  platformName: string;
  platformShort: string;
}) {
  const queries: string[] = [];
  if (item.kind === "game") {
    const plain = item.title.replace(/[°!']/g, "");
    queries.push(`"${item.title}" ${item.platformShort} video game`);
    queries.push(`"${item.title}" (${item.platformName})`);
    queries.push(`"${item.title}" video game`);
    if (plain !== item.title) queries.push(`${plain} video game`);
    queries.push(item.title);
  } else if (item.kind === "system") {
    queries.push(item.title);
    queries.push(item.platformName);
  } else {
    queries.push(`"${item.title}" ${item.platformName}`);
    queries.push(item.title);
  }
  return queries;
}

const STOP = new Set([
  "the",
  "and",
  "for",
  "game",
  "games",
  "video",
  "controller",
  "system",
  "official",
  "nintendo",
  "sega",
  "sony",
  "atari",
  "microsoft",
  "pack",
  "module",
]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2);
}

function distinctiveTokens(title: string) {
  const words = tokens(title).filter((word) => !STOP.has(word));
  return words.length ? words : tokens(title);
}

function titleCloseEnough(pageTitle: string, itemTitle: string) {
  const page = pageTitle.toLowerCase();
  if (/^list of |disambiguation|game controller|^joystick$|^gamepad$/.test(page)) {
    return false;
  }
  const words = distinctiveTokens(itemTitle);
  if (!words.length) return page.includes(itemTitle.toLowerCase());
  const overlap = words.filter((word) => page.includes(word));
  return overlap.length >= Math.min(2, words.length) || (words.length === 1 && overlap.length === 1);
}

async function enrichOne(item: {
  id: string;
  title: string;
  kind: string;
  description: string;
  coverFrontUrl: string;
  coverBackUrl: string;
  sourceUrl: string;
  platformSlug: string;
  platformName: string;
  platformShort: string;
}) {
  if (!force && item.coverFrontUrl && item.description.length > 180) return "skip";

  let wiki: WikiHit | null = null;
  for (const query of wikiQueries(item)) {
    const titles = await searchWiki(query);
    for (const title of titles) {
      if (title.startsWith("List of ")) continue;
      if (!titleCloseEnough(title, item.title) && item.kind === "game") continue;
      wiki = await wikiPage(title);
      if (
        wiki &&
        item.kind === "game" &&
        !/video game|platform game|role-playing|shooter|arcade|console|cartridge|developed and published|developed by/i.test(
          wiki.extract,
        )
      ) {
        wiki = null;
        continue;
      }
      if (wiki) break;
    }
    if (wiki) break;
  }

  const retro = item.kind === "game" ? await libretroArt(item.platformSlug, item.title) : { front: undefined, snap: undefined };
  const extra = wiki ? await wikiMediaExtra(wiki.title, wiki.image) : undefined;

  const coverFrontUrl = retro.front || wiki?.image || item.coverFrontUrl;
  const coverBackUrl = extra || retro.snap || item.coverBackUrl;
  const description =
    wiki && wiki.extract.length > Math.max(item.description.length, 80)
      ? wiki.extract
      : item.description;
  const sourceUrl = wiki?.url || item.sourceUrl;

  if (
    coverFrontUrl === item.coverFrontUrl &&
    coverBackUrl === item.coverBackUrl &&
    description === item.description
  ) {
    return "unchanged";
  }

  await prisma.catalogItem.update({
    where: { id: item.id },
    data: { coverFrontUrl, coverBackUrl, description, sourceUrl },
  });
  return coverFrontUrl ? "cover" : "text";
}

async function main() {
  const items = await prisma.catalogItem.findMany({
    include: { platform: true },
    orderBy: [{ kind: "asc" }, { sortTitle: "asc" }],
    take: Number.isFinite(limit) ? limit : undefined,
  });
  const rank: Record<string, number> = { game: 0, system: 1, accessory: 2 };
  items.sort((a, b) => (rank[a.kind] ?? 9) - (rank[b.kind] ?? 9) || a.sortTitle.localeCompare(b.sortTitle));
  let cover = 0;
  let text = 0;
  let skip = 0;
  let fail = 0;
  for (const [index, item] of items.entries()) {
    try {
      const result = await enrichOne({
        id: item.id,
        title: item.title,
        kind: item.kind,
        description: item.description,
        coverFrontUrl: item.coverFrontUrl,
        coverBackUrl: item.coverBackUrl,
        sourceUrl: item.sourceUrl,
        platformSlug: item.platform.slug,
        platformName: item.platform.name,
        platformShort: item.platform.shortName,
      });
      if (result === "cover") cover += 1;
      else if (result === "text") text += 1;
      else skip += 1;
    } catch (error) {
      fail += 1;
      console.warn(`fail ${item.title}:`, error instanceof Error ? error.message : error);
    }
    if (index === 0 || (index + 1) % 15 === 0) {
      process.stderr.write(
        `${index + 1}/${items.length} last=${item.title} cover=${cover} text=${text} skip=${skip} fail=${fail}\n`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  console.log("done", { total: items.length, cover, text, skip, fail });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
