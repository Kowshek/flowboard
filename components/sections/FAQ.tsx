"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "How is LaunchFlow different from Jira or Linear?",
    a: "LaunchFlow is AI-native from day one. Instead of manually creating tickets and dragging cards, you describe what you want to build and our AI generates the entire sprint plan, estimates effort, and identifies dependencies automatically.",
  },
  {
    q: "Can I import my existing projects?",
    a: "Yes. We support one-click imports from Jira, Linear, Asana, Trello, and GitHub Projects. Your data migrates in minutes, not days.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We're SOC 2 Type II certified, all data is encrypted at rest and in transit, and we never train AI models on your project data.",
  },
  {
    q: "What happens after the waitlist?",
    a: "Early waitlist members get 3 months free on the Pro plan, plus direct access to our founding team for feedback and feature requests.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. 30-day money-back guarantee, no questions asked.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b last:border-0"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-sm font-medium leading-snug transition-colors duration-150"
          style={{ color: open ? "#F9FAFB" : "rgba(249,250,251,0.75)" }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex-shrink-0"
          style={{ color: "rgba(156,163,175,0.7)" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className="px-6 py-24"
      style={{ background: "var(--color-background)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 700 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#3B82F6" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#F9FAFB", fontFamily: "var(--font-display)" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div
          className="rounded-2xl px-6 sm:px-8"
          style={{
            background: "var(--color-surface)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {ITEMS.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
