"use client";

import { useState } from "react";
import { BoxArt } from "@/components/box-art";
import { Button } from "@/components/ui/button";

type CoverFlipProps = {
  title: string;
  platform: string;
  platformColor: string;
  year?: number | null;
  publisher?: string;
  kind: string;
  description?: string;
  genre?: string;
  players?: string;
  coverFrontUrl?: string;
  coverBackUrl?: string;
};

export function CoverFlip(props: CoverFlipProps) {
  const [side, setSide] = useState<"front" | "back">("front");
  const backPhoto =
    props.coverBackUrl && props.coverBackUrl !== props.coverFrontUrl
      ? props.coverBackUrl
      : undefined;

  return (
    <div>
      {side === "front" ? (
        <BoxArt {...props} side="front" coverUrl={props.coverFrontUrl} />
      ) : (
        <BoxArt {...props} side="back" coverUrl={backPhoto} />
      )}
      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          variant={side === "front" ? "default" : "outline"}
          onClick={() => setSide("front")}
        >
          Front cover
        </Button>
        <Button
          type="button"
          variant={side === "back" ? "default" : "outline"}
          onClick={() => setSide("back")}
        >
          Back cover
        </Button>
      </div>
    </div>
  );
}
