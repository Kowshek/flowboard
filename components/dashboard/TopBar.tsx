"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function TopBar() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/[0.06] flex-shrink-0 transition-colors duration-200">
      <div />
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notification bell */}
        <button
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-1" />

        <div className="h-7 w-7 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-violet-700 dark:text-violet-400">FB</span>
        </div>
      </div>
    </header>
  );
}
