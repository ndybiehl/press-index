# Press Index

A catalog-first marketplace for buying and selling video games, systems, and accessories.

Live: [https://boxedandloose.vercel.app](https://boxedandloose.vercel.app)

The index covers home consoles, handhelds, computers, and arcade from the Magnavox Odyssey (1972) through current hardware. Every title has a front and back catalog card. Paper manuals are linked to public Internet Archive scans when they exist. Press Index does not host ROMs or redistributed copyrighted PDFs.

Production (Vercel): set `DATABASE_URL` to Postgres (Neon) plus `AUTH_SECRET` and `NEXT_PUBLIC_APP_URL`. After the first deploy, `npx prisma db push` and `npm run db:copy-sqlite` load the catalog from the local SQLite file.

## Run locally

```bash
cd ~/Projects/press-index
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3450](http://localhost:3450). Needs a Postgres `DATABASE_URL`.

Demo logins (password `pressindex`):

- `buyer@pressindex.local`
- `seller@pressindex.local`
- `vault@pressindex.local`

## Stripe

Checkout works in demo mode without keys (marks the listing sold locally). To take real payments, set `STRIPE_SECRET_KEY` in `.env`. Marketplace payouts use destination charges plus an 8% platform fee when the seller has a Stripe connected account id.

## Covers and write-ups

Covers and longer descriptions are pulled from two free indexes, no API key required:

- [Libretro thumbnails](https://thumbnails.libretro.com) for box scans
- Wikipedia for photos, console pictures, and article extracts

Refresh with `npm run db:enrich` (add `--force` to rewrite existing rows).

## Catalog notes

The seed is a deep starter index (hundreds of games, every major platform, hardware variants, and accessories), not a dump of every SKU ever printed. The data model is ready to import a larger source (IGDB, Wikidata) later.
