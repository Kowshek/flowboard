export function Footer() {
  return (
    <footer
      className="px-6 py-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "var(--color-background)" }}
    >
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ maxWidth: 1100 }}
      >
        <p className="text-sm" style={{ color: "rgba(156,163,175,0.55)" }}>
          © 2026 LaunchFlow. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {[
            { label: "Twitter",  href: "#" },
            { label: "GitHub",   href: "#" },
            { label: "Privacy",  href: "#" },
            { label: "Terms",    href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors duration-150"
              style={{ color: "rgba(156,163,175,0.5)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#9CA3AF")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(156,163,175,0.5)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
