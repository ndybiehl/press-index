"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Option = { slug: string; title: string; platform: string };

export function SellForm({
  selected,
  options,
}: {
  selected: Option | null;
  options: Option[];
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        itemSlug: String(formData.get("itemSlug") || ""),
        condition: String(formData.get("condition") || ""),
        completeness: String(formData.get("completeness") || ""),
        price: String(formData.get("price") || ""),
        shipping: String(formData.get("shipping") || ""),
        notes: String(formData.get("notes") || ""),
      }),
    });
    const data = (await res.json()) as { id?: string; error?: string };
    if (!res.ok || !data.id) {
      setError(data.error || "Could not create listing");
      setPending(false);
      return;
    }
    window.location.href = `/listings/${data.id}`;
  }

  return (
    <form action={onSubmit} className="mt-8 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="itemSlug">Catalog item</Label>
        <select
          id="itemSlug"
          name="itemSlug"
          defaultValue={selected?.slug ?? options[0]?.slug}
          className="h-9 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm"
          required
        >
          {selected && !options.some((o) => o.slug === selected.slug) ? (
            <option value={selected.slug}>
              {selected.title} ({selected.platform})
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.title} ({o.platform})
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          Need a different title? Open it in the index first, then hit Sell.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <select id="condition" name="condition" className="h-9 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm" defaultValue="excellent">
            <option value="new">Brand new</option>
            <option value="mint">Mint</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">For parts</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="completeness">Completeness</Label>
          <select id="completeness" name="completeness" className="h-9 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm" defaultValue="cib">
            <option value="cib">Complete in box</option>
            <option value="complete">Game + manual</option>
            <option value="game">Game only</option>
            <option value="box">Box only</option>
            <option value="manual">Manual only</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="number" min="1" step="0.01" required defaultValue="24.99" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping">Shipping (USD)</Label>
          <Input id="shipping" name="shipping" type="number" min="0" step="0.01" required defaultValue="4.99" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Battery replaced, box has a price sticker, manual is present…" />
      </div>
      {error ? <p className="text-sm text-[#e23d28]">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Listing…" : "Publish listing"}
      </Button>
    </form>
  );
}
