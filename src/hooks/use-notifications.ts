"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

function getIsSupported() {
  if (typeof window === "undefined") return false;
  return "Notification" in window && "serviceWorker" in navigator;
}

function getPermission(): NotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "default";
  }
  return Notification.permission;
}

export function useNotifications() {
  const isSupported = useSyncExternalStore(
    () => () => {},
    getIsSupported,
    () => false
  );

  const [permission, setPermission] = useState<NotificationPermission>(getPermission);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === "granted") {
      await registerServiceWorker();
    }

    return result === "granted";
  }, [isSupported]);

  const scheduleNotification = useCallback(
    (taskName: string, time: Date | string) => {
      if (permission !== "granted") return null;

      // Konverter til Date hvis det er en string
      const targetTime =
        typeof time === "string" ? new Date(time) : time;
      const delay = targetTime.getTime() - Date.now();

      // Ikke planlegg hvis tiden allerede har passert
      if (delay <= 0) return null;

      console.log(
        `Planlegger varsel for "${taskName}" om ${Math.round(delay / 1000 / 60)} minutter`
      );

      const timeoutId = setTimeout(() => {
        new Notification("RandomTask 🎲", {
          body: `Tid for: ${taskName}`,
          icon: "/icon-192.png",
          tag: `task-${targetTime.getTime()}`,
          requireInteraction: true,
        });
      }, delay);

      return timeoutId;
    },
    [permission]
  );

  return {
    permission,
    isSupported,
    requestPermission,
    scheduleNotification,
  };
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
    } catch (error) {
      console.error("SW registration failed:", error);
    }
  }
}