import { notFound } from "next/navigation";
import { ItemCard } from "@/components/item-card";
import { prisma } from "@/lib/db";

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    include: {
      items: {
        include: {
          listings: { where: { status: "active" }, orderBy: { priceCents: "asc" } },
        },
        orderBy: [{ kind: "asc" }, { sortTitle: "asc" }],
      },
    },
  });
  if (!platform) notFound();

  const games = platform.items.filter((i) => i.kind === "game");
  const systems = platform.items.filter((i) => i.kind === "system");
  const accessories = platform.items.filter((i) => i.kind === "accessory");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
        {platform.manufacturer} · {platform.releasedYear}
      </p>
      <h1 className="mt-2 font-serif text-5xl text-foreground">{platform.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {platform.description}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {platform.media} · {platform.kind}
        {platform.generation ? ` · gen ${platform.generation}` : ""}
      </p>

      {systems.length ? (
        <Section title="Systems">
          {systems.map((item) => (
            <ItemCard
              key={item.id}
              href={`/catalog/${item.slug}`}
              title={item.title}
              platform={platform.shortName}
              platformColor={platform.color}
              year={item.releasedYear}
              publisher={item.publisher}
              kind={item.kind}
              coverUrl={item.coverFrontUrl || undefined}
              msrpCents={item.msrpCents || undefined}
              lowestCents={item.listings[0]?.priceCents}
            />
          ))}
        </Section>
      ) : null}

      {games.length ? (
        <Section title="Games">
          {games.map((item) => (
            <ItemCard
              key={item.id}
              href={`/catalog/${item.slug}`}
              title={item.title}
              platform={platform.shortName}
              platformColor={platform.color}
              year={item.releasedYear}
              publisher={item.publisher}
              kind={item.kind}
              coverUrl={item.coverFrontUrl || undefined}
              msrpCents={item.msrpCents || undefined}
              lowestCents={item.listings[0]?.priceCents}
            />
          ))}
        </Section>
      ) : null}

      {accessories.length ? (
        <Section title="Accessories">
          {accessories.map((item) => (
            <ItemCard
              key={item.id}
              href={`/catalog/${item.slug}`}
              title={item.title}
              platform={platform.shortName}
              platformColor={platform.color}
              year={item.releasedYear}
              publisher={item.publisher}
              kind={item.kind}
              coverUrl={item.coverFrontUrl || undefined}
              msrpCents={item.msrpCents || undefined}
              lowestCents={item.listings[0]?.priceCents}
            />
          ))}
        </Section>
      ) : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-3xl text-foreground">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}
