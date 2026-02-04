"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui";
import { useNotifications } from "@/hooks/use-notifications";
import { usePlanStore } from "@/stores";

export function NotificationSettings() {
  const { permission, isSupported, requestPermission } = useNotifications();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const clearScheduledNotifications = usePlanStore((state) => state.clearScheduledNotifications);

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Varsler støttes ikke i denne nettleseren
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

  if (permission === "granted") {
    if (notificationsEnabled) {
      return (
        <Button
          onClick={() => {
            clearScheduledNotifications();
            setNotificationsEnabled(false);
          }}
          variant="secondary"
          size="sm"
        >
          <Bell className="w-4 h-4 mr-2 text-green-600" />
          Varsler på
        </Button>
      );
    }

    return (
      <Button
        onClick={() => setNotificationsEnabled(true)}
        variant="secondary"
        size="sm"
      >
        <BellOff className="w-4 h-4 mr-2 text-gray-400" />
        Varsler av
      </Button>
    );
  }

  return (
    <Button onClick={requestPermission} variant="secondary" size="sm">
      <Bell className="w-4 h-4 mr-2" />
      Aktiver varsler
    </Button>
  );
}

export function useNotificationsEnabled() {
  // Hook for andre komponenter å sjekke om varsler er aktivert
  return useState(true);
}