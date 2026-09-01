import {
  archiveDetailsUrl,
  archiveEmbedUrl,
  archiveSearchUrl,
  findArchiveManual,
  searchArchiveManuals,
} from "@/lib/archive";

type ManualViewerProps = {
  title: string;
  platformName: string;
  archiveId?: string;
  hasManual: boolean;
};

export async function ManualViewer({
  title,
  platformName,
  archiveId,
  hasManual,
}: ManualViewerProps) {
  if (!hasManual) {
    return (
      <div className="rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        This title shipped without a paper manual, or the index has it as digital-only.
        Sellers can still photograph whatever came in the box.
      </div>
    );
  }

  const found = archiveId
    ? { identifier: archiveId, title: `${title} manual` }
    : await findArchiveManual(title, platformName);
  const more = found ? [] : await searchArchiveManuals(title, platformName);

  if (found) {
    return (
      <div className="space-y-3">
        <iframe
          title={`${title} manual`}
          src={archiveEmbedUrl(found.identifier)}
          className="h-[min(70vh,720px)] w-full rounded-xl border border-border bg-black"
        />
        <p className="text-xs text-muted-foreground">
          Public scan via the Internet Archive
          {found.title ? `: ${found.title}` : ""}.{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href={archiveDetailsUrl(found.identifier)}
          >
            Open the original item
          </a>
          . Boxed & Loose does not host copyrighted PDFs.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-5">
      <p className="font-serif text-xl text-foreground">Manual</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Most boxed {platformName} releases shipped with a paper manual. No public scan
        was matched automatically. Open the Internet Archive search below (same tab).
      </p>
      {more.length ? (
        <ul className="mt-4 space-y-2 text-sm">
          {more.slice(0, 5).map((hit) => (
            <li key={hit.identifier}>
              <a className="text-primary underline-offset-4 hover:underline" href={archiveDetailsUrl(hit.identifier)}>
                {hit.title || hit.identifier}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
          href={archiveSearchUrl(title, platformName)}
        >
          Search Internet Archive
        </a>
        <a
          className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm text-foreground"
          href={archiveSearchUrl(`${title} manual`, platformName)}
        >
          Broader manual search
        </a>
      </div>
    </div>
  );
}
