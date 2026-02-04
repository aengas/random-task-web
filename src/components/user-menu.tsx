"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <User className="w-4 h-4" />
        <span>{session.user.name ?? session.user.email}</span>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      >
        <LogOut className="w-4 h-4 mr-1" />
        Logg ut
      </Button>
    </div>
  );
}