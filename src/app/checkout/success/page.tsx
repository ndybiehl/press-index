import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; demo?: string; order?: string }>;
}) {
  const sp = await searchParams;
  if (sp.session_id) {
    const stripe = getStripe();
    if (stripe) {
      const session = await stripe.checkout.sessions.retrieve(sp.session_id);
      const orderId = session.metadata?.orderId;
      const listingId = session.metadata?.listingId;
      if (orderId && session.payment_status === "paid") {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "paid", stripeSessionId: session.id },
        });
      }
      if (listingId && session.payment_status === "paid") {
        await prisma.listing.update({
          where: { id: listingId },
          data: { status: "sold" },
        });
      }
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
        {sp.demo ? "Demo checkout" : "Paid"}
      </p>
      <h1 className="mt-3 font-serif text-5xl text-foreground">It&apos;s yours.</h1>
      <p className="mt-4 text-muted-foreground">
        {sp.demo
          ? "Stripe keys are not configured, so this was a demo sale. The listing is marked sold locally."
          : "The seller will ship this copy. You will get a receipt from Stripe."}
      </p>
      <Link
        href="/account"
        className="mt-8 inline-flex h-9 items-center rounded-lg bg-[var(--phosphor)] px-4 text-sm font-medium text-black"
      >
        View account
      </Link>
    </div>
  );
}
