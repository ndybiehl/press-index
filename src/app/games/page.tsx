import { CatalogBrowser } from "@/app/catalog-browser";

export const metadata = { title: "Games" };

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ decade?: string; platform?: string; q?: string }>;
}) {
  const sp = await searchParams;
  return (
    <CatalogBrowser
      kind="game"
      title="Games"
      dek="From Odyssey overlays and Atari carts to Switch Game Cards. Front cover, back cover, and a path to the manual on every title."
      decade={sp.decade}
      platform={sp.platform}
      q={sp.q}
    />
  );
}
