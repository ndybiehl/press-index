import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { ACCESSORIES } from "./data/accessories";
import { GAMES } from "./data/games";
import { PLATFORMS } from "./data/platforms";
import { SYSTEM_VARIANTS } from "./data/variants";
import { prisma } from "../src/lib/db";
import { originalMsrpCents } from "../src/lib/msrp";
import { PLATFORM_RANK } from "../src/lib/popularity";
import { itemSlug, sortTitle } from "../src/lib/slug";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function priceFor(kind: string, year: number | null, genre: string) {
  const age = year ? Math.max(0, 2026 - year) : 20;
  let base = 2499;
  if (kind === "system") base = 8000 + age * 80;
  if (kind === "accessory") base = 1800 + age * 40;
  if (kind === "game") {
    base = 1500 + Math.min(age, 40) * 55;
    if (/RPG|Adventure|Fighting/.test(genre)) base += 1200;
  }
  if (year && year <= 1985) base += 1800;
  return Math.round(base / 100) * 100;
}

const CONDITIONS = ["mint", "excellent", "good", "fair"] as const;
const COMPLETENESS = ["cib", "complete", "game", "cib"] as const;

async function main() {
  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.session.deleteMany();
  await prisma.catalogItem.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();

  const platformRows = await Promise.all(
    PLATFORMS.map((p) =>
      prisma.platform.create({
        data: {
          slug: p.slug,
          name: p.name,
          shortName: p.shortName,
          manufacturer: p.manufacturer,
          family: p.family,
          kind: p.kind,
          generation: p.generation,
          releasedYear: p.releasedYear,
          discontinuedYear: p.discontinuedYear,
          media: p.media,
          color: p.color,
          description: p.description,
          sortRank: PLATFORM_RANK[p.slug] ?? 200,
        },
      }),
    ),
  );
  const platformBySlug = new Map(platformRows.map((p) => [p.slug, p]));

  const usedSlugs = new Set<string>();
  function uniqueSlug(title: string, platform: string, variant = "") {
    let slug = itemSlug(title, platform, variant);
    let n = 2;
    while (usedSlugs.has(slug)) {
      slug = `${itemSlug(title, platform, variant)}-${n}`;
      n += 1;
    }
    usedSlugs.add(slug);
    return slug;
  }

  for (const p of PLATFORMS) {
    const row = platformBySlug.get(p.slug);
    if (!row) continue;
    await prisma.catalogItem.create({
      data: {
        slug: uniqueSlug(p.name, p.slug, "console"),
        kind: "system",
        title: p.name,
        sortTitle: sortTitle(p.name),
        platformId: row.id,
        releasedYear: p.releasedYear,
        publisher: p.manufacturer,
        developer: p.manufacturer,
        genre: p.kind === "handheld" ? "Handheld" : p.kind === "computer" ? "Computer" : "Home console",
        players: "1+",
        description: p.description,
        hasManual: true,
        msrpCents: originalMsrpCents({ kind: "system", platformSlug: p.slug, title: p.name }),
      },
    });
  }

  for (const v of SYSTEM_VARIANTS) {
    const row = platformBySlug.get(v.platform);
    if (!row) continue;
    await prisma.catalogItem.create({
      data: {
        slug: uniqueSlug(v.title, v.platform, v.variant),
        kind: "system",
        title: v.title,
        sortTitle: sortTitle(v.title),
        platformId: row.id,
        releasedYear: v.year,
        publisher: v.publisher,
        developer: v.publisher,
        genre: "Hardware variant",
        players: "1+",
        variant: v.variant,
        description: v.description,
        hasManual: true,
        msrpCents: originalMsrpCents({ kind: "system", platformSlug: v.platform, title: v.title }),
      },
    });
  }

  for (const g of GAMES) {
    const row = platformBySlug.get(g.platform);
    if (!row) {
      console.warn(`Unknown platform ${g.platform} for ${g.title}`);
      continue;
    }
    await prisma.catalogItem.create({
      data: {
        slug: uniqueSlug(g.title, g.platform),
        kind: "game",
        title: g.title,
        sortTitle: sortTitle(g.title),
        platformId: row.id,
        releasedYear: g.year,
        publisher: g.publisher,
        developer: g.developer,
        genre: g.genre,
        players: g.players,
        description: g.description,
        manualArchiveId: g.archiveId ?? "",
        hasManual: g.hasManual ?? true,
        msrpCents: originalMsrpCents({
          kind: "game",
          platformSlug: g.platform,
          title: g.title,
          genre: g.genre,
        }),
      },
    });
  }

  for (const a of ACCESSORIES) {
    const row = platformBySlug.get(a.platform);
    if (!row) {
      console.warn(`Unknown platform ${a.platform} for ${a.title}`);
      continue;
    }
    await prisma.catalogItem.create({
      data: {
        slug: uniqueSlug(a.title, a.platform, a.variant),
        kind: "accessory",
        title: a.title,
        sortTitle: sortTitle(a.title),
        platformId: row.id,
        releasedYear: a.year,
        publisher: a.publisher,
        developer: a.publisher,
        genre: a.genre,
        players: "1+",
        variant: a.variant ?? "",
        description: a.description,
        hasManual: true,
        msrpCents: originalMsrpCents({
          kind: "accessory",
          platformSlug: a.platform,
          title: a.title,
          genre: a.genre,
        }),
      },
    });
  }

  const passwordHash = hashPassword("pressindex");
  const [seller, buyer, vendor] = await Promise.all([
    prisma.user.create({
      data: {
        email: "seller@pressindex.local",
        name: "Arcade Annex",
        location: "Avon, CO",
        passwordHash,
        role: "SELLER",
      },
    }),
    prisma.user.create({
      data: {
        email: "buyer@pressindex.local",
        name: "Casey Collector",
        location: "Denver, CO",
        passwordHash,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        email: "vault@pressindex.local",
        name: "The Manual Vault",
        location: "San Diego, CA",
        passwordHash,
        role: "SELLER",
      },
    }),
  ]);

  const sellable = await prisma.catalogItem.findMany({
    orderBy: { title: "asc" },
  });
  const sellers = [seller, vendor];
  let listingCount = 0;
  for (let i = 0; i < sellable.length; i += 7) {
    const item = sellable[i];
    const who = sellers[i % sellers.length];
    const condition = CONDITIONS[i % CONDITIONS.length];
    const completeness = item.kind === "game" ? COMPLETENESS[i % COMPLETENESS.length] : "cib";
    const multiplier =
      completeness === "cib" ? 1.35 : completeness === "complete" ? 1.1 : 0.7;
    const priceCents = Math.max(499, Math.round((item.msrpCents || 1999) * multiplier));
    await prisma.listing.create({
      data: {
        itemId: item.id,
        sellerId: who.id,
        condition,
        completeness,
        priceCents,
        shippingCents: item.kind === "system" ? 1499 : 499,
        notes:
          completeness === "cib"
            ? "Boxed, manual included, photographed. Smoke-free shelf."
            : completeness === "complete"
              ? "Game and manual. Box is long gone."
              : "Loose copy. Tested, saves if the cart has a battery.",
        status: "active",
      },
    });
    listingCount += 1;
  }

  const counts = {
    platforms: await prisma.platform.count(),
    games: await prisma.catalogItem.count({ where: { kind: "game" } }),
    systems: await prisma.catalogItem.count({ where: { kind: "system" } }),
    accessories: await prisma.catalogItem.count({ where: { kind: "accessory" } }),
    listings: listingCount,
    users: 3,
  };
  console.log("Seeded Press Index", counts);
  console.log("Demo logins: seller@pressindex.local / buyer@pressindex.local / vault@pressindex.local");
  console.log("Password: pressindex");
  void buyer;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
