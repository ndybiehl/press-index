import Link from "next/link";
import { cn } from "@/lib/utils";

export function DecadeFilters({
  base,
  current,
}: {
  base: string;
  current?: string;
}) {
  const decades = ["1970", "1980", "1990", "2000", "2010", "2020"];
  return (
    <div className="flex flex-wrap gap-2">
      <Chip href={base} active={!current}>
        All years
      </Chip>
      {decades.map((d) => (
        <Chip key={d} href={`${base}${base.includes("?") ? "&" : "?"}decade=${d}`} active={current === d}>
          {d}s
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3 py-1 text-xs",
        active
          ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-black"
          : "border-border text-muted-foreground hover:border-primary/40",
      )}
    >
      {children}
    </Link>
  );
}
