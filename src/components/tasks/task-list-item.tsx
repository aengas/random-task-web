"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui";
import { RandomTask } from "@/types";
import { useTaskStore } from "@/stores/task-store";

interface TaskListItemProps {
  task: RandomTask;
  index: number;
}

export function TaskListItem({ task, index }: TaskListItemProps) {
    const { removeTask, toggleRequired, toggleDeactivated } = useTaskStore();

    return (
      <div
        className={cn(
            "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-lg border transition-all",
            task.deactivated
            ? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        )}
        >
        <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm text-gray-400 dark:text-gray-500 w-6 shrink-0">{index + 1}</span>
            
            <div className="flex-1 min-w-0">
                <p className={cn(
                "font-medium truncate text-gray-900 dark:text-gray-100",
                task.deactivated && "line-through text-gray-500 dark:text-gray-400"
                )}>
                {task.description}
                </p>
                {task.comment && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.comment}</p>
                )}
            </div>

            <button
                onClick={() => removeTask(task.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors sm:hidden"
                aria-label="Slett oppgave"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>

        <div className="flex items-center gap-3 pl-9 sm:pl-0 shrink-0">
            <Checkbox
                id={`required-${task.id}`}
                label="Påkrevd"
                checked={task.required}
                onChange={() => toggleRequired(task.id)}
            />
            <Checkbox
                id={`deactivated-${task.id}`}
                label="Deaktiver"
                checked={task.deactivated}
                onChange={() => toggleDeactivated(task.id)}
            />
            <button
                onClick={() => removeTask(task.id)}
                className="hidden sm:block p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Slett oppgave"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
        </div>
    );
}