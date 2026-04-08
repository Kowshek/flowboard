import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-10 px-3 rounded-lg text-sm transition-all duration-150",
            "bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "border focus:outline-none focus:ring-2",
            error
              ? "border-red-300 dark:border-red-500/50 focus:ring-red-500/20 focus:border-red-400"
              : "border-gray-200 dark:border-white/10 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-gray-800",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 dark:text-red-400 text-xs">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
