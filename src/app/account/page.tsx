import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { money } from "@/lib/format";
import { prisma } from "@/lib/db";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");
  const [listings, orders] = await Promise.all([
    prisma.listing.findMany({
      where: { sellerId: user.id },
      include: { item: { include: { platform: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      where: { buyerId: user.id },
      include: { listing: { include: { item: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground">{user.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user.email}
            {user.location ? ` · ${user.location}` : ""}
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="text-sm text-muted-foreground" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Your listings</h2>
        <div className="mt-4 divide-y divide-border rounded-xl border border-border">
          {listings.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No listings yet.</p>
          ) : (
            listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted/40"
              >
                <span>
                  {listing.item.title}{" "}
                  <span className="text-muted-foreground">({listing.item.platform.shortName})</span>
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {money(listing.priceCents)} · {listing.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Purchases</h2>
        <div className="mt-4 divide-y divide-border rounded-xl border border-border">
          {orders.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No purchases yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-4 py-3">
                <span>{order.listing.item.title}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {money(order.amountCents)} · {order.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
