"use client";

import { useFixedTaskStore } from "@/stores/fixed-task-store";
import { FixedTaskListItem } from "./fixed-task-list-item";

export function FixedTaskList() {
  const fixedTasks = useFixedTaskStore((state) => state.fixedTasks);

  if (fixedTasks.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        <p>Ingen faste tider lagt til.</p>
        <p className="text-sm mt-1">Legg til møter, pauser eller andre faste aktiviteter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {fixedTasks.map((task) => (
        <FixedTaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}