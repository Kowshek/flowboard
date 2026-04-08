"use client";

import { useState } from "react";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <section
      id="waitlist"
      className="px-6 py-24 relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto text-center" style={{ maxWidth: 600 }}>
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
          style={{ color: "#F9FAFB", fontFamily: "var(--font-display)" }}
        >
          Ready to ship faster?
        </h2>
        <p className="text-base mb-10" style={{ color: "#9CA3AF" }}>
          Join 2,847 founders and developers on the waitlist. Early members get
          3 months of Pro — free.
        </p>

        {/* Form or success */}
        {state === "success" ? (
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl text-base font-medium"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#6EE7B7",
            }}
          >
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            🎉 You&rsquo;re on the list! We&rsquo;ll be in touch soon.
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                placeholder="Enter your email"
                required
                className="flex-1 h-12 px-4 text-sm rounded-xl sm:rounded-r-none sm:rounded-l-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F9FAFB",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "rgba(59,130,246,0.5)";
                  (e.target as HTMLInputElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.target as HTMLInputElement).style.background = "rgba(255,255,255,0.06)";
                }}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="h-12 px-6 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl sm:rounded-l-none sm:rounded-r-xl transition-colors disabled:opacity-60"
                style={{
                  background: "#3B82F6",
                  color: "#fff",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563EB")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#3B82F6")}
              >
                {state === "loading" ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : (
                  <>Join Waitlist <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>

            {errorMsg && (
              <p className="mt-3 text-sm" style={{ color: "#F87171" }}>{errorMsg}</p>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-4">
              <Lock className="h-3 w-3" style={{ color: "rgba(156,163,175,0.5)" }} />
              <span className="text-xs" style={{ color: "rgba(156,163,175,0.5)" }}>
                No spam. Unsubscribe anytime.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
