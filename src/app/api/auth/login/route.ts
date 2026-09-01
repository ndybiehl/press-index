import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

function safeNext(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

async function readCredentials(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      next?: string;
    };
    return {
      email: body.email ?? "",
      password: body.password ?? "",
      next: safeNext(body.next),
    };
  }
  const form = await request.formData();
  return {
    email: String(form.get("email") || ""),
    password: String(form.get("password") || ""),
    next: safeNext(String(form.get("next") || "")),
  };
}

export async function POST(request: Request) {
  const { email, password, next } = await readCredentials(request);
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json")
    && (request.headers.get("content-type") ?? "").includes("application/json");

  if (!email || !password) {
    if (wantsJson) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/login?error=missing", request.url), 303);
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    if (wantsJson) {
      return NextResponse.json({ error: "Unknown email or password" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  }

  const session = await createSessionToken(user.id);
  const secure = new URL(request.url).protocol === "https:";

  if (wantsJson) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, session.id, sessionCookieOptions(session.expiresAt, secure));
    return res;
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(SESSION_COOKIE, session.id, sessionCookieOptions(session.expiresAt, secure));
  return res;
}
