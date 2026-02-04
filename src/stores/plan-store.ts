import { create } from "zustand";
import { PlanItem } from "@/types";
import * as api from "@/lib/api-client";

interface PlanStore {
  planItems: PlanItem[];
  isLoading: boolean;
  error: string | null;
  scheduledNotifications: ReturnType<typeof setTimeout>[];
  fetchPlan: () => Promise<void>;
  setPlanItems: (items: PlanItem[]) => Promise<void>;
  clearPlan: () => Promise<void>;
  scheduleNotifications: (
    scheduleFunc: (taskName: string, time: Date) => ReturnType<typeof setTimeout> | null
  ) => void;
  clearScheduledNotifications: () => void;
}

export const usePlanStore = create<PlanStore>()((set, get) => ({
  planItems: [],
  isLoading: false,
  error: null,
  scheduledNotifications: [],

  fetchPlan: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await api.fetchPlan();
      set({ planItems: items, isLoading: false });
    } catch {
      set({ error: "Kunne ikke hente plan", isLoading: false });
    }
  },

  setPlanItems: async (items) => {
    get().clearScheduledNotifications();
    set({ planItems: items });
    try {
      await api.savePlan(items);
    } catch {
      set({ error: "Kunne ikke lagre plan" });
    }
  },

  clearPlan: async () => {
    get().clearScheduledNotifications();
    set({ planItems: [] });
    try {
      await api.deletePlan();
    } catch {
      set({ error: "Kunne ikke slette plan" });
    }
  },

  scheduleNotifications: (scheduleFunc) => {
    const { planItems } = get();
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    planItems.forEach((item) => {
      if (item.taskName !== "Stopp") {
        const timeout = scheduleFunc(item.taskName, item.time);
        if (timeout) timeouts.push(timeout);
      }
    });

    set({ scheduledNotifications: timeouts });
  },

  clearScheduledNotifications: () => {
    const { scheduledNotifications } = get();
    scheduledNotifications.forEach((timeout) => clearTimeout(timeout));
    set({ scheduledNotifications: [] });
  },
}));