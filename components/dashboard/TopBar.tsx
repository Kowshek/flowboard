"use client";

import { signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";

interface TopBarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function TopBar({ user }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-surface flex-shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Avatar src={user.image} name={user.name ?? user.email} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary leading-tight">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-text-secondary leading-tight">
              {user.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="gap-1.5"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
