import { cn } from "@/lib/utils";

type BoxArtProps = {
  title: string;
  platform: string;
  platformColor?: string;
  year?: number | null;
  publisher?: string;
  kind: string;
  side?: "front" | "back";
  description?: string;
  genre?: string;
  players?: string;
  coverUrl?: string;
  className?: string;
};

export function BoxArt({
  title,
  platform,
  platformColor = "#c8f542",
  year,
  publisher,
  kind,
  side = "front",
  description,
  genre,
  players,
  coverUrl,
  className,
}: BoxArtProps) {
  const family = familyFromPlatform(platform);
  if (coverUrl) {
    return (
      <article
        className={cn(
          "relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-sm border border-border bg-muted text-left shadow-sm dark:bg-zinc-950 dark:shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
          className,
        )}
      >
        <img
          src={coverUrl}
          alt={`${title} ${side === "back" ? "back" : "front"} cover`}
          className="h-full w-full object-contain bg-muted dark:bg-zinc-950"
        />
      </article>
    );
  }
  if (side === "back") {
    return (
      <article
        className={cn(
          "relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-sm border border-border bg-card p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)]",
          className,
        )}
        style={{ boxShadow: `8px 0 0 ${platformColor} inset` }}
      >
        <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--phosphor)] uppercase">
          Boxed & Loose · back
        </p>
        <h3 className="mt-3 font-serif text-xl leading-tight text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {platform}
          {year ? ` · ${year}` : ""}
          {publisher ? ` · ${publisher}` : ""}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90/90">
          {description || "Indexed hardware and software. Front and back covers live here; manuals open from the Internet Archive when a public scan exists."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
          <div>
            <dt className="text-[var(--phosphor)]">Kind</dt>
            <dd>{kind}</dd>
          </div>
          <div>
            <dt className="text-[var(--phosphor)]">Players</dt>
            <dd>{players || "—"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[var(--phosphor)]">Genre</dt>
            <dd>{genre || "Catalog"}</dd>
          </div>
        </dl>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-sm border border-border text-left shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
        familyClass(family),
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-3"
        style={{ background: platformColor }}
      />
      <div className="flex flex-1 flex-col p-4 pl-6">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.22em] text-white/70 uppercase">
            {kind}
          </p>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold text-black"
            style={{ background: platformColor }}
          >
            {year ?? "INDEX"}
          </span>
        </div>
        <div className="mt-auto">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase">
            {platform}
          </p>
          <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.1] text-white">
            {title}
          </h3>
          {publisher ? (
            <p className="mt-2 text-xs text-white/65">{publisher}</p>
          ) : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
    </article>
  );
}

function familyFromPlatform(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("nintendo") || p.includes("nes") || p.includes("snes") || p.includes("switch") || p.includes("game boy") || p.includes("famicom") || p.includes("wii") || p.includes("gamecube") || p.includes("64") || p.includes("3ds") || p.includes("ds")) {
    return "nintendo";
  }
  if (p.includes("sega") || p.includes("genesis") || p.includes("dreamcast") || p.includes("saturn") || p.includes("master") || p.includes("gear")) {
    return "sega";
  }
  if (p.includes("playstation") || p.includes("ps1") || p.includes("ps2") || p.includes("ps3") || p.includes("ps4") || p.includes("ps5") || p.includes("psp") || p.includes("vita")) {
    return "sony";
  }
  if (p.includes("xbox") || p.includes("series")) return "microsoft";
  if (p.includes("atari") || p.includes("jaguar") || p.includes("lynx") || p.includes("2600")) return "atari";
  return "other";
}

function familyClass(family: string) {
  switch (family) {
    case "nintendo":
      return "bg-gradient-to-br from-[#6e1f1f] via-[#3a1212] to-[#140808]";
    case "sega":
      return "bg-gradient-to-br from-[#1c3a6e] via-[#121a33] to-[#07090f]";
    case "sony":
      return "bg-gradient-to-br from-[#2a2a40] via-[#14141f] to-[#07070b]";
    case "microsoft":
      return "bg-gradient-to-br from-[#3d6b1f] via-[#1c2e10] to-[#0a1206]";
    case "atari":
      return "bg-gradient-to-br from-[#7a4a16] via-[#3a220c] to-[#140c06]";
    default:
      return "bg-gradient-to-br from-[#3a3428] via-[#1c1914] to-[#0c0b09]";
  }
}
