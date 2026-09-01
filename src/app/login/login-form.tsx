"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  next,
  error,
}: {
  next: string;
  error?: string;
}) {
  const [pending, setPending] = useState(false);
  const message =
    error === "invalid"
      ? "Unknown email or password."
      : error === "missing"
        ? "Email and password required."
        : error
          ? "Could not sign in."
          : "";

  return (
    <form
      action="/api/auth/login"
      method="post"
      className="mt-8 space-y-4"
      onSubmit={() => setPending(true)}
    >
      <input type="hidden" name="next" value={next} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          inputMode="email"
          autoComplete="username"
          required
          defaultValue="buyer@pressindex.local"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          defaultValue="pressindex"
        />
      </div>
      {message ? <p className="text-sm text-destructive">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
