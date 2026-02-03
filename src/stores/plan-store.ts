import { create } from "zustand";
import { PlanItem } from "@/types";

interface PlanStore {
  planItems: PlanItem[];
  setPlanItems: (items: PlanItem[]) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanStore>()((set) => ({
  planItems: [],
  setPlanItems: (items) => set({ planItems: items }),
  clearPlan: () => set({ planItems: [] }),
}));