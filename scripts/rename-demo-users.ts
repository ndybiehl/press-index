import "dotenv/config";
import { hashPassword } from "../src/lib/auth";
import { prisma } from "../src/lib/db";

const MAP: [string, string][] = [
  ["seller@pressindex.local", "seller@boxedandloose.local"],
  ["buyer@pressindex.local", "buyer@boxedandloose.local"],
  ["vault@pressindex.local", "vault@boxedandloose.local"],
];

async function main() {
  const passwordHash = hashPassword("boxedandloose");
  for (const [from, to] of MAP) {
    const existing = await prisma.user.findUnique({ where: { email: from } });
    if (!existing) {
      console.log("skip missing", from);
      continue;
    }
    await prisma.user.update({
      where: { id: existing.id },
      data: { email: to, passwordHash },
    });
    console.log("renamed", from, "->", to);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
