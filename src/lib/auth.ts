import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const COOKIE = "boxed_and_loose_session";

function secret() {
  return process.env.AUTH_SECRET ?? "boxed-and-loose-dev-secret-change-me";
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(next, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const SESSION_COOKIE = COOKIE;

export async function createSessionToken(userId: string) {
  const id = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  await prisma.session.create({ data: { id, userId, expiresAt } });
  return { id, expiresAt };
}

export function sessionCookieOptions(expiresAt: Date, secure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
    secure,
  };
}

export async function createSession(userId: string) {
  const { id, expiresAt } = await createSessionToken(userId);
  const jar = await cookies();
  jar.set(COOKIE, id, sessionCookieOptions(expiresAt, false));
}

export async function destroySession() {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (id) {
    await prisma.session.deleteMany({ where: { id } });
  }
  jar.delete(COOKIE);
}

export async function getCurrentUser() {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (!id) return null;
  const session = await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!session || session.expiresAt.getTime() < Date.now()) {
    if (session) await prisma.session.delete({ where: { id } }).catch(() => undefined);
    return null;
  }
  return session.user;
}

export function signValue(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}
