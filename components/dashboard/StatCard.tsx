import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {title}
        </p>
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p
          className={cn(
            "text-xs font-medium mt-1",
            trend === "up" ? "text-success" : "text-danger"
          )}
        >
          {change}{" "}
          <span className="text-text-secondary font-normal">vs last month</span>
        </p>
      </div>
    </div>
  );
}
