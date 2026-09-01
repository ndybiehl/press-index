import { ItemCard } from "@/components/item-card";
import { searchItems } from "@/lib/queries";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kind?: string; decade?: string; platform?: string }>;
}) {
  const sp = await searchParams;
  const { items, total } = await searchItems({
    q: sp.q,
    kind: sp.kind,
    decade: sp.decade,
    platform: sp.platform,
    take: 72,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-5xl text-foreground">Search</h1>
      <p className="mt-3 text-muted-foreground">
        {sp.q ? `Results for “${sp.q}”` : "The full index"} · {total} items
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            href={`/catalog/${item.slug}`}
            title={item.title}
            platform={item.platform.shortName}
            platformColor={item.platform.color}
            year={item.releasedYear}
            publisher={item.publisher}
            kind={item.kind}
            coverUrl={item.coverFrontUrl || undefined}
            msrpCents={item.msrpCents || undefined}
            lowestCents={item.listings[0]?.priceCents}
          />
        ))}
      </div>
    </div>
  );
}
