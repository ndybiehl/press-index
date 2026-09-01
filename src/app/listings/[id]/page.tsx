import Link from "next/link";
import { notFound } from "next/navigation";
import { BoxArt } from "@/components/box-art";
import { getCurrentUser } from "@/lib/auth";
import { completenessLabel, conditionLabel, money } from "@/lib/format";
import { prisma } from "@/lib/db";
import { BuyButton } from "./buy-button";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { item: { include: { platform: true } }, seller: true },
  });
  if (!listing) notFound();
  const user = await getCurrentUser();
  const total = listing.priceCents + listing.shippingCents;

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[280px_1fr]">
      <BoxArt
        title={listing.item.title}
        platform={listing.item.platform.shortName}
        platformColor={listing.item.platform.color}
        year={listing.item.releasedYear}
        publisher={listing.item.publisher}
        kind={listing.item.kind}
        coverUrl={listing.item.coverFrontUrl || undefined}
      />
      <div>
        <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
          {listing.status === "active" ? "For sale" : listing.status}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-foreground">{listing.item.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {listing.item.platform.name} · {conditionLabel(listing.condition)} ·{" "}
          {completenessLabel(listing.completeness)}
        </p>
        <p className="mt-6 font-serif text-5xl text-foreground">{money(listing.priceCents)}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          + {money(listing.shippingCents)} shipping · {money(total)} total
        </p>
        {listing.item.msrpCents > 0 ? (
          <p className="mt-2 font-mono text-xs text-primary">
            Original MSRP {money(listing.item.msrpCents)}
          </p>
        ) : null}
        <p className="mt-6 text-sm text-muted-foreground">
          Seller {listing.seller.name}
          {listing.seller.location ? ` · ${listing.seller.location}` : ""}
        </p>
        {listing.notes ? (
          <p className="mt-4 max-w-xl leading-relaxed text-foreground/90">{listing.notes}</p>
        ) : null}
        <div className="mt-8">
          {listing.status !== "active" ? (
            <p className="text-sm text-muted-foreground">This copy is no longer available.</p>
          ) : !user ? (
            <Link
              href={`/login?next=/listings/${listing.id}`}
              className="inline-flex h-9 items-center rounded-lg bg-[var(--phosphor)] px-4 text-sm font-medium text-black"
            >
              Sign in to buy
            </Link>
          ) : user.id === listing.sellerId ? (
            <p className="text-sm text-muted-foreground">This is your listing.</p>
          ) : (
            <BuyButton listingId={listing.id} />
          )}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Platform fee is 8% on top of Stripe processing. Checkout is destination-charge
          ready for connected seller accounts.{" "}
          <Link className="text-[var(--phosphor)]" href={`/catalog/${listing.item.slug}`}>
            Open the index card
          </Link>
        </p>
      </div>
    </div>
  );
}
