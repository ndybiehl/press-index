import Link from "next/link";
import { BoxArt } from "@/components/box-art";
import { money } from "@/lib/format";

type ItemCardProps = {
  href: string;
  title: string;
  platform: string;
  platformColor: string;
  year?: number | null;
  publisher?: string;
  kind: string;
  coverUrl?: string;
  msrpCents?: number | null;
  lowestCents?: number | null;
};

export function ItemCard({
  href,
  title,
  platform,
  platformColor,
  year,
  publisher,
  kind,
  coverUrl,
  msrpCents,
  lowestCents,
}: ItemCardProps) {
  return (
    <Link href={href} className="group block">
      <BoxArt
        title={title}
        platform={platform}
        platformColor={platformColor}
        year={year}
        publisher={publisher}
        kind={kind}
        coverUrl={coverUrl}
        className="transition duration-300 group-hover:-translate-y-1 group-hover:brightness-110"
      />
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="truncate font-medium text-foreground">{title}</p>
        {lowestCents != null ? (
          <p className="shrink-0 font-mono text-xs text-[var(--phosphor)]">
            from {money(lowestCents)}
          </p>
        ) : (
          <p className="shrink-0 font-mono text-xs text-muted-foreground">index only</p>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {platform}
        {year ? ` · ${year}` : ""}
        {msrpCents ? ` · MSRP ${money(msrpCents)}` : ""}
      </p>
    </Link>
  );
}
