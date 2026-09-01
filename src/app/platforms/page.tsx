import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "Platforms" };

export default async function PlatformsPage() {
  const platforms = await prisma.platform.findMany({
    include: { _count: { select: { items: true } } },
    orderBy: [{ sortRank: "asc" }, { releasedYear: "asc" }],
  });

  const groups = [
    { key: "home", label: "Home consoles" },
    { key: "handheld", label: "Handhelds" },
    { key: "hybrid", label: "Hybrid" },
    { key: "computer", label: "Computers" },
    { key: "arcade", label: "Arcade" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-5xl text-foreground">All platforms</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every major home system, handheld, and computer platform in the index,
        1972 to now.
      </p>
      {groups.map((group) => {
        const rows = platforms.filter((p) => p.kind === group.key);
        if (!rows.length) return null;
        return (
          <section key={group.key} className="mt-12">
            <h2 className="font-serif text-2xl text-foreground">{group.label}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((p) => (
                <Link
                  key={p.id}
                  href={`/platforms/${p.slug}`}
                  className="rounded-xl border border-border bg-muted/40 p-4 hover:border-[var(--phosphor)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-3 rounded-full" style={{ background: p.color }} />
                    <span className="font-medium text-foreground">{p.name}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.releasedYear}
                    {p.discontinuedYear ? `–${p.discontinuedYear}` : ""} · {p.manufacturer} · {p._count.items} items
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
