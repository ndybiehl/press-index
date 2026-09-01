"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BuyButton({ listingId }: { listingId: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setPending(true);
    setError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ listingId }),
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      setError(data.error || "Checkout failed");
      setPending(false);
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div>
      <Button onClick={buy} disabled={pending}>
        {pending ? "Starting checkout…" : "Checkout"}
      </Button>
      {error ? <p className="mt-2 text-sm text-[#e23d28]">{error}</p> : null}
    </div>
  );
}
