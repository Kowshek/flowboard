"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Keying on pathname causes React to unmount+remount the div on navigation,
  // which restarts the CSS animation defined in globals.css (.page-fade-in).
  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
}
