import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  const body = (await request.json()) as {
    itemSlug?: string;
    condition?: string;
    completeness?: string;
    price?: string;
    shipping?: string;
    notes?: string;
  };
  const item = body.itemSlug
    ? await prisma.catalogItem.findUnique({ where: { slug: body.itemSlug } })
    : null;
  if (!item) return NextResponse.json({ error: "Unknown catalog item" }, { status: 400 });
  const priceCents = Math.round(Number(body.price) * 100);
  const shippingCents = Math.round(Number(body.shipping) * 100);
  if (!Number.isFinite(priceCents) || priceCents < 100) {
    return NextResponse.json({ error: "Price must be at least $1" }, { status: 400 });
  }
  const listing = await prisma.listing.create({
    data: {
      itemId: item.id,
      sellerId: user.id,
      condition: body.condition || "good",
      completeness: body.completeness || "game",
      priceCents,
      shippingCents: Number.isFinite(shippingCents) ? shippingCents : 499,
      notes: body.notes?.slice(0, 1000) || "",
    },
  });
  return NextResponse.json({ id: listing.id });
}
