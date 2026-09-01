import { DecadeFilters } from "@/components/filters";
import { ItemCard } from "@/components/item-card";
import { prisma } from "@/lib/db";
import { searchItems } from "@/lib/queries";

export async function CatalogBrowser({
  kind,
  title,
  dek,
  decade,
  platform,
  q,
}: {
  kind: "game" | "system" | "accessory";
  title: string;
  dek: string;
  decade?: string;
  platform?: string;
  q?: string;
}) {
  const platforms = await prisma.platform.findMany({
    orderBy: [{ sortRank: "asc" }, { releasedYear: "asc" }],
  });
  const { items, total } = await searchItems({
    kind,
    decade,
    platform,
    q,
    take: 60,
  });
  const base = kind === "game" ? "/games" : kind === "system" ? "/systems" : "/accessories";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="font-mono text-xs tracking-[0.22em] text-[var(--phosphor)] uppercase">
        Index
      </p>
      <h1 className="mt-2 font-serif text-5xl text-foreground">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{dek}</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{total} indexed</p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Platform
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={base}
              className={`rounded-full border px-3 py-1 text-xs ${
                !platform
                  ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-black"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              All
            </a>
            {platforms.map((p) => (
              <a
                key={p.slug}
                href={`${base}?platform=${p.slug}${decade ? `&decade=${decade}` : ""}`}
                className={`rounded-full border px-3 py-1 text-xs ${
                  platform === p.slug
                    ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-black"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {p.shortName}
              </a>
            ))}
          </div>
        </div>
        <div>
          <DecadeFilters
            base={`${base}${platform ? `?platform=${platform}` : ""}`}
            current={decade}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </div>
  );
}
