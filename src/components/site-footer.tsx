import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-lg text-foreground">Boxed & Loose</p>
          <p className="mt-2 max-w-md leading-relaxed">
            A buy-and-sell catalog of video games, systems, and accessories from
            the Magnavox Odyssey to current hardware. Covers are catalog cards.
            Manuals link to public Internet Archive scans. We do not host ROMs.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Link href="/games">Games</Link>
            <Link href="/systems">Systems</Link>
            <Link href="/accessories">Accessories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/platforms">All platforms</Link>
            <Link href="/sell">List an item</Link>
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
