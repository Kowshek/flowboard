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
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {title}
          </p>
          <p
            className="text-2xl font-bold text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {value}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                isUp ? "text-emerald-600" : "text-red-500"
              )}
            >
              {isUp ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>
        <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
          <Icon className="h-4.5 w-4.5 text-violet-600" />
        </div>
      </div>
    </div>
  );
}
