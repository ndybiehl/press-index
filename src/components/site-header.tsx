import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser } from "@/lib/auth";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/mark.jpg"
            alt=""
            className="size-8 rounded-md object-cover ring-1 ring-primary"
          />
          <span className="font-serif text-xl tracking-tight text-foreground">
            Press Index
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link className="hover:text-foreground" href="/games">
            Games
          </Link>
          <Link className="hover:text-foreground" href="/systems">
            Systems
          </Link>
          <Link className="hover:text-foreground" href="/accessories">
            Accessories
          </Link>
          <Link className="hover:text-foreground" href="/platforms">
            Platforms
          </Link>
        </nav>
        <form action="/search" className="ml-auto hidden min-w-0 max-w-sm flex-1 md:block">
          <label className="sr-only" htmlFor="q">
            Search the index
          </label>
          <input
            id="q"
            name="q"
            placeholder="Search every game, system, accessory"
            className="h-9 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </form>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 text-sm">
          <ThemeToggle />
          <Link
            href="/sell"
            className="rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground"
          >
            Sell
          </Link>
          {user ? (
            <Link className="text-muted-foreground hover:text-foreground" href="/account">
              {user.name}
            </Link>
          ) : (
            <Link className="text-muted-foreground hover:text-foreground" href="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-border px-4 py-2 md:hidden">
        <form action="/search">
          <input
            name="q"
            placeholder="Search the index"
            className="h-9 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </form>
        <nav className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/games">Games</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/accessories">Accessories</Link>
          <Link href="/platforms">Platforms</Link>
          <Link href="/sell">Sell</Link>
          {user ? (
            <Link href="/account">{user.name}</Link>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
