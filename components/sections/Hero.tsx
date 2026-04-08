"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

// ─── Animation helper ─────────────────────────────────────────────────────────

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  };
}

// ─── Background layers ────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Dot / grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Primary blue radial glow — centered, behind heading */}
      <div
        className="absolute"
        style={{
          width: "140%",
          height: "70%",
          top: "5%",
          left: "-20%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 65%)",
        }}
      />

      {/* Purple accent — upper right */}
      <div
        className="absolute"
        style={{
          width: "55%",
          height: "55%",
          top: "-5%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade to solid background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-background))",
        }}
      />
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function EarlyAccessBadge() {
  return (
    <div
      className="relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium overflow-hidden"
      style={{
        background: "rgba(59,130,246,0.1)",
        border: "1px solid rgba(59,130,246,0.25)",
        color: "rgba(147,197,253,1)",
      }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 50%, transparent 100%)",
          animation: "shimmer 3.5s ease-in-out infinite",
        }}
      />
      <span style={{ fontSize: "0.85em" }}>✨</span>
      <span className="relative">Now in Early Access</span>
      <ChevronRight size={12} className="relative opacity-60" />
    </div>
  );
}

// ─── Primary CTA button ───────────────────────────────────────────────────────

function PrimaryBtn() {
  return (
    <motion.a
      href="#waitlist"
      whileHover={{ boxShadow: "0 0 36px rgba(59,130,246,0.55)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-150"
      style={{
        background: "var(--color-accent)",
        color: "#fff",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background =
          "var(--color-accent-hover)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background =
          "var(--color-accent)")
      }
    >
      Join the Waitlist
      <ArrowRight size={15} />
    </motion.a>
  );
}

// ─── Secondary CTA button ─────────────────────────────────────────────────────

function SecondaryBtn() {
  return (
    <motion.a
      href="#features"
      whileHover={{ background: "rgba(255,255,255,0.05)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-150"
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "var(--color-text-secondary)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.22)";
        (e.currentTarget as HTMLElement).style.color =
          "var(--color-text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLElement).style.color =
          "var(--color-text-secondary)";
      }}
    >
      See How It Works
    </motion.a>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: 80, /* clear navbar */
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 40,
        background: "var(--color-background)",
      }}
    >
      <HeroBackground />

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <EarlyAccessBadge />
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
          style={{ color: "var(--color-text-primary)" }}
        >
          Ship Your SaaS
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #3B82F6 0%, #818CF8 45%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            10x Faster
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg leading-relaxed"
          style={{
            color: "var(--color-text-secondary)",
            maxWidth: "50ch",
          }}
        >
          LaunchFlow combines AI-powered project management with real-time team
          collaboration. Stop drowning in tools&nbsp;— start shipping.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-wrap items-center justify-center gap-3 mt-2"
        >
          <PrimaryBtn />
          <SecondaryBtn />
        </motion.div>

        {/* Social proof */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-sm"
          style={{ color: "var(--color-text-secondary)", opacity: 0.65 }}
        >
          🎉 2,847 builders already on the waitlist
        </motion.p>
      </div>

      {/* Bottom fade handled by HeroBackground */}
    </section>
  );
}
