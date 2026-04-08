"use client";

const LOGOS = ["Vercel", "Linear", "Notion", "Stripe", "Raycast", "Arc"];

const LOGO_WEIGHTS: Record<string, string> = {
  Vercel: "font-black tracking-tighter",
  Linear: "font-semibold tracking-tight",
  Notion: "font-bold tracking-wide",
  Stripe: "font-extrabold tracking-tight",
  Raycast: "font-semibold tracking-widest uppercase text-sm",
  Arc: "font-black tracking-widest uppercase text-sm",
};

export function LogoBar() {
  const repeated = [...LOGOS, ...LOGOS];

  return (
    <div className="relative">
      {/* Gradient divider from hero */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="py-10 overflow-hidden">
        <p
          className="text-center text-sm mb-8"
          style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}
        >
          Trusted by teams at
        </p>

        <div className="relative flex overflow-hidden select-none">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--color-background), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--color-background), transparent)",
            }}
          />

          <div
            className="flex gap-16 items-center whitespace-nowrap"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {repeated.map((logo, i) => (
              <span
                key={i}
                className={`${LOGO_WEIGHTS[logo]} transition-colors duration-200`}
                style={{
                  color: "var(--color-text-secondary)",
                  opacity: 0.35,
                  fontSize: logo === "Raycast" || logo === "Arc" ? "0.75rem" : "1rem",
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />
    </div>
  );
}
