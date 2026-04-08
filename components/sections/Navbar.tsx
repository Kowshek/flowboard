"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "FAQ",      href: "#faq"      },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="LaunchFlow">
      <div
        className="w-7 h-7 rounded-[7px] flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, var(--color-accent), #6366f1)",
          boxShadow: "0 2px 12px rgba(59,130,246,0.4)",
        }}
      >
        <Zap size={14} fill="white" color="white" strokeWidth={0} />
      </div>
      <span
        className="text-[15px] tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        Launch<strong className="font-semibold">Flow</strong>
      </span>
    </a>
  );
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative text-sm font-medium transition-colors duration-150 group py-1"
      style={{ color: "var(--color-text-secondary)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "var(--color-text-primary)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "var(--color-text-secondary)")
      }
    >
      {label}
      {/* Underline slide */}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200 group-hover:w-full"
        style={{ background: "var(--color-accent)" }}
      />
    </a>
  );
}

// ─── CTA button ───────────────────────────────────────────────────────────────

function WaitlistBtn({ onClick }: { onClick?: () => void }) {
  return (
    <motion.a
      href="#waitlist"
      onClick={onClick}
      whileHover={{ boxShadow: "0 0 24px rgba(59,130,246,0.45)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150"
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
      Join Waitlist
    </motion.a>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-72 pt-6 pb-8 px-6"
            style={{
              background: "var(--color-surface)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-10">
              <Logo />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                style={{ color: "var(--color-text-secondary)" }}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-primary)";
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--color-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-secondary)";
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <WaitlistBtn onClick={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(11,15,25,0.82)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 h-16"
          style={{ maxWidth: 1100 }}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--color-text-secondary)")
              }
            >
              Sign in
            </a>
            <WaitlistBtn />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
