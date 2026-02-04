"use client";

import { useTaskStore } from "@/stores/task-store";
import { TaskListItem } from "./task-list-item";

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Ingen oppgaver lagt til ennå.</p>
        <p className="text-sm mt-1">Legg til din første oppgave ovenfor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {tasks.map((task, index) => (
        <TaskListItem key={task.id} task={task} index={index} />
      ))}
    </div>
  );
}