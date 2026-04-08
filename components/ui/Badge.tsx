import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-50   dark:bg-amber-500/10   text-amber-700   dark:text-amber-400",
  danger:  "bg-red-50     dark:bg-red-500/10     text-red-700     dark:text-red-400",
  info:    "bg-violet-50  dark:bg-violet-500/10  text-violet-700  dark:text-violet-400",
  neutral: "bg-gray-100   dark:bg-white/10       text-gray-600    dark:text-gray-300",
};

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
