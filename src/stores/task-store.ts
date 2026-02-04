import { create } from "zustand";
import { RandomTask, CreateRandomTaskInput } from "@/types";
import * as api from "@/lib/api-client";

interface TaskStore {
  tasks: RandomTask[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (input: CreateRandomTaskInput) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleRequired: (id: string) => Promise<void>;
  toggleDeactivated: (id: string) => Promise<void>;
  updateComment: (id: string, comment: string) => Promise<void>;
  updateDescription: (id: string, description: string) => Promise<void>;
  getActiveTasks: () => RandomTask[];
  getRequiredTasks: () => RandomTask[];
  getNonRequiredTasks: () => RandomTask[];
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await api.fetchTasks();
      set({ tasks, isLoading: false });
    } catch {
      set({ error: "Kunne ikke hente oppgaver", isLoading: false });
    }
  },

  addTask: async (input) => {
    try {
      const newTask = await api.createTask(input);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch {
      set({ error: "Kunne ikke legge til oppgave" });
    }
  },

  removeTask: async (id) => {
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    try {
      await api.deleteTask(id);
    } catch {
      set({ tasks: previousTasks, error: "Kunne ikke slette oppgave" });
    }
  },

  toggleRequired: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, required: !t.required } : t
      ),
    }));
    try {
      await api.updateTask(id, { required: !task.required });
    } catch {
      set({ error: "Kunne ikke oppdatere oppgave" });
      get().fetchTasks();
    }
  },

  toggleDeactivated: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, deactivated: !t.deactivated } : t
      ),
    }));
    try {
      await api.updateTask(id, { deactivated: !task.deactivated });
    } catch {
      set({ error: "Kunne ikke oppdatere oppgave" });
      get().fetchTasks();
    }
  },

  updateComment: async (id, comment) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, comment } : t
      ),
    }));
    try {
      await api.updateTask(id, { comment });
    } catch {
      set({ error: "Kunne ikke oppdatere kommentar" });
    }
  },

  updateDescription: async (id, description) => {
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, description } : t
      ),
    }));
    try {
      await api.updateTask(id, { description });
    } catch {
      set({ tasks: previousTasks, error: "Kunne ikke oppdatere beskrivelse" });
    }
  },

  getActiveTasks: () => get().tasks.filter((task) => !task.deactivated),
  getRequiredTasks: () => get().tasks.filter((t) => t.required && !t.deactivated),
  getNonRequiredTasks: () => get().tasks.filter((t) => !t.required && !t.deactivated),
}));