import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  const isUp = trend === "up";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-white/10 p-5 hover:shadow-md dark:hover:bg-gray-800/80 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {title}
          </p>
          <p
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {value}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
              )}
            >
              {isUp ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">vs last month</span>
          </div>
        </div>
        <div className="h-9 w-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        </div>
      </div>
    </div>
  );
}
