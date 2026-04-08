"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Users, BarChart3, TrendingUp, Zap } from "lucide-react";

// ─── Feature cards data ───────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Brain,
    title: "AI Sprint Planning",
    description:
      "Describe your goals in plain English. LaunchFlow generates sprint plans, assigns tasks, and predicts blockers before they happen.",
    iconBg: "rgba(59,130,246,0.12)",
    iconColor: "var(--color-accent)",
    glowColor: "rgba(59,130,246,0.18)",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "See who's working on what, right now. Live cursors, instant updates, and async handoffs that actually work.",
    iconBg: "rgba(16,185,129,0.12)",
    iconColor: "var(--color-success)",
    glowColor: "rgba(16,185,129,0.18)",
  },
  {
    icon: BarChart3,
    title: "Ship Analytics",
    description:
      "Track velocity, cycle time, and deployment frequency. Know exactly where your team stands — no guessing.",
    iconBg: "rgba(245,158,11,0.12)",
    iconColor: "var(--color-warning)",
    glowColor: "rgba(245,158,11,0.18)",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const bentoVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
  glowColor,
}: (typeof FEATURES)[number]) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -4,
        boxShadow: `0 0 0 1px ${glowColor}, 0 20px 40px rgba(0,0,0,0.35)`,
      }}
      transition={{ duration: 0.22 }}
      className="relative flex flex-col gap-4 rounded-xl p-6 overflow-hidden"
      style={{
        background: "var(--color-surface)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Subtle top-edge highlight */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Mock dashboard UI ────────────────────────────────────────────────────────

const BAR_HEIGHTS = [38, 62, 45, 78, 55, 88, 70, 60, 82, 95];

const PROGRESS_ROWS = [
  { label: "Feature rollout", pct: 82, color: "var(--color-accent)" },
  { label: "Bug backlog", pct: 58, color: "var(--color-success)" },
  { label: "Design handoff", pct: 41, color: "var(--color-warning)" },
];

const SIDEBAR_DOTS = [
  { color: "var(--color-accent)" },
  { color: "rgba(255,255,255,0.15)" },
  { color: "rgba(255,255,255,0.15)" },
  { color: "rgba(255,255,255,0.15)" },
];

function MockDashboard() {
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden flex"
      style={{
        background: "var(--color-surface)",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: 280,
      }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col items-center py-5 gap-3 shrink-0"
        style={{
          width: 44,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo dot */}
        <div
          className="w-5 h-5 rounded-md mb-2"
          style={{ background: "var(--color-accent)" }}
        />
        {SIDEBAR_DOTS.map((dot, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded"
            style={{ background: dot.color }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div
              className="h-2 rounded"
              style={{ width: 96, background: "rgba(255,255,255,0.15)" }}
            />
            <div
              className="h-1.5 rounded"
              style={{ width: 56, background: "rgba(255,255,255,0.07)" }}
            />
          </div>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md"
            style={{ background: "rgba(59,130,246,0.15)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="h-1.5 rounded"
              style={{ width: 40, background: "rgba(59,130,246,0.5)" }}
            />
          </div>
        </div>

        {/* Velocity bar chart */}
        <div>
          <div
            className="h-1.5 rounded mb-2"
            style={{ width: 72, background: "rgba(255,255,255,0.08)" }}
          />
          <div className="flex items-end gap-[3px]" style={{ height: 60 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === BAR_HEIGHTS.length - 1
                      ? "var(--color-accent)"
                      : i >= BAR_HEIGHTS.length - 3
                      ? "rgba(59,130,246,0.55)"
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Progress rows */}
        <div className="flex flex-col gap-2.5">
          {PROGRESS_ROWS.map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div
                  className="h-1.5 rounded"
                  style={{
                    width: 70,
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <div
                  className="h-1.5 rounded"
                  style={{
                    width: 24,
                    background: "rgba(255,255,255,0.12)",
                  }}
                />
              </div>
              <div
                className="h-1.5 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${row.pct}%`, background: row.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stat cards ───────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
  iconColor,
  iconBg,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <motion.div
      variants={bentoVariant}
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}
      transition={{ duration: 0.2 }}
      className="flex flex-col justify-between p-5 rounded-xl"
      style={{
        background: "var(--color-surface)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
        style={{ background: iconBg }}
      >
        <Icon size={15} style={{ color: iconColor }} />
      </div>
      <div>
        <p
          className="text-xl font-bold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {value}
        </p>
        <p
          className="text-xs mt-1 leading-snug"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const bentoInView = useInView(bentoRef, { once: true, margin: "-60px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative px-6 py-24 mx-auto"
      style={{ maxWidth: 1100 }}
    >
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          Features
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          style={{ color: "var(--color-text-primary)" }}
        >
          Everything you need to ship fast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-base max-w-md"
          style={{ color: "var(--color-text-secondary)" }}
        >
          One workspace for planning, shipping, and measuring — so your team
          stays in flow, not in meetings.
        </motion.p>
      </div>

      {/* 3-card grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </motion.div>

      {/* Bento section */}
      <div
        ref={bentoRef}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5"
      >
        {/* Left — mock dashboard (wider) */}
        <motion.div
          variants={bentoVariant}
          initial="hidden"
          animate={bentoInView ? "show" : "hidden"}
          className="sm:col-span-3"
          style={{ minHeight: 280 }}
        >
          {/* Outer glow wrapper */}
          <div
            className="relative w-full h-full rounded-xl p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(255,255,255,0.06), rgba(59,130,246,0.08))",
              boxShadow: "0 0 40px rgba(59,130,246,0.08), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Inner label */}
            <div
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(59,130,246,0.15)",
                color: "var(--color-accent)",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              Live preview
            </div>
            <MockDashboard />
          </div>
        </motion.div>

        {/* Right — stat cards (stacked) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={bentoInView ? "show" : "hidden"}
          className="sm:col-span-2 flex flex-col gap-4"
        >
          <StatCard
            icon={TrendingUp}
            value="40% faster"
            label="sprint completion vs. manual planning"
            iconColor="var(--color-success)"
            iconBg="rgba(16,185,129,0.12)"
          />
          <StatCard
            icon={Zap}
            value="12,000+"
            label="tasks automated this month"
            iconColor="var(--color-warning)"
            iconBg="rgba(245,158,11,0.12)"
          />
        </motion.div>
      </div>
    </section>
  );
}
