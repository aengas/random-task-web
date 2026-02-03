import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultStartTime, getDefaultEndTime, getTimeString } from "@/lib/time-utils";

interface SettingsStore {
  startTime: string;
  endTime: string;
  allTasks: boolean;
  shouldBeRandom: boolean;
  numberOfNonRequiredTasks: number;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setAllTasks: (value: boolean) => void;
  setShouldBeRandom: (value: boolean) => void;
  setNumberOfNonRequiredTasks: (count: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      startTime: getTimeString(getDefaultStartTime()),
      endTime: getTimeString(getDefaultEndTime()),
      allTasks: false,
      shouldBeRandom: true,
      numberOfNonRequiredTasks: 0,

      setStartTime: (time) => set({ startTime: time }),
      setEndTime: (time) => set({ endTime: time }),
      setAllTasks: (value) => set({ allTasks: value }),
      setShouldBeRandom: (value) => set({ shouldBeRandom: value }),
      setNumberOfNonRequiredTasks: (count) =>
        set({ numberOfNonRequiredTasks: count }),
    }),
    {
      name: "settings-storage",
    }
  )
);