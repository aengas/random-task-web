import { create } from "zustand";
import { PlanItem } from "@/types";
import * as api from "@/lib/api-client";

interface PlanStore {
  planItems: PlanItem[];
  isLoading: boolean;
  error: string | null;
  fetchPlan: () => Promise<void>;
  setPlanItems: (items: PlanItem[]) => Promise<void>;
  clearPlan: () => Promise<void>;
}

export const usePlanStore = create<PlanStore>()((set) => ({
  planItems: [],
  isLoading: false,
  error: null,

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
    set({ planItems: items });
    try {
      await api.savePlan(items);
    } catch {
      set({ error: "Kunne ikke lagre plan" });
    }
  },

  clearPlan: async () => {
    set({ planItems: [] });
    try {
      await api.deletePlan();
    } catch {
      set({ error: "Kunne ikke slette plan" });
    }
  },
}));