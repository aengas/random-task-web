import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  FixedDateTimeTask,
  createFixedTask,
  CreateFixedTaskInput,
} from "@/types";

interface FixedTaskStore {
  fixedTasks: FixedDateTimeTask[];
  addFixedTask: (input: CreateFixedTaskInput) => void;
  removeFixedTask: (id: string) => void;
  toggleDeactivated: (id: string) => void;
  getActiveFixedTasks: () => FixedDateTimeTask[];
  getFixedTasksInRange: (start: Date, end: Date) => FixedDateTimeTask[];
}

export const useFixedTaskStore = create<FixedTaskStore>()(
  persist(
    (set, get) => ({
      fixedTasks: [],

      addFixedTask: (input) =>
        set((state) => {
          const newTask = createFixedTask(input);
          const sortedTasks = [...state.fixedTasks, newTask].sort(
            (a, b) => a.startTime.getTime() - b.startTime.getTime()
          );
          return { fixedTasks: sortedTasks };
        }),

      removeFixedTask: (id) =>
        set((state) => ({
          fixedTasks: state.fixedTasks.filter((task) => task.id !== id),
        })),

      toggleDeactivated: (id) =>
        set((state) => ({
          fixedTasks: state.fixedTasks.map((task) =>
            task.id === id ? { ...task, deactivated: !task.deactivated } : task
          ),
        })),

      getActiveFixedTasks: () =>
        get().fixedTasks.filter((task) => !task.deactivated),

      getFixedTasksInRange: (start, end) =>
        get().fixedTasks.filter(
          (task) =>
            !task.deactivated &&
            task.startTime >= start &&
            task.stopTime <= end
        ),
    }),
    {
      name: "fixed-task-storage",
      partialize: (state) => ({
        fixedTasks: state.fixedTasks.map((task) => ({
          ...task,
          startTime: task.startTime.toISOString(),
          stopTime: task.stopTime.toISOString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.fixedTasks = (state.fixedTasks as unknown as Array<Omit<FixedDateTimeTask, 'startTime' | 'stopTime'> & { startTime: string; stopTime: string }>).map((task) => ({
            ...task,
            startTime: new Date(task.startTime),
            stopTime: new Date(task.stopTime),
          }));
        }
      },
    }
  )
);