import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SellForm } from "./sell-form";

export const metadata = { title: "Sell" };

export default async function SellPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/sell");
  const sp = await searchParams;
  const selected = sp.item
    ? await prisma.catalogItem.findUnique({
        where: { slug: sp.item },
        include: { platform: true },
      })
    : null;
  const recent = await prisma.catalogItem.findMany({
    include: { platform: true },
    orderBy: { title: "asc" },
    take: 40,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-5xl text-foreground">List a copy</h1>
      <p className="mt-3 text-muted-foreground">
        Pick a catalog item, grade it, and price it. Buyers see front/back covers
        and a path to the manual from the index card.
      </p>
      <SellForm
        selected={
          selected
            ? { slug: selected.slug, title: selected.title, platform: selected.platform.shortName }
            : null
        }
        options={recent.map((item) => ({
          slug: item.slug,
          title: item.title,
          platform: item.platform.shortName,
        }))}
      />
    </div>
  );
}
