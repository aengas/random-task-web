export function formatTime(date: Date): string {
  return date.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function getTimeString(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function roundToNearestFiveMinutes(date: Date): Date {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 5) * 5;
  const result = new Date(date);
  result.setMinutes(roundedMinutes, 0, 0);
  return result;
}

export function getDefaultStartTime(): Date {
  const now = new Date();
  const minutes = now.getMinutes();
  const remainder = minutes % 5;
  
  if (remainder !== 0) {
    now.setMinutes(minutes + (5 - remainder));
  }
  now.setSeconds(0);
  now.setMilliseconds(0);
  
  return now;
}

export function getDefaultEndTime(): Date {
  const now = new Date();
  const isWorkTime = isWorkingHours(now);
  const endTime = new Date(now);
  endTime.setHours(isWorkTime ? 15 : 23, isWorkTime ? 30 : 0, 0, 0);
  return endTime;
}

export function isWorkingHours(date: Date): boolean {
  const day = date.getDay();
  const hour = date.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const isBeforeThree = hour < 15;
  return isWeekday && isBeforeThree;
}