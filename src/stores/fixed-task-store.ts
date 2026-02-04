import { create } from "zustand";
import { FixedDateTimeTask, CreateFixedTaskInput } from "@/types";
import * as api from "@/lib/api-client";

interface FixedTaskStore {
  fixedTasks: FixedDateTimeTask[];
  isLoading: boolean;
  error: string | null;
  fetchFixedTasks: () => Promise<void>;
  addFixedTask: (input: CreateFixedTaskInput) => Promise<void>;
  removeFixedTask: (id: string) => Promise<void>;
  toggleDeactivated: (id: string) => Promise<void>;
  getActiveFixedTasks: () => FixedDateTimeTask[];
  getFixedTasksInRange: (start: Date, end: Date) => FixedDateTimeTask[];
}

export const useFixedTaskStore = create<FixedTaskStore>()((set, get) => ({
  fixedTasks: [],
  isLoading: false,
  error: null,

  fetchFixedTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const fixedTasks = await api.fetchFixedTasks();
      set({ fixedTasks, isLoading: false });
    } catch (error) {
      set({ error: "Kunne ikke hente faste tider", isLoading: false });
    }
  },

  addFixedTask: async (input) => {
    try {
      const newTask = await api.createFixedTask(input);
      set((state) => {
        const sortedTasks = [...state.fixedTasks, newTask].sort(
          (a, b) => a.startTime.getTime() - b.startTime.getTime()
        );
        return { fixedTasks: sortedTasks };
      });
    } catch (error) {
      set({ error: "Kunne ikke legge til fast tid" });
    }
  },

  removeFixedTask: async (id) => {
    const previousTasks = get().fixedTasks;
    set((state) => ({
      fixedTasks: state.fixedTasks.filter((task) => task.id !== id),
    }));
    try {
      await api.deleteFixedTask(id);
    } catch (error) {
      set({ fixedTasks: previousTasks, error: "Kunne ikke slette fast tid" });
    }
  },

  toggleDeactivated: async (id) => {
    const task = get().fixedTasks.find((t) => t.id === id);
    if (!task) return;
    
    set((state) => ({
      fixedTasks: state.fixedTasks.map((t) =>
        t.id === id ? { ...t, deactivated: !t.deactivated } : t
      ),
    }));
    try {
      await api.updateFixedTask(id, { deactivated: !task.deactivated });
    } catch (error) {
      set({ error: "Kunne ikke oppdatere fast tid" });
      get().fetchFixedTasks();
    }
  },

  getActiveFixedTasks: () =>
    get().fixedTasks.filter((task) => !task.deactivated),

  getFixedTasksInRange: (start, end) =>
    get().fixedTasks.filter(
      (task) =>
        !task.deactivated &&
        task.startTime >= start &&
        task.stopTime <= end
    ),
}));