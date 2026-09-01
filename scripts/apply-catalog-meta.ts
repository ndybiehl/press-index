import "dotenv/config";
import { prisma } from "../src/lib/db";
import { originalMsrpCents } from "../src/lib/msrp";
import { PLATFORM_RANK } from "../src/lib/popularity";

async function main() {
  const platforms = await prisma.platform.findMany();
  for (const platform of platforms) {
    const sortRank = PLATFORM_RANK[platform.slug] ?? 200;
    if (platform.sortRank !== sortRank) {
      await prisma.platform.update({ where: { id: platform.id }, data: { sortRank } });
    }
  }

  const items = await prisma.catalogItem.findMany({ include: { platform: true } });
  let updated = 0;
  for (const item of items) {
    const msrpCents = originalMsrpCents({
      kind: item.kind,
      platformSlug: item.platform.slug,
      title: item.title,
      genre: item.genre,
    });
    if (item.msrpCents !== msrpCents) {
      await prisma.catalogItem.update({ where: { id: item.id }, data: { msrpCents } });
      updated += 1;
    }
  }
  console.log("platforms", platforms.length, "msrp updated", updated);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
