import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ItemCard } from "@/components/item-card";
import { prisma } from "@/lib/db";
import { catalogStats } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Brett. Come look at this.",
  description:
    "A working marketplace for boxed and loose video games, systems, and accessories. Built to show you, not to pitch a slide deck.",
  robots: { index: false, follow: false },
};

export default async function ForBrettPage() {
  const stats = await catalogStats();
  const covers = await prisma.catalogItem.findMany({
    where: { kind: "game", coverFrontUrl: { not: "" } },
    include: {
      platform: true,
      listings: { where: { status: "active" }, orderBy: { priceCents: "asc" } },
    },
    orderBy: { releasedYear: "asc" },
    take: 12,
  });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/brett-hero.jpg"
          alt="An empty used game shop at night, two stools at the counter"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/25" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 md:py-36">
          <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">
            For Brett. From Randy. Not a deck.
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            The used game shop we always talked about. It is already open.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">
            I built a live catalog of games, systems, and accessories. Front covers,
            back covers, manuals, original MSRP, and buy/sell listings. I want you
            on this with me.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/games"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Walk the shelves
            </Link>
            <Link
              href="/games?platform=snes"
              className="rounded-lg border border-border bg-background/50 px-5 py-2.5 text-sm text-foreground backdrop-blur"
            >
              Start at SNES
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <Stat n={stats.platforms} label="Systems indexed" />
        <Stat n={stats.games} label="Games on the wall" />
        <Stat n={stats.accessories} label="Zappers, Paks, VMUs" />
        <Stat n={stats.listings} label="Copies for sale" />
        <Stat n={1972} label="Oldest year on the shelf" />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
          A note, not a speech
        </p>
        <div className="mt-4 space-y-5 text-lg leading-relaxed text-foreground/90">
          <p>
            You know this market better than most people who try to sell in it.
            You know when a cart is worth money because the manual is still in
            there, and when a &quot;complete&quot; listing on eBay is a box with a
            reproduction insert.
          </p>
          <p>
            What does not exist is a shop that treats the catalog as seriously as
            the sale. PriceCharting is a spreadsheet. eBay is a junk drawer.
            GameStop forgot the NES. I started Boxed &amp; Loose so we could own
            the version that actually cares: every platform, CIB vs loose, the
            cover, the back, the booklet.
          </p>
          <p>
            This is not a mockup. Click around. Super Mario Kart has a real box
            scan and a public manual. The NES list is covers, not gray tiles.
            Sign in if you want and list a copy. Password for the demo accounts
            is <code className="text-primary">pressindex</code>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
              Proof it is real
            </p>
            <h2 className="mt-2 font-serif text-4xl text-foreground">
              The wall, not a wireframe
            </h2>
          </div>
          <Link href="/games" className="text-sm text-muted-foreground hover:text-foreground">
            Full index
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {covers.map((item) => (
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

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-serif text-4xl text-foreground">Why this is a business</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Play
            title="The catalog is the moat"
            body="Collectors search for a specific SKU, not a vibe. Odyssey through Switch 2, plus the accessories people lose. That index is the storefront."
          />
          <Play
            title="Completeness is the product"
            body="CIB, game and manual, loose, box only. Photograph the pieces. Price the copy you actually have. That is where the margin lives."
          />
          <Play
            title="We already have the shop"
            body="You know what to buy, what to pass, and what a fair CIB looks like. I can keep the site, the listings, and the ops moving. That split is the company."
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
              How we split it
            </p>
            <h2 className="mt-2 font-serif text-3xl text-foreground">You. Me. The shop.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Not a 40-page operating agreement. A starting picture.
            </p>
          </div>
          <dl className="space-y-6">
            <Split
              who="Brett"
              what="Taste, inventory, what we carry, what a copy is worth, the collector voice. If it would not hang on your wall, it does not hang on ours."
            />
            <Split
              who="Randy"
              what="The site, payments, listings, catalog, and the unglamorous ops so this is a shop instead of a weekend experiment."
            />
            <Split
              who="Both"
              what="What we buy, what we price, and whether this stays a serious side business or becomes the thing."
            />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-serif text-4xl text-foreground md:text-5xl">
          Two stools. Come sit.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Click a shelf. Tell me what is wrong, what is missing, and what we
          should sell first. I will take that as a yes to keep going.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/games"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Open the catalog
          </Link>
          <Link
            href="/platforms"
            className="rounded-lg border border-border px-5 py-2.5 text-sm text-foreground"
          >
            All systems
          </Link>
          <Link
            href="/sell"
            className="rounded-lg border border-border px-5 py-2.5 text-sm text-foreground"
          >
            List a copy
          </Link>
        </div>
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          boxedandloose.vercel.app/for-brett
        </p>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-5">
      <p className="font-serif text-3xl text-foreground">{n.toLocaleString()}</p>
      <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}

function Play({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}

function Split({ who, what }: { who: string; what: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">{who}</dt>
      <dd className="mt-1 leading-relaxed text-foreground/90">{what}</dd>
    </div>
  );
}
