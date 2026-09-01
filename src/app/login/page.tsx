import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  if (user) redirect(sp.next || "/account");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-4xl text-foreground">Sign in</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Demo accounts are seeded with password <code>pressindex</code>.
      </p>
      <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
        <li>seller@pressindex.local</li>
        <li>buyer@pressindex.local</li>
        <li>vault@pressindex.local</li>
      </ul>
      <LoginForm next={sp.next || "/account"} error={sp.error} />
    </div>
  );
}
