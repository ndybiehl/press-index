import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { applicationFeeAmount, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }
  const { listingId } = (await request.json()) as { listingId?: string };
  if (!listingId) {
    return NextResponse.json({ error: "Missing listing" }, { status: 400 });
  }
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { item: { include: { platform: true } }, seller: true },
  });
  if (!listing || listing.status !== "active") {
    return NextResponse.json({ error: "Listing unavailable" }, { status: 404 });
  }
  if (listing.sellerId === user.id) {
    return NextResponse.json({ error: "You cannot buy your own listing" }, { status: 400 });
  }

  const amount = listing.priceCents + listing.shippingCents;
  const stripe = getStripe();
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3450";

  if (!stripe) {
    const order = await prisma.order.create({
      data: {
        listingId: listing.id,
        buyerId: user.id,
        amountCents: amount,
        status: "demo_paid",
      },
    });
    await prisma.listing.update({
      where: { id: listing.id },
      data: { status: "sold" },
    });
    return NextResponse.json({
      url: `${origin}/checkout/success?demo=1&order=${order.id}`,
    });
  }

  const order = await prisma.order.create({
    data: {
      listingId: listing.id,
      buyerId: user.id,
      amountCents: amount,
      status: "pending",
    },
  });

  const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/listings/${listing.id}`,
    customer_email: user.email,
    integration_identifier: `pressidx_${Math.random().toString(36).slice(2, 10)}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: `${listing.item.title} (${listing.item.platform.shortName})`,
            description: `${listing.condition} · ${listing.completeness}`,
          },
        },
      },
    ],
    metadata: {
      listingId: listing.id,
      orderId: order.id,
      buyerId: user.id,
    },
  };

  if (listing.seller.stripeAccountId) {
    sessionParams.payment_intent_data = {
      application_fee_amount: applicationFeeAmount(amount),
      transfer_data: { destination: listing.seller.stripeAccountId },
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });
  await prisma.listing.update({
    where: { id: listing.id },
    data: { status: "reserved" },
  });

  return NextResponse.json({ url: session.url });
}
