import { CatalogBrowser } from "@/app/catalog-browser";

export const metadata = { title: "Systems" };

export default async function SystemsPage({
  searchParams,
}: {
  searchParams: Promise<{ decade?: string; platform?: string }>;
}) {
  const sp = await searchParams;
  return (
    <CatalogBrowser
      kind="system"
      title="Systems"
      dek="Control decks, top-loaders, slims, OLEDs, and the odd Pippin. Hardware variants are first-class catalog items, not footnotes."
      decade={sp.decade}
      platform={sp.platform}
    />
  );
}
