import "dotenv/config";
import path from "node:path";
import Database from "better-sqlite3";
import { prisma } from "../src/lib/db";

const sqlitePath = path.join(process.cwd(), "prisma/dev.db");

function rows(db: Database.Database, table: string) {
  return db.prepare(`SELECT * FROM "${table}"`).all() as Record<string, unknown>[];
}

function toDate(value: unknown) {
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    return new Date(value > 1e12 ? value : value * 1000);
  }
  if (typeof value === "string") return new Date(value);
  return new Date();
}

async function main() {
  const sqlite = new Database(sqlitePath, { readonly: true });
  const platforms = rows(sqlite, "Platform");
  const users = rows(sqlite, "User");
  const items = rows(sqlite, "CatalogItem");
  const listings = rows(sqlite, "Listing");
  const sessions = rows(sqlite, "Session");
  const orders = rows(sqlite, "Order");
  sqlite.close();

  console.log("sqlite counts", {
    platforms: platforms.length,
    users: users.length,
    items: items.length,
    listings: listings.length,
  });

  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.session.deleteMany();
  await prisma.catalogItem.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platform.deleteMany();

  await prisma.platform.createMany({
    data: platforms.map((row) => ({
      id: String(row.id),
      slug: String(row.slug),
      name: String(row.name),
      shortName: String(row.shortName),
      manufacturer: String(row.manufacturer),
      family: String(row.family),
      kind: String(row.kind),
      generation: (row.generation as number | null) ?? null,
      releasedYear: Number(row.releasedYear),
      discontinuedYear: (row.discontinuedYear as number | null) ?? null,
      media: String(row.media),
      color: String(row.color),
      description: String(row.description),
      sortRank: Number(row.sortRank ?? 200),
    })),
  });

  await prisma.user.createMany({
    data: users.map((row) => ({
      id: String(row.id),
      email: String(row.email),
      name: String(row.name),
      passwordHash: String(row.passwordHash),
      location: String(row.location ?? ""),
      stripeAccountId: String(row.stripeAccountId ?? ""),
      role: String(row.role ?? "USER"),
      createdAt: toDate(row.createdAt),
    })),
  });

  await prisma.catalogItem.createMany({
    data: items.map((row) => ({
      id: String(row.id),
      slug: String(row.slug),
      kind: String(row.kind),
      title: String(row.title),
      sortTitle: String(row.sortTitle),
      platformId: String(row.platformId),
      releasedYear: (row.releasedYear as number | null) ?? null,
      publisher: String(row.publisher ?? ""),
      developer: String(row.developer ?? ""),
      genre: String(row.genre ?? ""),
      players: String(row.players ?? ""),
      region: String(row.region ?? "NTSC-U"),
      description: String(row.description ?? ""),
      productCode: String(row.productCode ?? ""),
      variant: String(row.variant ?? ""),
      coverFrontUrl: String(row.coverFrontUrl ?? ""),
      coverBackUrl: String(row.coverBackUrl ?? ""),
      sourceUrl: String(row.sourceUrl ?? ""),
      manualArchiveId: String(row.manualArchiveId ?? ""),
      hasManual: Boolean(row.hasManual),
      msrpCents: Number(row.msrpCents ?? 0),
      createdAt: toDate(row.createdAt),
    })),
  });

  await prisma.listing.createMany({
    data: listings.map((row) => ({
      id: String(row.id),
      itemId: String(row.itemId),
      sellerId: String(row.sellerId),
      condition: String(row.condition),
      completeness: String(row.completeness),
      priceCents: Number(row.priceCents),
      shippingCents: Number(row.shippingCents ?? 499),
      notes: String(row.notes ?? ""),
      status: String(row.status ?? "active"),
      createdAt: toDate(row.createdAt),
    })),
  });

  if (sessions.length) {
    await prisma.session.createMany({
      data: sessions.map((row) => ({
        id: String(row.id),
        userId: String(row.userId),
        expiresAt: toDate(row.expiresAt),
      })),
    });
  }

  if (orders.length) {
    await prisma.order.createMany({
      data: orders.map((row) => ({
        id: String(row.id),
        listingId: String(row.listingId),
        buyerId: String(row.buyerId),
        stripeSessionId: String(row.stripeSessionId ?? ""),
        amountCents: Number(row.amountCents),
        status: String(row.status ?? "pending"),
        createdAt: toDate(row.createdAt),
      })),
    });
  }

  console.log("postgres counts", {
    platforms: await prisma.platform.count(),
    items: await prisma.catalogItem.count(),
    listings: await prisma.listing.count(),
    users: await prisma.user.count(),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
