import { prisma } from "@/lib/db";

export async function catalogStats() {
  const [platforms, games, systems, accessories, listings] = await Promise.all([
    prisma.platform.count(),
    prisma.catalogItem.count({ where: { kind: "game" } }),
    prisma.catalogItem.count({ where: { kind: "system" } }),
    prisma.catalogItem.count({ where: { kind: "accessory" } }),
    prisma.listing.count({ where: { status: "active" } }),
  ]);
  return { platforms, games, systems, accessories, listings };
}

export async function searchItems(opts: {
  q?: string;
  kind?: string;
  platform?: string;
  decade?: string;
  take?: number;
  skip?: number;
}) {
  const take = opts.take ?? 48;
  const skip = opts.skip ?? 0;
  const where: Record<string, unknown> = {};
  if (opts.kind && opts.kind !== "all") where.kind = opts.kind;
  if (opts.platform) where.platform = { slug: opts.platform };
  if (opts.decade) {
    const start = Number(opts.decade);
    where.releasedYear = { gte: start, lte: start + 9 };
  }
  if (opts.q) {
    const q = opts.q.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { publisher: { contains: q, mode: "insensitive" } },
      { developer: { contains: q, mode: "insensitive" } },
      { genre: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.catalogItem.findMany({
      where,
      include: {
        platform: true,
        listings: { where: { status: "active" }, orderBy: { priceCents: "asc" } },
      },
      orderBy: [{ sortTitle: "asc" }],
      take,
      skip,
    }),
    prisma.catalogItem.count({ where }),
  ]);
  return { items, total };
}
