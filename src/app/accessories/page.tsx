import { CatalogBrowser } from "@/app/catalog-browser";

export const metadata = { title: "Accessories" };

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ decade?: string; platform?: string }>;
}) {
  const sp = await searchParams;
  return (
    <CatalogBrowser
      kind="accessory"
      title="Accessories"
      dek="Zappers, Rumble Paks, WaveBirds, VMUs, GunCons, Kinect bars, and the Expansion Pak hiding in the N64's trap door."
      decade={sp.decade}
      platform={sp.platform}
    />
  );
}
