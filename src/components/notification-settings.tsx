"use client";

import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationSettings() {
  const { permission, isSupported, requestPermission } = useNotifications();

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Varsler støttes ikke i denne nettleseren
      </div>
    );
  }

  if (permission === "granted") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <Bell className="w-4 h-4" />
        Varsler er aktivert
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
        <BellOff className="w-4 h-4" />
        Varsler er blokkert i nettleseren
      </div>
    );
  }

  return (
    <Button onClick={requestPermission} variant="secondary" size="sm">
      <Bell className="w-4 h-4 mr-2" />
      Aktiver varsler
    </Button>
  );
}