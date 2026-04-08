"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { BarChart3, LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const navItems = [
  { href: "/dashboard", label: "Overview",  icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users           },
  { href: "/settings",  label: "Settings",  icon: Settings        },
];

function UserInitials({ name }: { name?: string | null }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return (
    <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors">
      {initials}
    </div>
  );
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-white/10 h-full transition-colors duration-200">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-[15px] font-bold text-gray-900 dark:text-gray-100 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FlowBoard
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  active ? "text-violet-600 dark:text-violet-400" : ""
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 border-t border-gray-100 dark:border-white/[0.06] pt-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg group">
          <UserInitials name={user.name} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate leading-tight">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate leading-tight mt-0.5">
              {user.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="p-1.5 rounded-md text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
