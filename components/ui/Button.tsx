import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-violet-600 text-white hover:bg-violet-700 shadow-sm":
              variant === "primary",
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm":
              variant === "secondary",
            "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 shadow-sm":
              variant === "danger",
          },
          {
            "h-8  px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-11 px-5 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading…
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
