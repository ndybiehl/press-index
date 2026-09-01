import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverFlip } from "@/components/cover-flip";
import { ManualViewer } from "@/components/manual-viewer";
import { Button } from "@/components/ui/button";
import { findArchiveManual } from "@/lib/archive";
import { completenessLabel, conditionLabel, kindLabel, money } from "@/lib/format";
import { prisma } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.catalogItem.findUnique({
    where: { slug },
    include: { platform: true },
  });
  if (!item) return { title: "Not found" };
  return { title: `${item.title} (${item.platform.shortName})` };
}

export default async function CatalogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.catalogItem.findUnique({
    where: { slug },
    include: {
      platform: true,
      listings: {
        where: { status: "active" },
        include: { seller: true },
        orderBy: { priceCents: "asc" },
      },
    },
  });
  if (!item) notFound();

  let archiveId = item.manualArchiveId;
  if (!archiveId && item.hasManual) {
    const found = await findArchiveManual(item.title, item.platform.name);
    if (found) {
      archiveId = found.identifier;
      await prisma.catalogItem.update({
        where: { id: item.id },
        data: { manualArchiveId: archiveId },
      });
    }
  }

  const related = await prisma.catalogItem.findMany({
    where: { platformId: item.platformId, id: { not: item.id } },
    take: 6,
    orderBy: { sortTitle: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
        <Link href={`/platforms/${item.platform.slug}`}>{item.platform.name}</Link>
        {" · "}
        {kindLabel(item.kind)}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
        <CoverFlip
          title={item.title}
          platform={item.platform.shortName}
          platformColor={item.platform.color}
          year={item.releasedYear}
          publisher={item.publisher}
          kind={item.kind}
          description={item.description}
          genre={item.genre}
          players={item.players}
          coverFrontUrl={item.coverFrontUrl || undefined}
          coverBackUrl={item.coverBackUrl || undefined}
        />
        <div>
          <h1 className="font-serif text-5xl leading-tight text-foreground">{item.title}</h1>
          <p className="mt-3 text-muted-foreground">
            {item.publisher}
            {item.developer && item.developer !== item.publisher ? ` / ${item.developer}` : ""}
            {item.releasedYear ? ` · ${item.releasedYear}` : ""}
            {item.genre ? ` · ${item.genre}` : ""}
            {item.players ? ` · ${item.players} players` : ""}
          </p>
          {item.msrpCents > 0 ? (
            <p className="mt-3 font-mono text-sm text-primary">
              Original MSRP {money(item.msrpCents)}
              {item.releasedYear ? ` · ${item.releasedYear} US launch` : ""}
            </p>
          ) : (
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              Original MSRP not listed (pack-in, digital, or no US street price on record)
            </p>
          )}
          <p className="mt-6 max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
            {item.description}
          </p>
          {item.sourceUrl ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Summary and some artwork via{" "}
              <a className="text-[var(--phosphor)] underline-offset-4 hover:underline" href={item.sourceUrl}>
                Wikipedia
              </a>
              . Box scans also from the Libretro thumbnail server when a match exists.
            </p>
          ) : null}
          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-sm">
            <Meta label="Region" value={item.region} />
            <Meta label="Media" value={item.platform.media} />
            <Meta label="Manual" value={item.hasManual ? "Shipped with paper manual" : "No paper manual on record"} />
            <Meta label="Catalog" value={item.productCode || item.variant || "Indexed"} />
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/sell?item=${item.slug}`}>
              <Button>Sell this {item.kind}</Button>
            </Link>
            <Link href={`/platforms/${item.platform.slug}`}>
              <Button variant="outline">More {item.platform.shortName}</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-3xl text-foreground">Copies for sale</h2>
        {item.listings.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Nothing live right now.{" "}
            <Link className="text-[var(--phosphor)]" href={`/sell?item=${item.slug}`}>
              Be the first listing.
            </Link>
          </p>
        ) : (
          <div className="mt-6 divide-y divide-border rounded-xl border border-border">
            {item.listings.map((listing) => (
              <div key={listing.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-foreground">
                    {conditionLabel(listing.condition)} · {completenessLabel(listing.completeness)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {listing.seller.name}
                    {listing.seller.location ? ` · ${listing.seller.location}` : ""}
                  </p>
                  {listing.notes ? (
                    <p className="mt-1 max-w-xl text-sm text-muted-foreground">{listing.notes}</p>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-foreground">{money(listing.priceCents)}</p>
                  <p className="text-xs text-muted-foreground">+ {money(listing.shippingCents)} ship</p>
                  <Link href={`/listings/${listing.id}`}>
                    <Button className="mt-2" size="sm">
                      Buy
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-3xl text-foreground">Manual</h2>
        <div className="mt-4">
          <ManualViewer
            title={item.title}
            platformName={item.platform.name}
            archiveId={archiveId || undefined}
            hasManual={item.hasManual}
          />
        </div>
      </section>

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-serif text-3xl text-foreground">Same platform</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/catalog/${rel.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-[var(--phosphor)]"
              >
                {rel.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
