import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base",
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-accent/20 flex items-center justify-center flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name ?? "Avatar"} fill className="object-cover" />
      ) : (
        <span className="font-medium text-accent">{initials}</span>
      )}
    </div>
  );
}
