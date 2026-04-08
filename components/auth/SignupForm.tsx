"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function SignupForm() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
    } else {
      router.push("/login?registered=1");
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg px-4 py-3 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Full name" type="text" placeholder="Jane Smith"
          value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
        <Input label="Email" type="email" placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <Input label="Password" type="password" placeholder="Min. 8 characters"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required minLength={8} autoComplete="new-password" />
        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
          Create free account
        </Button>
      </form>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        By signing up you agree to our{" "}
        <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">Terms</a>{" "}
        and{" "}
        <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">Privacy Policy</a>.
      </p>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
