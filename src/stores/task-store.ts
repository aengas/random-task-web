import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RandomTask, createRandomTask, CreateRandomTaskInput } from "@/types";

interface TaskStore {
  tasks: RandomTask[];
  addTask: (input: CreateRandomTaskInput) => void;
  removeTask: (id: string) => void;
  toggleRequired: (id: string) => void;
  toggleDeactivated: (id: string) => void;
  updateComment: (id: string, comment: string) => void;
  getActiveTasks: () => RandomTask[];
  getRequiredTasks: () => RandomTask[];
  getNonRequiredTasks: () => RandomTask[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (input) =>
        set((state) => ({
          tasks: [...state.tasks, createRandomTask(input)],
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleRequired: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, required: !task.required } : task
          ),
        })),

      toggleDeactivated: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, deactivated: !task.deactivated } : task
          ),
        })),

      updateComment: (id, comment) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, comment } : task
          ),
        })),

      getActiveTasks: () => get().tasks.filter((task) => !task.deactivated),

      getRequiredTasks: () =>
        get().tasks.filter((task) => task.required && !task.deactivated),

      getNonRequiredTasks: () =>
        get().tasks.filter((task) => !task.required && !task.deactivated),
    }),
    {
      name: "random-task-storage",
    }
  )
);