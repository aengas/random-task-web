"use client";

import { useState, useEffect } from "react";
import { Sunrise, Sunset, Loader2, MapPin } from "lucide-react";

interface SunData {
  sunrise: string;
  sunset: string;
  location: string;
}

export function SunTimes() {
  const [sunData, setSunData] = useState<SunData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    async function fetchSunTimes() {
      setIsLoading(true);
      setError(null);

      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
        );

        if (!response.ok) {
          throw new Error("Kunne ikke hente soldata");
        }

        const data = await response.json();

        if (data.status !== "OK") {
          throw new Error("Ugyldig respons fra API");
        }

        const sunrise = new Date(data.results.sunrise);
        const sunset = new Date(data.results.sunset);
        const locationName = await getLocationName(latitude, longitude);

        setSunData({
          sunrise: formatTime(sunrise),
          sunset: formatTime(sunset),
          location: locationName,
        });
      } catch (err) {
        if (err instanceof GeolocationPositionError) {
          setError("Posisjon avslått");
        } else {
          setError("Kunne ikke hente soldata");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchSunTimes();
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 -mt-6">
      <span className="capitalize">{today}</span>
      <span className="text-gray-300 dark:text-gray-600">•</span>
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : error ? (
        <span>{error}</span>
      ) : sunData ? (
        <>
          {sunData.location && (
            <>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {sunData.location}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
            </>
          )}
          <span className="flex items-center gap-1">
            <Sunrise className="w-3 h-3 text-orange-400" />
            {sunData.sunrise}
          </span>
          <span className="flex items-center gap-1">
            <Sunset className="w-3 h-3 text-orange-500" />
            {sunData.sunset}
          </span>
        </>
      ) : null}
    </div>
  );
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolokalisering støttes ikke"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}

async function getLocationName(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10`,
      {
        headers: {
          "User-Agent": "RandomTask-App",
        },
      }
    );

    if (!response.ok) return "";

    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.municipality || "";
  } catch {
    return "";
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}