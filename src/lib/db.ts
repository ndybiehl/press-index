import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  if (connectionString.startsWith("file:")) {
    throw new Error(
      "This app uses Postgres on Vercel. Set DATABASE_URL to a postgres:// connection string.",
    );
  }
  const pool =
    globalForPrisma.pgPool ??
    new pg.Pool({
      connectionString,
      max: process.env.VERCEL ? 1 : 10,
      ssl:
        connectionString.includes("sslmode=require") ||
        connectionString.includes("neon.tech") ||
        connectionString.includes("prisma.io")
          ? { rejectUnauthorized: false }
          : undefined,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrisma();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, _receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
