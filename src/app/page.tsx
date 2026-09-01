import Image from "next/image";
import Link from "next/link";
import { ItemCard } from "@/components/item-card";
import { prisma } from "@/lib/db";
import { catalogStats } from "@/lib/queries";

export default async function HomePage() {
  const stats = await catalogStats();
  const [platforms, featured, live] = await Promise.all([
    prisma.platform.findMany({ orderBy: [{ sortRank: "asc" }, { releasedYear: "asc" }] }),
    prisma.catalogItem.findMany({
      where: { kind: "game", releasedYear: { lte: 1995 } },
      include: {
        platform: true,
        listings: { where: { status: "active" }, orderBy: { priceCents: "asc" } },
      },
      orderBy: { releasedYear: "asc" },
      take: 8,
    }),
    prisma.listing.findMany({
      where: { status: "active" },
      include: { item: { include: { platform: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/hero.jpg"
          alt="Aisle of a used game shop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <p className="font-mono text-xs tracking-[0.28em] text-[var(--phosphor)] uppercase">
            The complete video game index
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            Every system. Every cart. Front, back, and the manual.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Boxed & Loose is a marketplace and a catalog: Magnavox Odyssey overlays
            through Switch 2 Game Cards, plus the controllers, light guns, memory
            cards, and oddball add-ons that shipped with them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/games"
              className="rounded-lg bg-[var(--phosphor)] px-4 py-2 text-sm font-medium text-black"
            >
              Browse games
            </Link>
            <Link
              href="/systems"
              className="rounded-lg border border-border px-4 py-2 text-sm text-foreground"
            >
              Browse systems
            </Link>
            <Link
              href="/sell"
              className="rounded-lg border border-border px-4 py-2 text-sm text-foreground"
            >
              List something
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Platforms" value={stats.platforms} href="/platforms" />
        <Stat label="Games" value={stats.games} href="/games" />
        <Stat label="Systems" value={stats.systems} href="/systems" />
        <Stat label="Accessories" value={stats.accessories} href="/accessories" />
        <Stat label="Live listings" value={stats.listings} href="/search?kind=all" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
              Deep catalog
            </p>
            <h2 className="mt-2 font-serif text-3xl text-foreground">The really old ones</h2>
          </div>
          <Link href="/games?decade=1980" className="text-sm text-muted-foreground">
            1980s index
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="font-serif text-3xl text-foreground">For sale now</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {live.map((listing) => (
            <ItemCard
              key={listing.id}
              href={`/listings/${listing.id}`}
              title={listing.item.title}
              platform={listing.item.platform.shortName}
              platformColor={listing.item.platform.color}
              year={listing.item.releasedYear}
              publisher={listing.item.publisher}
              kind={listing.item.kind}
              coverUrl={listing.item.coverFrontUrl || undefined}
              msrpCents={listing.item.msrpCents || undefined}
              lowestCents={listing.priceCents}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-serif text-3xl text-foreground">All platforms</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Home consoles, handhelds, computers, and arcade. Open a platform for its
          games, hardware variants, and accessories.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <Link
              key={p.id}
              href={`/platforms/${p.slug}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 hover:border-[var(--phosphor)]"
            >
              <span
                className="size-3 rounded-full"
                style={{ background: p.color }}
              />
              <span>
                <span className="block text-sm text-foreground">{p.name}</span>
                <span className="block font-mono text-[11px] text-muted-foreground">
                  {p.releasedYear} · {p.manufacturer}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-muted/40 px-4 py-5 hover:border-[var(--phosphor)]"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 font-serif text-4xl text-foreground">{value}</p>
    </Link>
  );
}
